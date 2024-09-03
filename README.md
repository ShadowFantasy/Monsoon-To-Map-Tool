# Monsoon Character Sheet Integration
Bring your charactersheet into maptool with a click of a button!

# Setting Up Your Character Sheet (For Players)
You MUST use a copy this modified Character Sheet in order to link up with MapTool
https://docs.google.com/spreadsheets/d/1h0jELEscAGiumseXX-OCWvhsQ631BjOKcP1qGUQJ7BQ/edit?usp=sharing

Step 1: Create a copy of the provided charactersheet by going to File -> Make a copy
Step 2: In your new copy of the charactersheet go to Extensions -> Apps Script
Step 3: Navigate to Request.gs
Step 4: Click Deploy -> New deployment
Step 5: Click the gear in the top left and select "Web App"
Step 6: Set "Who has access" to "Anyone"
Step 7: Click deploy
Step 8: Copy and save the "Web app URL", NOT the deployment ID, it will be referenced during MapTool Setup

Warning! Becareful who or what sees this link, as it can be used to read and write to your charactersheet.

# Setting Up Your Maptool Campaign (For DMs)
Configure your campaign to allow linking between your players charactersheets and player tokens.
Import the included TokenType by going too Edit -> Capaign Properties, and in the Token Properties tab click the import button.
Navigate to "/MonsoonToMapTool/resources/tokentypes/monsoon_tokentype_x.x.x.mtprops"

# Setting Up Your Tokens (Player)
Open up the MapTool token editor then go to Config, then to Properties and select Monsoon.
Next navigate to the properties tab and inside of the "charactersheet" property include that Web App Url that was saved earlier

# WORK IN PROGRESS

# Adding The Macro To Your Players Tokens (DMs)
Open the "Selected" dock, if not already open, go to Window -> Selected, select all player tokens, right click in Common Macros and select "Import Macro to Selected"
Navigate to "/MonsoonToMapTool/resources/tokenmacros/UpdateToken.mtmacro"

# Update Function has now been implemented (STILL IN DEVELOPMENT)
~~your characters can now update their sheets with the UpdateToken Macro~~
THIS IS STILL IN DEVELOPMENT, for UpdateToken macro only retrieves sheet data, but it does not yet update the tokens! This will be added soon along with other features!

# CREDITS
Appscript for REST integration - [Theo Ephraim}(https://github.com/theoephraim/node-google-spreadsheet)
Monsoon RPG System and Base Character Sheet - Bray-G
Macros, MonsoonToMaptool ADD-on, and Character Sheet Modifications - ShadowFantasy58
