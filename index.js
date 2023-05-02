const express = require('express');
const server = express();
const driver = require('./graphDriver.js')

server.listen(8000, api())

function api (){

    server.get('/home', (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send(Buffer.from('<h2>Endpoints</h2></br><a href="">/hatch (dead link for now)</a></br><a href="">/mutateChicken (dead link for now)</a></br><a href="">/decapitate (dead link for now)</a></br><a href="http://localhost:8000/getChicken">/getChicken</a></br><a href="http://localhost:8000/getAllChickens">/getAllChickens</a></br><a href="http://localhost:8000/easterEgg">/easterEgg</a>'));
    })

    //CREATE
    server.post('/hatch', (req, res) => {
        res.send('This endpoint makes new chickens');
    })

    //UPDATE
    //chernobylChicken???
    server.put('/mutateChicken', (req, res) => {
        res.send('This endpoint modifies existing chickens');
    })

    //DELETE
    server.delete('/decapitate', (req, res) => {
        res.send('This endpoint deletes chickens');
    })

    //READ
    server.get('/getChicken/:id', (req, res) => {
        var id = req.params.id;
        var chicken = driver.getChickenById(id);
        console.log(chicken)
        res.send('This endpoint retrieves data about a chicken');
    })

    server.get('/getAllChickens', (req, res) => {
        res.send('This endpoint retrieves data about all chickens');
    })

    //other
    server.get('/easterEgg', (req, res) => {
        res.redirect(301, "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    })
}
