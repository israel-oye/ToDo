document.addEventListener("DOMContentLoaded", (e) => {
  let countrySelectTag = document.getElementById("player-nat");
  fetch("https://restcountries.com/v3.1/all?fields=name,cca3")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let countries = data;

      countries.map((country) => {
        let opt = document.createElement("option");
        opt.innerHTML = country["name"]["common"];
        opt.value = country["cca3"];
        countrySelectTag.append(opt);
      });
    });
});

class Player {
  constructor(name, jerseyNumber, position, nationality) {
    this.name = name;
    this.jerseyNumber = jerseyNumber;
    this.position = position;
    this.nationality = nationality;
    this.playersFlag = this.getNationalityFlag();
  }

  async display() {
    let displayBox = document.getElementById("display-players");
    displayBox.innerHTML += `
        <div class="border rounded m-3 p-3">
            <i class="fa-solid fa-user" style="color: #5be411;"></i>
            <h6>
            <span class="fs-5">${this.jerseyNumber} </span>
            ${this.name}
            </h6>
            <span class="fs-6"> ${this.nationality} || <img src="${await this.playersFlag}" width="25" height="15" alt="${this.nationality}'s flag"> </span>
        </div>
    `;
  }

  async getNationalityFlag() {
    let nationFlag = await getFlagURL(this.nationality);
    return nationFlag;
  }
}

const savePlayer = () => {
  let playerName = document.getElementById("player-name").value;
  let playerNumber = document.getElementById("player-num").value;
  let playerPosition = document.getElementById("player-pos").value;
  let playerNationalityCode = document.getElementById("player-nat").value;

  fetch(`https://restcountries.com/v3.1/alpha/${playerNationalityCode}`)
    .then(
      (response) => {
        let data = response.json();
        data.then((countryDetails) => {
          let country = countryDetails[0];
          let playerNationality = country.name.common;

          let player = new Player(
            playerName,
            playerNumber,
            playerPosition,
            playerNationality
          );

          console.log(player);
          player.display();
        });
      }
    );

  document.getElementById("player-name").value = "";
  document.getElementById("player-num").value = "";
  document.getElementById("player-pos").selectedIndex = null;
  document.getElementById("player-nat").selectedIndex = null;
};

const getFlagURL = async (country) => {
  let flagLink = "";

  let response = await fetch(
    `https://restcountries.com/v3.1/name/${country}?fullText=true`
  );
  let data = await response.json();
  let countryDetail = data[0];
  flagLink = countryDetail["flags"]["png"];

  return flagLink;

  // fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     let countryDetail = data[0];
  //     return countryDetail["flags"]["png"];

  //   });
  // return flagLink;
};

// console.log(getFlagURL('America'));
