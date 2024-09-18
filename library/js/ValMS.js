"use strict";
function ValMS()
{
    const QUERY = "?characters=HEADERS";
    try {
        // Validate input parameters
        let target = arguments.length > 0 ? arguments : MTScript.getMTScriptCallingArgs();
        if (target.length !== 1) return 0;
        if (typeof (target = target[0]) !== 'string') return 0;

        // Cancel
        if (target == "cancel") return 2;

        // Validate if it doesn't throw an error        
        let response = MTScript.execMacro(`[R: REST.get("${target}${QUERY}")]`);
        return 1;
    }
    catch ( e ) {
        return 0;
    }
}