let counter = 1;
let aside = document.querySelector("aside");
let peopleDetails = document.querySelector(".people-details");
let planetDetails = document.querySelector(".people-planet");
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

const base_url = "https://swapi.dev/api";


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
    detailPreloader();
    createDetails(character);
    createPlanet(character);
  });
}

function createPlanet(planet) {
  let homeworld_url = planet.homeworld;

  fetch(homeworld_url)
    .then((response) => response.json())
    .then((data) => {
      planetDetails.innerHTML = `
    <h3>${data.name}</h3>
    <p>rotation period: ${data.rotation_period}</p>
    <p>orbital period: ${data.orbital_period}</p>
    <p>diameter: ${data.diameter}</p>
    <p>climate: ${data.climate}</p>
    <p>gravity: ${data.gravity}</p>
    <p>terrain: ${data.terrain}</p>
    `;
      return planetDetails;
    });
}

function createDetails(characterDetails) {
  // hideDetailsPreloader()
  
  peopleDetails.innerHTML = `
  <h3>${characterDetails.name}</h3>
  <p>height: ${characterDetails.height}</p> 
  <p>mass: ${characterDetails.mass}</p>
  <p>hair color: ${characterDetails.hair_color}</p>
  <p>skion color: ${characterDetails.skin_color}</p>
  <p>eye color: ${characterDetails.eye_color}</p>
  <p>birth year: ${characterDetails.birth_year}</p>
  <p>gender: ${characterDetails.gender}</p>
  `;
  return peopleDetails;
}

let leftBtn = document.querySelector(".left-icon");
let rightBtn = document.querySelector(".right-icon");
let numberPage = document.querySelector(".page-number");

leftBtn.addEventListener("click", () => {
  aside.innerHTML = "";
  if (counter > 1) {
    counter--;
    numberPage.innerText = counter;
    fetchData();
    console.log(fetchData);
  }
});
rightBtn.addEventListener("click", () => {
  aside.innerHTML = "";
  if (counter < 8) {
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
  planetDetails.append(article2);
}

function hideCharacterPreloader(){
  newArticle.innerHTML = "";

}
// function hideDetailsPreloader() {
//   article2.innerHTML = "";
// }




