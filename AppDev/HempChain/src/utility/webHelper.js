const axios = require('react-native-axios');

export async function sendToServer(message) {
    console.log(message);
    axios.get('https://10.0.2.2:5000/api/books')
        .then(response => {
            console.log(response.data);
            console.log("done");
        })
        .catch(error => {
            console.error(error);
            console.error("failed");
        })
}
