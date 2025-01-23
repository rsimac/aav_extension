console.log("starting aav prefill extension")


if (document.location.search.startsWith("?name=Pilot_Data")) {
    tables=document.getElementsByTagName("table")

    //console.log("tables: "+tables)

    flightstable = tables[0].getElementsByTagName("tr")[8].getElementsByTagName("td")[1]

    flights = flightstable.innerHTML.split("<br>")

    storedflights = [];

    newrow = ""
    for (flight of flights) {
        if (flight == "") {break;}
        flight = flight.trim()
        //console.log({flight});
        parts = flight.split(" ");
        //console.log({parts});
        airlinefnum = parts[0];
        
        fromto = parts[1].split("-");
        from = fromto[0];
        to = fromto[1];
        airline = airlinefnum.slice(0,3);
        flightnum = airlinefnum.slice(3);
        //console.log({airline}); console.log({flightnum}); console.log({from}); console.log({to});
        simbrief = "<a href=https://dispatch.simbrief.com/options/custom?airline="+airline+"&fltnum="+flightnum+"&orig="+from+"&dest="+to+">PREFILL</a>";
        //console.log({simbrief});
        newrow = newrow + flight

        if (airlinefnum != "COMPLETED") {
            newrow = newrow + " " + simbrief
            store = {"airline": airline, "flight": flightnum, "from": from, "to": to};
            storedflights.push(store);
        }
        
        newrow += "<br>"
    }

    flightstable.innerHTML = newrow;

    //store the flights for frep submit pull down menu
    chrome.storage.local.set({"aavflights": storedflights});
}    
else if (document.location.search.startsWith("?name=Submit_FREP")) {
    //load the list of stored flights and offer them as pulldown
    chrome.storage.local.get("aavflights").then((result) => {
        storedflights = result.aavflights;
        console.log(storedflights);
        
        oldelem = document.getElementsByName("Flight_Number")[0]
            
        newelem = document.createElement("datalist");
        newelem.id = "storedflights"
        
        const fromtomap = new Map();

        storedflights.forEach((flight) => {
            option = document.createElement("option");
            option.value = flight.airline + flight.flight;
            option.innerHTML = option.value;
            newelem.appendChild(option);
            
            //also preload the flightnum from-to map
            fromtomap.set(option.value, {"from":flight.from, "to":flight.to})
        })        
        
        oldelem.setAttribute("list", "storedflights"); //offer above list of suggestions
        oldelem.removeAttribute("value"); //remove default aal value
        //add new list into html doc
        oldelem.parentElement.appendChild(newelem)
        
        departurelem = document.getElementsByName("Departure_Airport")[0]
        arrivalelem = document.getElementsByName("Arrival_Airport")[0]
        
        //at flightnumber elem change, do change from and to fields as well
        oldelem.addEventListener("input", (event) => {
            fromto = fromtomap.get(event.target.value);
            departurelem.value = fromto.from;
            arrivalelem.value = fromto.to;
        })
        
        aircraftelem = document.getElementsByName("Aircraft_Used")[0];

        //also set and store the last aircraft selected
        chrome.storage.local.get("aavlastaircraft").then((lastaircraft) => {
            //why is this async nobody knows
            aircraftelem.value = lastaircraft.aavlastaircraft;
        })
        
        //store the aircraft selected into storage, on change, to be retrieved and populated next time
        aircraftelem.addEventListener("input", (event) => {
            chrome.storage.local.set({"aavlastaircraft": event.target.value});
        })

    });

    
    
    
    
    
}
