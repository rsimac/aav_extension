/*
 * submit_frep extension, read the url params to prefill flight details
 * also read local storage to set the most recent aircraft used
*/
console.log("starting aav prefill extension")

uri = new URL(document.documentURI);
uriflight = uri.searchParams.get("flight");
uriorig = uri.searchParams.get("orig");
uridest = uri.searchParams.get("dest");

oldelem = document.getElementsByName("Flight_Number")[0]
departurelem = document.getElementsByName("Departure_Airport")[0]
arrivalelem = document.getElementsByName("Arrival_Airport")[0]

if (uriflight) {
	oldelem.setAttribute("value", uriflight);
	departurelem.setAttribute("value", uriorig);
	arrivalelem.setAttribute("value", uridest);
}

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

//set the date to today, most likely
todayelem = document.getElementById("today")
todayelem.click()

//add plain hhmm text field to use instead of pulldowns, it is just my preference
//
pbhhelem = document.getElementsByName("PB_HH")[0]
pbmmelem = document.getElementsByName("PB_MM")[0]
pbtd = pbhhelem.parentElement

pbhhmm = document.createElement("input")
pbhhmm.size=4

// 
// on hhmm text changes, update existing pulldown hh and mm and also dispatch change event to them
// to recalculate total hours as usual
//
pbhhmm.addEventListener("input", (event) => {
	hh = event.target.value.substring(0,2)
	mm = event.target.value.substring(2,4)

	for (var i=0; i<pbhhelem.options.length; i++) {
		if (pbhhelem.options[i].value == hh) {
			pbhhelem.selectedIndex=i;
			break;
		}
	}

			
	for (var i=0; i<pbmmelem.options.length; i++) {
		if (pbmmelem.options[i].value == mm) {
			pbmmelem.selectedIndex=i;
			break;
		}
	}

	var event = new Event('change');
	pbhhelem.dispatchEvent(event);

})

pbtd.appendChild(pbhhmm)



sdhhelem = document.getElementsByName("SD_HH")[0]
sdmmelem = document.getElementsByName("SD_MM")[0]
sdtd = sdhhelem.parentElement

sdhhmm = document.createElement("input")
sdhhmm.size=4
sdhhmm.addEventListener("input", (event) => {
	hh = event.target.value.substring(0,2)
	mm = event.target.value.substring(2,4)

	for (var i=0; i<sdhhelem.options.length; i++) {
		if (sdhhelem.options[i].value == hh) {
			sdhhelem.selectedIndex=i;
			break;
		}
	}

			
	for (var i=0; i<sdmmelem.options.length; i++) {
		if (sdmmelem.options[i].value == mm) {
			sdmmelem.selectedIndex=i;
			break;
		}
	}

	var event = new Event('change');
	pbhhelem.dispatchEvent(event);

})

sdtd.appendChild(sdhhmm)

// end pushback and shutdown time input modifying

