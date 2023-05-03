const express = require('express');
const server = express();
const driver = require('./graphDriver.js')
var db = require('./db.js');



function commLogs(req, res, next) {
    doc = {
        url: req.url,
        method: req.method,
        clientAddress: req.ip,
        //host: req.host
        x_api_key: req.header("x-api-key"),
        time: new Date()
    };
    db.logs.create(doc)
    next();
}

server.use(express.json());
server.use(commLogs);
server.listen(8000, api())

function api (){

    server.get('/home', (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<h2>Endpoints</h2></br><a href="">/hatch (dead link for now)</a></br><a href="">/mutateChicken (dead link for now)</a></br><a href="">/decapitate (dead link for now)</a></br><a href="http://localhost:8000/getChicken">/getChicken</a></br><a href="http://localhost:8000/getAllChickens">/getAllChickens</a></br><a href="http://localhost:8000/easterEgg">/easterEgg</a>'));
    })

    //CREATE
    server.post('/hatch', async (req, res) => {
        var result = await driver.createChicken(req.body)
        res.send(result);
    })

    //UPDATE
    server.put('/mutateChicken', async (req, res) => {
        var result = await driver.mutateChicken(req.body)
        res.send(result);
    })

    //DELETE
    server.delete('/decapitate/:id', async (req, res) => {
        var id = req.params.id;
        var result = await driver.deleteChicken(id);
        res.send(result);
    })

    //READ
    server.get('/getChicken/:id', async (req, res) => {
        var id = req.params.id;
        var chicken = await driver.getChickenById(id);
        console.log(chicken)
        res.send(chicken);
    })

    server.get('/getAllChickens', async (req, res) => {
        // res.send('This endpoint retrieves data about all chickens');
        var result = await driver.getAllChickens();
        console.log(result)
        res.send(result);
    })

    //other
    server.get('/easterEgg', (req, res) => {
        res.redirect(301, "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    })
}
