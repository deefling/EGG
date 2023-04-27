const express = require('express');
const server = express();

server.listen(3001, api())

function api (){
    server.get('/endpoint', (req, res) => {
        res.send('This is the template for an endpoint');
    })
}
