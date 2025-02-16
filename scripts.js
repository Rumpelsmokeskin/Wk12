//DATABASE OF PEEPS FUNCTIONS

//I made the variables for what the training video called "state" and for DOM manipulation
let peepsContainer = document.getElementById("cardContainer")
const peepsButton = document.getElementById("showPeeps")
const createPeepButton = document.getElementById("addPeep")
const nameInput = document.getElementById("nameInput")
const addressInput = document.getElementById("addressInput")

//event listener for show button (Read in CRUD)
peepsButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetchPeeps();
})
//event listener for the create button (Create in CRUD)
createPeepButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (nameInput.value !== "" && addressInput.value !== "")
        createPeep();
})

//This is the function called in the Read event listener
async function fetchPeeps() {
   peepsContainer.innerHTML="";
    const response = await fetch("http://localhost:3000/profiles")
    const peeps = await response.json()

    //This creates the card for each item in the JSON DB array
    peeps.forEach(peep => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';
         card.innerHTML = `
         <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 id="cardName" class="card-title">${peep.name}</h5>
           <p id="cardAddress" class="card-text">${peep.address}</p>
           <button data-id=${peep.id} class="btn btn-danger">Delete</button>
         </div>
       </div>`;
        //This is the delete button for each card ties to each DB entry but the "peep.id"
       const deleteButton = card.querySelector('.btn-danger');
       deleteButton.addEventListener('click', (event) => {
         card.remove();
         deletePeep(peep);
       });
       peepsContainer.appendChild(card);
     });
   
}
//function to create a PEEP in the JSON DB
async function createPeep(){
    const newPeep = {name: nameInput.value, address: addressInput.value }
    console.log(newPeep);
    const response = await fetch("http://localhost:3000/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newPeep)
    })
}

//this is the deletePeep function that removes a PEEP from the JSON DB
async function deletePeep(peep){
    const response = await fetch("http://localhost:3000/profiles/" + peep.id, {
        method: "DELETE"
    })
}