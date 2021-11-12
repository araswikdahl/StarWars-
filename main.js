let counter = 1;
const base_url = "https://swapi.dev/api";
let currentCharcter;
let aside = document.querySelector("aside");
let leftBtn = document.querySelector(".left-icon");
let rightBtn = document.querySelector(".right-icon");
let numberPage = document.querySelector(".page-number");
let peopleDetails = document.querySelector(".people-details");
let characterInfo = document.querySelector(".character-info");
let planetBtn = document.querySelector(".planet-btn");
let speciesBtn = document.querySelector(".species-btn");
let vehicleBtn = document.querySelector(".vehicles-btn");
let starshipsBtn = document.querySelector(".starships-btn");

let newArticle = document.createElement("article");
newArticle.innerHTML = `
<section class="loader-container">
<div class="loader"></div>
</section>
`;
let article2 = document.createElement("article");
article2.innerHTML = `
<section class="loader-container">
<div class="loader"></div>
</section>
`;

function fetchData() {
  characterPreloader();
  fetch(`${base_url}/people/?page=${counter}`)
    .then((response) => {
      hideCharacterPreloader()
      return response.json();
    })
    .then((response) => {
      console.log(response);
      let characterArray = response.results;
      for (let character of characterArray) {
       createNames(character);
      }
    })
    .catch((error) => {
      console.error("error", error);
    });
}

fetchData();

function createNames(character) {
  let newLi = document.createElement("li");
  newLi.innerHTML = character.name;
  aside.append(newLi);

  newLi.addEventListener("click", () => {
    characterInfo.innerHTML = "";
    detailPreloader();
    createDetails(character);
  });
}

function createDetails(characterDetails) {
  currentCharcter = characterDetails

  peopleDetails.innerHTML = `
  <section class="details-container">
  <h3>${characterDetails.name}</h3>
  <p>Height: ${characterDetails.height}</p> 
  <p>Mass: ${characterDetails.mass}</p>
  <p>Hair color: ${characterDetails.hair_color}</p>
  <p>Skion color: ${characterDetails.skin_color}</p>
  <p>Eye color: ${characterDetails.eye_color}</p>
  <p>Birth year: ${characterDetails.birth_year}</p>
  <p>Gender: ${characterDetails.gender}</p>
  </section>
  `;
  return peopleDetails;
}

function createPlanet(object){
  console.log(object)
  let homeworld_url = object.homeworld;

  fetch(homeworld_url)
    .then((response) => response.json())
    .then((data) => {
      characterInfo.innerHTML = `
    <h3>${data.name}</h3>
    <p>rotation period: ${data.rotation_period}</p>
    <p>orbital period: ${data.orbital_period}</p>
    <p>diameter: ${data.diameter}</p>
    <p>climate: ${data.climate}</p>
    <p>gravity: ${data.gravity}</p>
    <p>terrain: ${data.terrain}</p>
    `;
      return characterInfo;
    });
}

function createSpecies(object){
  let specie = object.species;

  fetch(specie)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      characterInfo.innerHTML = `
    <h3>${data.name}</h3>
    <p>Average height: ${data.average_height}</p>
    <p>Average lifespan: ${data.average_lifespan}</p>
    <p>classificatio: ${data.classificatio}</p>
    <p>Created: ${data.created}</p>
    <p>Designation: ${data.designation}</p>
    <p>Language: ${data.language}</p>
    `;
      return characterInfo;
    })
    .catch((error) => {
      console.log("feeeel")
      characterInfo.innerHTML = `<p>No info</p>`
    })
  if (specie.length > 0) {
    characterInfo.style.overflow = "scroll";
  } else {
    characterInfo.style.overflow = "hidden";
  }
}

function vehicles_url_generator(object) {
  let vehiclesArray = [];
  let vehicle_url = object.vehicles;

  for (let i = 0; i < vehicle_url.length; i++) {
    vehiclesArray.push(vehicle_url[i]);
  }
  if (vehiclesArray.length > 0) {
    if (vehiclesArray.length >= 1) {
      characterInfo.style.overflow = "scroll";
    }
    createVehicles(vehiclesArray);
  }
  else {
    characterInfo.style.overflow = "hidden";
    characterInfo.innerHTML = `<p>No info</p>`;
  }
}

function createVehicles(vehiclesArray) {
  for (let i = 0; i < vehiclesArray.length; i++) {
      fetch(vehiclesArray[i])
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          characterInfo.innerHTML +=
            ` <h3>${data.name}</h3>
    <p>Model: ${data.model}</p>
    <p>Cost in credits: ${data.cost_in_credits}</p>
    <p>Length: ${data.length}</p>
    <p>Crew: ${data.crew}</p>
    <p>Vehicle_class: ${data.vehicle_class}</p>
    <p>Consumables: ${data.consumables}</p>
    <span class="starships-span"></span>`
            ;
        });
  }
}

function starships_url_generator(object) {
  let starshipsArray = [];
  let starships_url = object.starships;
  for (let i = 0; i < starships_url.length; i++) {
    starshipsArray.push(starships_url[i]);
    console.log(starshipsArray);
  }
  if (starshipsArray.length > 0) {
    if (starshipsArray.length >= 1) {
      characterInfo.style.overflow = "scroll";
    }
    createStarships(starshipsArray);
  }
  else {
    characterInfo.style.overflow = "hidden";
    characterInfo.innerHTML = `<p>No info</p>`;
  }
}

function createStarships(starshipsArray) {
  for (let i = 0; i < starshipsArray.length; i++) {
    fetch(starshipsArray[i])
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        characterInfo.innerHTML +=
          ` <h3>${data.name}</h3>
      <p>MGLT: ${data.MGLT}</p>
      <p>Cargo capacity: ${data.cargo_capacity}</p>
      <p>Consumables: ${data.consumables}</p>
      <p>Cost in credits: ${data.cost_in_credits}</p>
      <p>Created: ${data.created}</p>
      <p>Crew: ${data.crew}</p>
      <span class="starships-span"></span>`
          ;
      })
  }
}

leftBtn.addEventListener("click", () => {
  if (counter > 1) {
    aside.innerHTML = "";
    counter--;
    numberPage.innerText = counter;
    fetchData();
    console.log(fetchData);
  }
});

rightBtn.addEventListener("click", () => {
  if (counter < 8) {
    aside.innerHTML = "";
    counter++;
    numberPage.innerText = counter;
    fetchData();
    console.log(fetchData);
  }
});

function characterPreloader() {
  aside.append(newArticle);
}

function detailPreloader() {
  peopleDetails.append(article2);
  characterInfo.append(article2);
}

function hideCharacterPreloader() {
  newArticle.innerHTML = "";
}

planetBtn.addEventListener('click', () => {
  createPlanet(currentCharcter)
})

speciesBtn.addEventListener('click', () => {
  createSpecies(currentCharcter)
})

vehicleBtn.addEventListener('click', () => {
  characterInfo.innerHTML = "";
  vehicles_url_generator(currentCharcter)
})

starshipsBtn.addEventListener('click', () => {
  characterInfo.innerHTML = "";
  starships_url_generator(currentCharcter)
})