var formWindow = document.getElementById("formWindow");
var resultWindow = document.getElementById("resultWindow");

var hatchButton = document.getElementById("hatch");
var getButton = document.getElementById("getChicken");
var getAllButton = document.getElementById("getAllChickens");
var mutateButton = document.getElementById("mutateChicken");
var decapitateButton = document.getElementById("decapitate");
var easterButton = document.getElementById("easterEgg")

hatchButton.addEventListener("click", () => {
    var form = document.createElement("form");
    form.innerHTML = `
    <label for="id">ID:</label><br>
    <input type="text" id="id" name="id"><br><br>
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name"><br>
    <label for="breed">Breed:</label><br>
    <input type="text" id="breed" name="breed"><br>
    <label for="color">Color:</label><br>
    <input type="text" id="color" name="color"><br>
    <label for="avgEggsPerWeek">Avg. Eggs per Week:</label><br>
    <input type="text" id="avgEggsPerWeek" name="avgEggsPerWeek"><br>
    <input type="button" value="Submit" id="hatchButton">`; 
    formWindow.appendChild(form);
    document.getElementById("hatchButton").addEventListener("click", () => {sendHatch()});
})

sendHatch = () => {
    //TODO - deal with farm stuff?

    var _id = document.getElementById("id");
    var _name = document.getElementById("name");
    var _breed = document.getElementById("breed");
    var _color = document.getElementById("color");
    var _avgEggsPerWeek = document.getElementById("avgEggsPerWeek");

    (async () => {
        const rawResponse = await fetch('http://192.168.44.18:8000/hatch', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(
            {
                id: _id,
                name: _name,
                breed: _breed,
                color: _color,
                avgEggsPerWeek: _avgEggsPerWeek,
                farmID: 2
            }
            )
        });
        const content = await rawResponse.json();
      
        console.log(content);
        resultWindow.innerHTML = content
      })();
}

getButton.addEventListener("click", () => {
    var form = document.createElement("form");
    form.innerHTML = `
    <label for="id">ID:</label><br>
    <input type="text" id="id" name="id"><br><br>
    <input type="button" value="Submit" id="getButton">`; 
    formWindow.appendChild(form);
    document.getElementById("getButton").addEventListener("click", () => {sendGet()});
})

sendGet = () => {

    var _id = document.getElementById("id");

    (async () => {
        const rawResponse = await fetch(`http://192.168.44.18:8000/getChicken/${_id}`, {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        });
        const content = await rawResponse.json();
      
        console.log(content);
        resultWindow.innerHTML = content
      })();
}