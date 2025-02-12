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



