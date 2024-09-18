[H: manual = "@description Standard output for checks.<br>"+
"@param dice The number of dice to roll. Accepts an integer.<br>"+
"@param sides* The number of sides on the dice. Default 6.<br>"+
"@param doFormat* Whether the return should be formated for display. Accepts true(1) or false(0). Defaults to true(1).<br>"+
"@param title* The text that is displayed with the roll. Only matters when doFormat is true. Accepts a string. Defaults to CHECK.<br>"+
"@return If doFormat is true it returns a styled text ouput to display rolls, otherwise it returns the raw rolls as a list.<br>"+
"ALTERNATE: INPUT PROMPT<br>"+
"@description Prompts the caller for inputs that will be used when making the roll.<br>"+
"@return If doFormat is true it returns a styled text ouput to display rolls, otherwise it returns the raw rolls as a list.<br>"+
"ALTERNATE: HELP<br>"+
"@description Broadcasts this info to the caller<br>"+
"@param dice If contains the text '-h' then this manual is broadcasted."]
[H: dice = 2]
[H: sides = 6]
[H: doFormat = 1]
[H: title = "Check: "]
[H: retval = ""]

[H: argc = argCount()]
[H: condition = argc == 0]
[H, IF(condition), CODE:{
    [H: condition = input(
        "dice|2|Dice To Roll|TEXT|",
        "sides|6|Number of Sides|TEXT|",
        "doFormat|1|Format Results|CHECK|",
        "0|Title (displayed when formatted)||LABEL|SPAN=TRUE",
        "title|Check: ||TEXT|SPAN=TRUE"
    )]
    [H: abort(condition)]
};{
    [H: "Check if the caller is asking for help. If they are then display the manual to them and abort."]
    [H: condition = arg(0) == "-h"]
    [S,R: return(not(condition),manual)]

    [H: dice = arg(0)]

    [H: condition = argc > 1]
    [H, IF(condition): sides = arg(1)]

    [H: condition = argc > 2]
    [H, IF(condition): doFormat = arg(2)]

    [H: condition = argc > 3]
    [H, IF(condition): title = arg(3)]
}]

[H: "Check that the dice argument is valid. If not then display an error them and abort"]
[H: condition = not(isNumber(dice))]
[S,R: return(not(condition),"Parameter type error: was expecting a number, but recieved '"+dice+"' instead.")]

[H: "Check that the sides argument is valid. If not then display an error them and abort"]
[H: condition = not(isNumber(sides))]
[S,R: return(not(condition),"Parameter type error: was expecting a number, but recieved '"+sides+"' instead.")]

[H: "Check that the doFormat argument is valid. If not then display an error them and abort"]
[H: condition = not(listContains("1,0",doFormat))]
[S,R: return(not(condition),"Parameter type error: was expecting a boolean value, but recieved '"+doFormat+"' instead.")]

[H: threshold = sides/2]

[H: results = ""]
[H: successes = ""]
[H: fails = ""]
[H: successTotal = 0]
[H: failTotal = 0]
[H, C(dice), CODE:{
	[H: thisRoll = dice(1,sides)]
	[H: results = listAppend(results, thisRoll)]
    [H: condition = thisRoll > threshold]
	[H, IF(condition):
		successes = listAppend(successes, thisRoll);
		fails = listAppend(fails, thisRoll)
	]
	[H, IF(doFormat): retval = if(condition,
        retval + "<span style='color:green;'> " + thisRoll + "</span>",
		retval + "<span style='color:red;'> " + thisRoll + "</span>"
    )]
}]
[H: successTotal = listCount(successes)]
[H: failTotal = listCount(fails)]
[H: retval = if(doFormat,
retval+"<br>"+
"<b style='font-size:1.50em;'>"+title+
"<span style='color:green;'>"+successTotal+" </span>"+
"<span style='color:red;'>"+failTotal+"</span></b>",
strPropFromVars("successTotal,failTotal,results")
)]
[R: return(0,retval)]