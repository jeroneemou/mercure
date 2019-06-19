const express = require('express')
const app = express()
const port = 3000

const http = require('http');
const querystring = require('querystring');

app.use(express.json())

app.post('/', (req, res) => {

    const postData = querystring.stringify({
        'topic': 'whatever',
        'data': JSON.stringify(req.body),
    });
    
    const hubRequest = http.request({
        hostname: 'localhost',
        port: 80,
        path: '/hub',
        method: 'POST',
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InN1YnNjcmliZSI6W10sInB1Ymxpc2giOltdfX0.rHbUIeTk5cobMgOFbuc_8WDNN9wVTyYnf7O5u9H9LgE',
            // the JWT must have a mercure.publish key containing an array of targets (can be empty for public updates)
            // the JWT key must be shared between the hub and the server
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(postData),
        }
    }, /* optional response handler */);
    hubRequest.write(postData);
    hubRequest.end();

    res.send('ok')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))