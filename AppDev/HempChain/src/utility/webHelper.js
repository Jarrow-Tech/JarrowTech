const axios = require('react-native-axios');

export async function sendToServer(url, message) {
    console.log(message);
    axios.post(url, message)
        .then(response => {
            console.log(response.data);
            console.log("done");
        })
        .catch(error => {
            console.error(error);
            console.error("failed");
        })
}
