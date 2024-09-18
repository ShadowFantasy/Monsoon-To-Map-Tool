[H: libname = "net.shadow.fantasy.lib.monsoon.sheetapi"]
[H: tokenSel = getSelected()]

[H, FOREACH(id, tokenSel), CODE:{
    [H: broadcast(libname + "@onInit.mts: resetting " + id + "'s Playersheet@monsoon.sheetapi gm macro panel...", "gm")]
    [H: macroGroup = getMacroGroup("Playersheet@monsoon.sheetapi", ",", id)]
    [H, FOREACH(index, macroGroup): removeMacro(index, id)]

    [H: "Creates or updates the mastersheet update button. This is used for setting the link to the mastersheet that other important scripts require"]
    [H: mtsfile = data.getStaticData(libname, "public/assets/buttons/updateToken.mts")]
    [H: jsonfile = data.getStaticData(libname, "public/assets/buttons/updateToken.json")]
    [H: mtsname = json.get(jsonfile,"label")]

    [H: broadcast(libname + "@setPD.mts: creating '" + mtsname +"'", "gm")]
    [H: mcbindex = createMacro(jsonfile, id)]
    [H: setMacroCommand(mcbindex, mtsfile, id)]

    [H: "Sets the propertyType of the token"]
    [H: setPropertyType("Monsoon Player")]
}]