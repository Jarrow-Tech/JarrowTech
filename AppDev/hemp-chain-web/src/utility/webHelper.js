const axios = require('axios');

// a simple helper function to hide axios calls and streamline web imports
// this file can be extended to encapsulate other online/web related methods
export async function sendToServer(url, message) {
    let resp = await axios.post(url, message)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
        })
    return resp;
}