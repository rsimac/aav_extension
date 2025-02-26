/*
extension to timetable search
should add select radio button to each row
and relfect selection in new right pane
will also allow new search from the right pane
with selected flight destination picked
as next flight origin
*/

console.log("aavtimetable loaded")

/*
#main > table:nth-child(11) > tbody > tr:nth-child(3)
#main > table:nth-child(11) > tbody > tr:nth-child(3)
#main > table:nth-child(15) > tbody > tr:nth-child(3)


#main > table:nth-child(11) > tbody > tr:nth-child(3)
*/

flightrows = document.querySelectorAll("tbody > tr:nth-child(3)");

oldsearch = document.querySelector("#main > a:nth-child(4)")
/*
newsearchtext = document.createTextNode("text")
oldsearch.after(newsearchtext);

searchbutton = document.createElement("button")
newsearchtext.after(searchbutton)
searchbutton.setAttribute("type","button")
searchbutton.setAttribute("disabled","true")
searchbutton.attributeStyleMap.clear()
*/


divelem = document.createElement("div")
oldsearch.after(divelem)

colelem = document.createTextNode("Add selected flight to FREQ and search for next leg from: ")
colelem.style="font-family:monospace"
divelem.after(colelem)
searchicao = document.createTextNode("ICAO")
searchicao.style="font-family:monospace"
searchicao.textContent="ICAO"
colelem.after(searchicao)

searchbutton = document.createElement('button');
searchbutton.setAttribute("type","button")
searchbutton.setAttribute("name","searchbutton")
searchbutton.disabled=true;
searchbutton.textContent="SEARCH"
//this all is needed to UNDO the default page css
searchbutton.style="color:buttontext;background-color:buttonface;border-width:2px;border-style:outset;border-color:buttonborder;border-image:initial;margin:0em;padding:2px 2px;"
searchicao.after(searchbutton)

resetbutton = document.createElement('button');
resetbutton.setAttribute("type","button")
resetbutton.setAttribute("name","resetbutton")
resetbutton.textContent="RESET"
//this all is needed to UNDO the default page css
resetbutton.style="color:buttontext;background-color:buttonface;border-width:2px;border-style:outset;border-color:buttonborder;border-image:initial;margin:0em;padding:2px 2px;"
searchbutton.after(resetbutton)


tablelem = document.createElement("table")
resetbutton.after(tablelem)

flightsrow = []


//10col empty row for selected flights
rowelem = document.createElement("tr")
    
for (var col=0; col<10; col++) {
    colelem = document.createElement("td")
    colelem.textContent=``
    colelem.style="font-family:monospace"
    rowelem.appendChild(colelem)
    
    flightsrow[col]=colelem
}

tablelem.appendChild(rowelem)


//also fill in already set flights
chrome.storage.local.get("aavfrep").then((result) => {
    //why is this async nobody knows
    console.log(JSON.stringify(result))
    storedfrep=[]; //to start with
    if (result.aavfrep) {
        storedfrep = result["aavfrep"]
    }

    //draw it
    for (var i=0; i<storedfrep.length; i++) {
        flight = storedfrep[i]
        flightsrow[i].textContent = `${flight.from} ${flight.dept} ->`
    }
    
})



searchbutton.onclick = function() {
    console.log(this.value);

    flight = JSON.parse(this.value);

    //add flight to local chrome storage
    //also set and store the last aircraft selected

    storedfrep = []

    chrome.storage.local.get("aavfrep").then((result) => {
        //why is this async nobody knows
        console.log(JSON.stringify(result))
        if (result.aavfrep) {
            storedfrep = result["aavfrep"]
        }
        //update with new flight and store
        storedfrep.push(flight)
        chrome.storage.local.set({"aavfrep": storedfrep});
        
    })

    

    paginator = document.querySelector("span > a") //get the paginator 'buttons' for search query
    if (paginator) {
        search = paginator.href.split("?")[1]
    }
    else {
        //if no paginator use default search no rank by time TBD find original search somehow
        search=`?s=&name=Search_Timetable&search_action=search_table&display_pos=0&flight_num=&equipment=&`
        search+=`dep=&arr=&rank=&display_num=50&sort_param=departure_time&sort=ASC`
    }

    sp = new URLSearchParams(search)

    sp.set("dep", flight["to"])
    sp.set("display_pos",0)

    searchicao.textContent=flight.to

    window.location.search=sp.toString();

}


resetbutton.onclick = function() {
    //reset the stored frep
    chrome.storage.local.set({"aavfrep": []});
    //draw it
    for (var i=0; i<flightsrow.length; i++) {
        flightsrow[i].textContent = "";
    }
}


    
    

    





for (var i=0; i<flightrows.length; i++) {
    flightrow = flightrows[i];
    selectbutton = document.createElement("input");
    selectbutton.setAttribute("type","radio");
    selectbutton.setAttribute("name","flightselect");
    
    selectcol = document.createElement("td");
    selectcol.setAttribute("class","data1");
    selectcol.setAttribute("style","text-align:center"); 
    
    //get the flight data to associate with the select event listener
    flightcols = flightrow.querySelectorAll("td.data1 > center")
    flight = {
        "num": flightcols[0].innerText.trim(),
        "from": flightcols[1].innerText.slice(-4),
        "dept": flightcols[2].innerText.slice(-5),
        "to": flightcols[3].innerText.slice(-4),
        "arrt": flightcols[4].innerText.slice(-5)
    }

    selectbutton.setAttribute("value", JSON.stringify(flight))

    selectbutton.onclick = function() {
        console.log(this.value)

        flight = JSON.parse(this.value);

        searchicao.textContent=flight["to"]

        searchbutton.value=this.value

        searchbutton.disabled=false;

        //extensiontable[0][0].textContent = `   ---- extension ---- ADD THIS FLIGHT TO FREQ AND SEARCH FOR NEXT LEG FROM: ${flight["to"]}`
        //extensiontable[0][0].colspan=7
        //newsearch.href = `./pages.php?s=&name=Search_Timetable&search_action=search_table&display_pos=0&flight_num=&equipment=&dep=${flight["to"]}&arr=&rank=&display_num=50&sort_param=departure_time&sort=ASC`

    }

    selectcol.appendChild(selectbutton);
    flightrow.appendChild(selectcol);

}

