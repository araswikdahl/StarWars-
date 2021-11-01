//Fetcha api:t

function fetchData() {
  // let people_url = "https://swapi.dev/api/people/";
  fetch("https://swapi.dev/api/people/")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      console.log(response.results);
      let characterArray = response.results;
      for (let character of characterArray) {
        console.log(character.name);
        createNames(character.name);
      }
    })
    .catch((error) => {
      console.error("error", error);
    });
}
fetchData();

function fetchDetails() {
  fetch("https://swapi.dev/api/people/")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      let details = response.results;
      for(let characterDetails of details){
        console.log(characterDetails.name)
        createDeatails(characterDetails)
      }
    });
}
fetchDetails()

function createDeatails(characterDetails){
  let peopleDetails =  document.querySelector(".people-details")
  peopleDetails.innerHTML = `
  <h3>${characterDetails.name} </h3>
  <p>${characterDetails.height}</p>
  <p>${characterDetails.mass}</p>
  <p>${characterDetails.hair_color}</p>
  <p>${characterDetails.skin_color}</p>
  <p>${characterDetails.eye_color}</p>
  <p>${characterDetails.birth_year}</p>
  <p>${characterDetails.gender}</p>
  `
  // return peopleDetails

}

function createNames(caharacterName) {
  let aside = document.querySelector("aside");
  let newSection = document.createElement("section");
  newSection.innerHTML = caharacterName;
  aside.append(newSection);


  //lägger till event på p taggarna
  newSection.addEventListener("click", () => {
    newSection.classList.add("active-character");
  });
  // return newP;
}

// //page-nav
// let leftIcon = document.querySelector(".left-icon");
// let rightIcon = document.querySelector(".right-icon");
// let pageNumber = document.querySelector(".page-number");
// //ska det vara en counter eller (array) respeonse.length    on click så ska response.next ladda nya karakäter????????
// let pageCounter = 1;

// rightIcon.addEventListener("click", () => {
//   if (pageCounter < 8) {
//     pageCounter++;
//     pageNumber.innerText = pageCounter;
//   }
// });

// leftIcon.addEventListener("click", () => {
//   if (pageCounter > 0) {
//     pageCounter--;
//     pageNumber.innerText = pageCounter;
//   }
// });

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
