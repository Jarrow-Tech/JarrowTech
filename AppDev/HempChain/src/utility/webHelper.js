const axios = require('react-native-axios');

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
