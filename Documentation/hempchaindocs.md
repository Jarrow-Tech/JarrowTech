HempChain Documentation
=====
Contained here is the documentation for the HempChain app.

App Integration with the API
-----
Integration with the api from the app utilizes the help functions present in the `utility/webHelper.js` file. The primary method in use is the `sendToServer(url, message)` function. Simply call this function passing the url to the api and a JSON object with all of the information required by the api method. The helper function you're calling will pass back any response from the api. For instance, in order to call the harvest api method from the application,

```javascript
let harvestResponse = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/harvest', {
    address: 1234567890987654321,
    uid: '7wsdf8e4f3sg78h5e2s1df1v7v',
    cropSize: 100
});
```

This fires off an api request to the contract address 1234567890987654321 for the user 7wsdf8e4f3sg78h5e2s1df1v7v. The response from the server, either {True} or {False} will be contained in the harvestResponse variable. 

API Paths
=====
Each of the following paths must be posted to with the required information. Make use of the information discussed in App Integration with the API to see how to do this from the app.

##/api/books
This method is simply a test method to verify the server is online. It returns a JSON object containing information about some books.

##/api/web/test
This method fires every backend method and returns a scan object at the end. It is only for use in a development environment and should be removed for production. This is one of the only methods that works simply as a `GET`

##/api/web/makeContract
This method creates a new contract object on the back end. It takes no parameters, and returns the hash "contract address" that is used on the backend to group all events.

##/api/web/plant
This method registers a plant event. It takes a contract address and the UID of the user calling the method. It will validate that both the contract exists and that the UID belongs to a farmer before firing the plant method. Currently a JSON object is returned with the only contents being True or False. True if the action succeeded and False otherwise.

##/api/web/harvest
This method registers a harvest event. It takes a contract address, the UID of the user calling the method, and an integer representing the crop size. It will validate that both the contract exists and that the UID belongs to a farmer before firing the harvest method. Currently a JSON object is returned with the only contents being True or False. True if the action succeeded and False otherwise.

##/api/web/scan
This method returns a large object with every event that was logged on the contract. It takes a contract address and a UID. It will validate that both the user and contract exist before firing the scan method. It returns a JSON object containing every scan event that has been registered on the contract. These objects are addressed in order from [0..n] where n is the number of objects. Object 0 will always be a blank, empty contract, and so the events worth noting are numbered [1..n]

##/api/web/transferOwner
This method registers a transfer of ownership event. It takes a contract address, the UID of the user calling the method, and the UID of the user who will receive ownership. It will validate that both the contract exists and that both users exist before firing the transfer method. Currently a JSON object is returned with the only contents being True or False. True if the action succeeded and False otherwise.

##/api/web/addCoa
This method adds a coa to the contract. It takes a contract address, the UID of the user calling the method, and a 4x3 integer array represening the COA. It will validate that both the contract exists and that the UID belongs to a technician before firing the addCoa method. Currently a JSON object is returned with the only contents being True or False. True if the action succeeded and False otherwise.

##/api/web/validateCoa
This method validates a coa on the contract. It takes a contract address and the UID of the user calling the method. It will validate that both the contract exists and that the UID belongs to a technician before firing the validateCrop method. Currently a JSON object is returned with the only contents being True or False. True if the action succeeded and False otherwise.

##/api/web/manufacture
This method updates the manufactured information about the contract. It takes a contract address, the UID of the user calling the method, and the new hempState. It will validate that both the contract exists and that the UID belongs to a manufacturer before firing the manufacture method. Currently a JSON object is returned with the only contents being True or False. True if the action succeeded and False otherwise.

HempChain Chaincode Information
=====
The HempChain chaincode makes use of a small number of abstractions, chief among them that different roles are assigned a role code instead of storing information as strings. I believe this contributes to needing less gas to process transactions, but am not certain of that fact.

Note: This is now deprecated as we move away from the ethereum backend but they remain here for future reference.

The roles are as follows:

| Code | Role        |
|------|-------------|
| 0    | Scan        |
| 10   | Farmer      |
| 11   | Planted     |
| 20   | Enforcement |
| 30   | Technician  |
| 31   | TestingLog  |
| 40   | Transporter |
| 50   | Regulator   |
| 60   | EndUser     |

Additionally, the Certificate of Analysis is represented by a 4 element array where each element is a 3 element array. The top level arrays stand for the CBDA, THCA, CBGA, and Delta9-THC respectively. The columns represent entries in the data table.
