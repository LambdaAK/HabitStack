import fetch from 'node-fetch';


fetch('http://192.168.1.10:3000/', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"user": "Alex"})
})
.then(response => response.json())
.then(response => console.log(JSON.stringify(response)))