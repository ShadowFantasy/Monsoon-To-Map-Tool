[H: condition=input("skill|agility,comprehension,endurance,finesse,influence,perception,power,stealth,will|Select Skill|LIST|SELECT=0 VALUE=STRING",
"dicemod|0|Modifier|TEXT||")]
[R, IF(condition), CODE:{
	[H: skillmod = getProperty(skill)]
	[H: dice = 2]
	[H: dice = dicemod + dice + skillmod]
	[R: cRoll(dice, 6, 1, skill + " check: ")]
}]