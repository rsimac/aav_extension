# aav_extension
Chrome browser extension for AAVirtual (https://aavirtual.com) airline, allowing for automated flight prefill to SimBrief

## Description
This Chrome Browser Extension enhances the Pilot Data page by adding various hyperlinks to existing flight list, including but not limited to:
* AAV 'Submit FREP' page, with selected flight details pre-filled
* SkyVector links for both departure and arrival airports
* SimBrief link with selected flight details pre-filled into SimBrief Generate Flight page
* FlighAware link with selected departure and arrival, displaying real flights and helping with gate assignments

## Implementation
This extension consists of simple JavaScript code, and is allowed to read and modify only selected AAVirtual pages, namely the: `Pilot Data` page and `Submit FREP` page.


## Installation
1. At your local disk, create the folder named `extension`
2. From this Github repository, download all of the files from the folder [extension](./extension) into your local folder.
3. From Chrome web browser, follow the instructions on installing local Extensions: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

## Troubleshooting
This script acts only on "Pilot Data" and "Submit FREP" pages. The script activity can be confirmed by pressing F12 while at those pages and observing the output of the Console tab within the Development Tool window pane. The Console should contain the line starting with: `starting aav prefill extension`. That confirms the script is installed and started.

If there are any error below above message, feel free to send me a message on our AAV Forums, I'll be glad to help.


