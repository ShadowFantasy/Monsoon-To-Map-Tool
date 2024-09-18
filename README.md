# Monsoon Character Sheet Integration
Bring your charactersheet into maptool with a click of a button!

## Master Sheet UPDATE!!
With this update comes more efficient retrieval of character data. With the mastersheet you can combine all of your player characters raw data onto a central spreadsheet that can allow for quick bulk updates of multiple charactersheets simultaneously

## Set Up Your Master Sheet (Game Masters)
1. Create a copy of this spreadsheet https://docs.google.com/spreadsheets/d/1OMnjw2Hec7aC-WjrwRlKF_pEdHYM7EofRri6Ff_OeD8/edit?usp=sharing into your google drive
2. Open up the Appscript Extensions and click New Deployment
3. Set the type to Web App and set the web app properties to Execute as you, and anyone has access.
4. Copy the web app link

For adding your players, add a shared link from their player sheets to the mastersheet SHEET LINK column
If it works properly most of the fields should be filled in.

## Setting Up Your Maptool Campaign (For DMs)
Configure your campaign to allow linking between your players charactersheets and player tokens.
Import the included TokenType by going too Edit -> Capaign Properties, and in the Token Properties tab click the import button.
Navigate to "/MonsoonToMapTool/resources/tokentypes/monsoon_npc.mtprops"
Repeat this for "/MonsoonToMapTool/resources/tokentypes/monsoon_pc.mtprops"

## Adding The Macro To Your Players Tokens (DMs)
When you add the MonsoonToMapTool.mtlib to your campaign it should create buttons inside of your gm panel
1. First you will want to setup your mastersheet, click the button and then provide your mastersheet web app URL
2. Next you'll want to configure your Player's tokens, set their token property type to Monsoon PC, and set the token to be a Player Character.
3. Then you'll want to set the token's GM name to their name inside of the Mastersheet
4. With the player token selected, click Give Sheet Access. Your player will now have a new macro that lets them update their token

## CREDITS
Monsoon RPG System and Base Character Sheet - Bray-G

Macros, MonsoonToMaptool ADD-on, and Character Sheet Modifications - ShadowFantasy58
