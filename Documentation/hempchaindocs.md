HempChain Documentation
=====
Contained here is the documentation for the HempChain app.

HempChain Chaincode Information
-----
The HempChain chaincode makes use of a small number of abstractions, chief among them that different roles are assigned a role code instead of storing information as strings. I believe this contributes to needing less gas to process transactions, but am not certain of that fact.

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
