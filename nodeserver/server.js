const http = require('node:http');
const fs = require('node:fs/promises');
const { start } = require('node:repl');
const { error } = require('node:console');
const { createServer } = http;
const CONFIG_FILE = 'apiconfig.json';
const config = {
    url: '',
    hostname: '',
    port: 0
};
var mastersheetValues = {};

const INDEX_HTML = {
    path: "page/index.html",
    getPage: async function() {
        const RAW_FILE = await fs.readFile(this.path, 'utf8');
        let body = "";
        let entry_format = "";
        for(let i = 0; i < RAW_FILE.length; i++) {
            // Check if format tag is found
            if(RAW_FILE.substring(i,i+2) == "{{") {
                // Check if it's the line tag
                i += 2;
                if(RAW_FILE.substring(i,i+5)=="line:") {
                    // Get the contents of the line tag
                    i += 5;
                    for(i; i < RAW_FILE.length; i++) {
                        if(RAW_FILE.substring(i,i+9)=="{{entry}}") {entry_format += RAW_FILE.substring(i,i+9); i += 8; continue;}
                        if(RAW_FILE.substring(i,i+2)=="}}") {i++;break;}
                        entry_format += RAW_FILE[i];
                    }
                    for(character of mastersheetValues.data) {
                        body += entry_format.replace("{{entry}}",`<a href="http://${config.hostname}:${config.port}/${character.uri}">${character.name}</a>`);
                    }
                }
            // Otherwise add to body
            } else body += RAW_FILE[i];
        }
        return body;
    } 
};

function SetupConfig() {
    return fs.readFile(CONFIG_FILE, 'utf8').then(data => {
        const jsonData = JSON.parse(data);
        config.url = jsonData["mastersheet"];
        config.hostname = jsonData["hostname"];
        config.port = jsonData["port"];
    }, error => { throw error; })
}

function URLParts(url) {
    let result = {
        scheme: "",
        path: "",
        query: ""
    };
    const SCHEME_RGX = /^((.*):(\/\/|\\\\))?(.*)$/;
    const PATH_RGX = /^(.*?)(\?.*)?$/;
    const QUERY_RGX = /^(\?)?(.*)?$/;

    const SCHEME = SCHEME_RGX.exec(url)[2];
    url = SCHEME_RGX.exec(url)[4];
    const PATH = PATH_RGX.exec(url)[1];
    url = PATH_RGX.exec(url)[2];
    const QUERY = QUERY_RGX.exec(url)[2];

    result.scheme = (SCHEME===undefined|SCHEME==='undefined')?"":SCHEME;
    result.path = (PATH===undefined|PATH==='undefined')?"":PATH;
    result.query = (QUERY===undefined|QUERY==='undefined')?"":QUERY;
    return result;
}

async function MastersheetToLocal(){
    const MASTERSHEET_RESPONSE = await fetch(`${config.url}?characters=ALL`);
    mastersheetValues = await MASTERSHEET_RESPONSE.json();
    mastersheetValues.status = MASTERSHEET_RESPONSE.status;
    mastersheetValues.statusText = MASTERSHEET_RESPONSE.statusText;
    mastersheetValues.ok = MASTERSHEET_RESPONSE.ok;
    console.log(`updated mastersheet: status ${mastersheetValues.status}`);
}

async function StartServer() {
    try {
        await SetupConfig(); // Setup config
        await MastersheetToLocal(); // Initial update

        const server = createServer((req, res) => {
            const urlParts = URLParts(req.url);
            const pathParts = urlParts.path.split(/[\/\\]/).filter(n => n!='');
            
            let jsonData = {};

            console.log(pathParts);
            if(pathParts[0] == "" || pathParts.length == 0) { // Home Page
                INDEX_HTML.getPage().then((outHTML) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(outHTML);
                    res.end()
                });
                return;
            } else if(pathParts.length == 1)  { // Character Pages
                switch (pathParts[0]) {
                    case "ALL": // Get all characters
                        jsonData = {...mastersheetValues};
                        break;
                    case "HEADERS": // Just the headers
                        jsonData = {...mastersheetValues};
                        jsonData.data = Object.keys(mastersheetValues.data[0]); 
                        break;
                    default: // Get a specific character
                        jsonData = {...mastersheetValues};
                        jsonData.data = [];
                        charURIs=pathParts[0].split('&');
                        for (character of mastersheetValues.data) {
                            if (charURIs.includes(character.uri))
                                jsonData.data.push(character);
                        }
                        break;
                }
                jsonData.debugInfo = "Through http://server/"+pathParts[0];
                res.writeHead(mastersheetValues.status, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(jsonData));
                res.end();
                return;
            }

            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write("400: Bad request");
            res.end();
            return;
        });

        server.listen(config.port, config.hostname, () => {
            console.log(`Server running at http://${config.hostname}:${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

StartServer();
setInterval(MastersheetToLocal, 10000);