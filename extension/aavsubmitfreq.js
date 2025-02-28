//prefill already generated freq at timetable, if any
chrome.storage.local.get("aavfrep").then((result) => {
    //why is this async nobody knows
    console.log(JSON.stringify(result))
    storedfrep=[]; //to start with
    if (result.aavfrep) {
        storedfrep = result["aavfrep"]
    }

    //get all inputs
    inputs = document.querySelectorAll("input");

    //prefill Flight1 Flight2 etc
    for (var i=0; i<storedfrep.length; i++) {
        flight = storedfrep[i]
        if (inputs[i].name.startsWith("Flight")) {
            inputs[i].value=`${flight.num} ${flight.from}-${flight.to}`
        }
    }
    
})