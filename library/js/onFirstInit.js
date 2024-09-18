try{
    MapTool.chat.broadcast(`onFirstInit.js`);
} catch (e) {
    MapTool.chat.broadcast(`${e}, ${e.stack}`);
}
