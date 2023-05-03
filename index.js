const express = require('express');
const server = express();
const driver = require('./graphDriver.js')
var db = require('./db.js');
var cors = require('cors');



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

server.use(cors())
server.use(express.json());
server.use(commLogs);
server.listen(8000, api())

function api (){

    //CREATE
    server.post('/hatch', async (req, res) => {
        var result = await driver.hatch(req.body)
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
