# aav_extension
Chrome browser extension for AAVirtual (https://aavirtual.com) airline, allowing for automated flight prefill to SimBrief

## Description
This Chrome Browser Extension enhances the Pilot Data page by adding various hyperlinks to existing flight list, including but not limited to:
* AAV 'Submit FREP' page, with selected flight details pre-filled
* SkyVector links for both departure and arrival airports
* SimBrief link with selected flight details pre-filled into SimBrief Generate Flight page
* FlighAware link with selected departure and arrival, displaying real flights and helping with gate assignments

Timetable Search page has been extended to allow:
* "walking" the flights, by selecting the flights and picking the next leg on the same page
* allowing for seamless preparing of entire FREQ, all within same page, no more copy/pasting required
* when preparing is done, all of the flights are visible in Submit FREQ page and are ready for submittal as usual

This is how it looks like, at Timetable Search page, with 10 flights prepared, each originatind at previous flight destination.
 ![image](https://github.com/user-attachments/assets/1e4b3a0d-e9a0-45c7-85c3-b29fef87eabc)

 

## Implementation
This extension consists of simple JavaScript code, and is allowed to read and extend only selected AAVirtual pages. This code has no way of reading or otherwise affecting any other web or other resources at your computer.


## Installation
1. From this Github repository, download the zip archive named extension.zip: https://github.com/rsimac/aav_extension/raw/refs/heads/main/extension.zip
2. From Chrome web browser, follow the instructions on installing local Extensions: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

## Troubleshooting
The script activity can be confirmed by pressing F12 while at those pages and observing the output of the Console tab within the Development Tool window pane. The Console should contain the line starting with: `starting aav prefill extension`. That confirms the script is installed and started.

If there are any error below above message, feel free to send me a message on our AAV Forums, I'll be glad to help.


