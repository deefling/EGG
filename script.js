var formWindow = document.getElementById("formWindow");
var resultWindow = document.getElementById("resultWindow");

var hatchButton = document.getElementById("hatch");

hatchButton.addEventListener("click", () => {
    var form = document.createElement("form");
    form.innerHTML = `
    <label for="id">ID:</label><br>
    <input type="text" id="id" name="id"><br><br>
    <label for="name">Name:</label><br>
    <input type="text" id="name" name="name"><br>
    <input type="button" value="Submit" id="hatchButton">`; 
    // form.setAttribute("onSubmit", "sendHatch()");
    formWindow.appendChild(form);
    document.getElementById("hatchButton").addEventListener("click", () => {sendHatch()});

})

sendHatch = () => {

    var _id = document.getElementById("id");
    var _name = document.getElementById("name");

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
                breed: "Brahma",
                color: "black",
                avgEggsPerWeek: 6,
                farmID: 2
            }
            )
        });
        const content = await rawResponse.json();
      
        console.log(content);
        resultWindow.innerHTML = content
      })();
}