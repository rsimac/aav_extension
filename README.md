# aav_extension
Chrome browser extension for AAVirtual (https://aavirtual.com) airline, allowing for automated flight prefill to SimBrief

## Description
This Chrome Browser Extension provides the SimBrief links for pre-filling the scheduled flights visible on Pilot Data page.

Example screenshot, demonstrating couple of completed flights, with no pre-fill links, and couple of outstanding flights, ready to be pre-filled at SimBrief:

![image](https://github.com/user-attachments/assets/295b72c8-5f40-4e26-b113-ab92b294d16b)

Additionally, this extension is preloading the select list for flight numbers at Submit FREP page, as well as loading the Departure and Arrival airport codes and last Aircraft used.

Example screenshot, demonstrating the list of flights, airports for selected flight, and the last used aircraft:

![image](https://github.com/user-attachments/assets/6a13bf7c-62a1-4375-9892-ab44cfdce434)

## Implementation
This extension consists of simple JavaScript code, and is allowed to read and modify only selected AAVirtual pages, namely the: `Pilot Data` page and `Submit FREP` page.



## Installation
1. At your local disk, create the folder named `extension`
2. From this Github repository, download all of the files from the folder [extension](./extension) into your local folder.
3. From Chrome web browser, follow the instructions on installing local Extensions: https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked

## Troubleshooting
This script acts only on "Pilot Data" and "Submit FREP" pages. The script activity can be confirmed by pressing F12 while at those pages and observing the output of the Console tab within the Development Tool window pane. The Console should contain the line starting with: `starting aav prefill extension`. That confirms the script is installed and started.

If there are any error below above message, feel free to send me a message on our AAV Forums, I'll be glad to help.


