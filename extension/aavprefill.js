console.log("starting aav prefill extension")


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


	if (airlinefnum != "COMPLETED") {
		simbrief = `<a target="_blank" href="https://dispatch.simbrief.com/options/custom?airline=${airline}&fltnum=${flightnum}&orig=${from}&dest=${to}">SIMBRIEF</a>`;
		flightaware = `<a target="_blank" href="https://www.flightaware.com/live/findflight?origin=${from}&destination=${to}">FLIGHTAWARE</a>`
		frep = `<a target="_blank" href="https://aavirtual.com/pages.php?name=Submit_FREP&flight=${airlinefnum}&orig=${from}&dest=${to}">${airlinefnum}</a>`;
		skyvectorfrom = `<a target="_blank" href="https://skyvector.com/airport/${from}">${from}</a>`;
		skyvectorto = `<a target="_blank" href="https://skyvector.com/airport/${to}">${to}</a>`;
		newrow = newrow + frep + " " + skyvectorfrom +"-"+ skyvectorto+ "    " + simbrief + "    " + flightaware + "   "

		store = {"airline": airline, "flight": flightnum, "from": from, "to": to};
		storedflights.push(store);
	}
	else {
		newrow += flight;
	}



	newrow += "<br>"
}

flightstable.innerHTML = newrow;

