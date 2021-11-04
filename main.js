let counter = 1;
let aside = document.querySelector("aside");
let peopleDetails = document.querySelector(".people-details");
let planetDetails = document.querySelector(".people-planet");
let preloader = document.querySelector(".loader-container")

const base_url = "https://swapi.dev/api";

function fetchData() {
  //hämta data
   characterPreloader()
  fetch(`${base_url}/people/?page=${counter}`)
    .then((response) => {
      //gör till js object
      return response.json();
    })
    .then((response) => {
    hidePreloader()
      console.log(response);

      // skapa en variabel och sätt resultatet i den
      let characterArray = response.results;

      //loopa igenom resultatet

      for (let character of characterArray) {
        console.log(character.name);
        //för varje loop -> anropa på en funktion som sätter namnet i boxen.
        // createNames(character.name);
        createNames(character);
      }
    })
    .catch((error) => {
      console.error("error", error);
    });
}

fetchData();

//funcktionen som ska sätta namnet i boxen. parametern är character.name, text luuk.
function createNames(character) {
  //skapa i aside

  //för varje loop så ska det skapas ett element
  let newLi = document.createElement("li");
  //som vi ger ett namn

  newLi.innerHTML = character.name;

  aside.append(newLi);

  newLi.addEventListener("click", () => {
    console.log(character);
    detailPreloader()
    // function fetchDetails() {
    //   //hämta data
    //   fetch("https://swapi.dev/api/people/")
    //     .then((response) => {
    //       //gör till js object
    //       return response.json();
    //     })
    //     .then((response) => {
    //       // skapa en variabel och sätt resultatet i den
    //       let details = response.results;
    //       //loopa igenom resultatet
    //       for (let characterDetails of details) {
    //         console.log(characterDetails.name);
    //         //för varje loop -> anropa på en funktion som sätter namnet i boxen.
    createDetails(character);
    //       }
    //     });
    // }
    // fetchDetails();

    function createDetails(characterDetails) {
      // let peopleDetails = document.querySelector(".people-details");
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

    // function fetchPlanet() {
    //   fetch("https://swapi.dev/api/people/")
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);

    //       let characterArray = data.results;
    //       for (character of characterArray) {
    //         let planetUrl = character.homeworld;
    //         fetch(planetUrl)
    //           .then((response) => response.json())
    //           .then((data) => {
    //             // skapa en variabel och sätt resultatet i den
    //             createPlanet(data);
    //             console.log(data);
    //           });
    //       }
    //     });
    // }

    //fetchPlanet();
    createPlanet(character);

    function createPlanet(planet) {
      let homeworld_url = planet.homeworld;
      // fetch(homeworld_url)
      //         .then((response) => response.json())
      //         .then((response) => {

      //           console.log(response)
      //           let homeworld = response}

      fetch(homeworld_url)
        .then((response) => response.json())
        .then((data) => {
          // let planetDetails = document.querySelector(".people-planet");
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
  });
}

let leftBtn = document.querySelector(".left-icon");
let rightBtn = document.querySelector(".right-icon");
let numberPage = document.querySelector(".page-number");

leftBtn.addEventListener("click", () => {
  aside.innerHTML = ""; //en if-sats som säger när denna får köras
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


function characterPreloader(){
aside.innerHTML = `
<section class="loader-container">
<div class="loader"></div>
</section>
`
}
function detailPreloader(){
  peopleDetails.innerHTML = `
  <section class="loader-container">
  <div class="loader"></div>
  </section>
  `
  planetDetails.innerHTML = `
  <section class="loader-container">
  <div class="loader"></div>
  </section>
  `
}



 

function hidePreloader(){
  aside.innerHTML = ""
  peopleDetails.innerHTML = ""
  planetDetails.innerHTML = ""
}


//ska man ha en gemensam funktion för sido-navigeringen ???????????????????

// rightIcon.addEventListener("click", pageNav)
// leftIcon.addEventListener("click", pageNav)

// function pageNav() {
//   if (rightIcon) {
//     if (pageCounter <= 8) {
//       pageCounter++;
//       pageNumber.innerText = pageCounter;
//     }
//   }
//   else if (leftIcon) {
//     if (pageCounter >= 0) {
//       pageCounter--;
//       pageNumber.innerText = pageCounter;
//     }
//   }
//   return pageCounter
// }
