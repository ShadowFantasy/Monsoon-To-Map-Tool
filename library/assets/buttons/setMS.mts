[H: input("DpLink|url|Master Sheet WebApp|TEXT")]
[H: validation=0]
[H: validation=js.evalNS("net.monsoon.lib", "ValMS()", DpLink)]
[H, WHILE(validation == 0), CODE: {
	[H: input(
		"_|There was a problem validating mastersheet. Please try again, or type 'cancel' to quit this action.||LABEL|SPAN=TRUE",
		"DpLink||Master Sheet WebApp|TEXT"
	)]
	[H: validation=js.evalNS("net.monsoon.lib", "ValMS()", DpLink)]
}]
[H, SWITCH(validation), CODE:
	case 1:{
		[H: data.setData("addon:", "net.shadow.fantasy.lib.monsoon.sheetapi", "Mastersheet", DpLink)]
		[H: broadcast("set MasterSheet to " + DpLink, "gm")]
	};
	default: {[H:"Nothing"]};
]