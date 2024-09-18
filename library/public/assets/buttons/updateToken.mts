[H: "<!--Updates the character using the mastersheet link-->"]
[H: msURI = data.getData("addon:","net.shadow.fantasy.lib.monsoon.sheetapi", "Mastersheet")]
[H: QUERY = "?characters="+getGMName()]
[H: fullResponse = REST.get(msURI + QUERY)]
[H: data = json.get(fullResponse, "data")]
[H: condition = json.length(data) > 0]
[H, IF(condition), CODE:{
    [H: data = json.get(data, 0)]
    [H: keys = json.fields(data)]
    [H, FOREACH(key, keys): setProperty(key, json.get(data,key))]
};{
    [H: broadcast("Query '" + QUERY + "' returned no player data.", "gm,self", ",")]
}]