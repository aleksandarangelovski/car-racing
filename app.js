// My Screen Resolution : 1366 x 768

$(function () {
  //write your code here
  function randomCarSpeed(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function loadPreviousGames() {
    let carsArrayString = localStorage.getItem("ArrayOfRace");

    let carsArray = JSON.parse(carsArrayString);

    if (carsArray) {
      carsArray.forEach((car) => {
        let prevGames = document.querySelector(".prevGames");
        let carPara = document.createElement("p");
        carPara.classList.add("border", "text-center", "text-secondary", "p-2");
        let color = "";
        if (car.place === "first") {
          color = "text-white";
        } else {
          color = "text-danger";
        }

        carPara.innerHTML = `<span class="font-weight-bold ${color}">${car.car}</span> finished in <span class="font-weight-bold ${color}">${car.place}</span> place , with a time of <span class="font-weight-bold ${color}">${car.speed}</span> milliseconds!`;

        prevGames.append(carPara);
      });
    }
  }

  loadPreviousGames();

  function startRace() {
    let firstCarSpeed = randomCarSpeed(300, 1200);
    let secondCarSpeed = randomCarSpeed(300, 1200);

    $(".car1").animate(
      {
        marginLeft: "1045px",
      },
      firstCarSpeed,
      function () {
        if (firstCarSpeed < secondCarSpeed) {
          $(".firstCarResult")
            .append("p")
            .addClass("border text-center text-secondary p-2")
            .html(
              `Finished in: <span class="text-white font-weight-bold">first</span> place with a time <br /> of: <span class="text-white font-weight-bold">${firstCarSpeed}</span> milliseconds`
            );

          $("#ff").removeClass("hide-finish-flag");
          $("#rt").addClass("darken-raceTrack");

          // debugger;

          let winner1 = {
            car: "Car1",
            speed: firstCarSpeed,
            place: "first",
          };

          let loser1 = {
            car: "Car2",
            speed: secondCarSpeed,
            place: "second",
          };

          saveRaceToLocalStorage(winner1);
          saveRaceToLocalStorage(loser1);
        } else if (firstCarSpeed > secondCarSpeed) {
          $(".firstCarResult")
            .append("p")
            .addClass("border text-center text-secondary p-2")
            .html(
              `Finished in: <span class="text-white font-weight-bold">second</span> place with a time <br /> of: <span class="text-white font-weight-bold">${firstCarSpeed}</span> milliseconds`
            );

          $(".btnRestart").attr("disabled", false);
        }
      }
    );
    $(".car2").animate(
      {
        marginLeft: "1045px",
      },
      secondCarSpeed,
      function () {
        if (secondCarSpeed < firstCarSpeed) {
          $(".secondCarResult")
            .append("p")
            .addClass("border text-center text-secondary p-2")
            .html(
              `Finished in: <span class="text-danger font-weight-bold">first</span> place with a time <br /> of: <span class="text-danger font-weight-bold">${secondCarSpeed}</span> milliseconds`
            );

          $("#ff").removeClass("hide-finish-flag");
          $("#rt").addClass("darken-raceTrack");

          let winner2 = {
            car: "Car2",
            speed: secondCarSpeed,
            place: "first",
          };

          let loser2 = {
            car: "Car1",
            speed: firstCarSpeed,
            place: "second",
          };

          saveRaceToLocalStorage(winner2);
          saveRaceToLocalStorage(loser2);
        } else if (secondCarSpeed > firstCarSpeed) {
          $(".secondCarResult")
            .append("p")
            .addClass("border text-center text-secondary p-2")
            .html(
              `Finished in: <span class="text-danger font-weight-bold">second</span> place with a time <br /> of: <span class="text-danger font-weight-bold">${secondCarSpeed}</span> milliseconds`
            );

          $(".btnRestart").attr("disabled", false);
        }
      }
    );
  }

  function saveRaceToLocalStorage(winner) {
    let winnerArrayString = localStorage.getItem("ArrayOfRace");

    let winnerArray = JSON.parse(winnerArrayString);

    if (!winnerArray) {
      winnerArray = [];
    }

    winnerArray.push(winner);

    localStorage.setItem("ArrayOfRace", JSON.stringify(winnerArray));
  }

  let counter = 2;

  function countdown(interval) {
    $(".countdown h1").text(counter);

    counter--;

    if (counter === -1) {
      clearInterval(interval);
      $(".countdown h1").text("");

      startRace();
    }
  }

  $(".btnRace").on("click", function () {
    $("#rt").addClass("darken-raceTrack");

    $(".btnRace").attr("disabled", true);
    $(".btnRestart").attr("disabled", true);

    $(".countdown h1").text(counter + 1);

    let myInt = setInterval(function () {
      countdown(myInt);
    }, 1000);

    setTimeout(function () {
      $("#rt").removeClass("darken-raceTrack");
    }, 3000);
  });

  $(".btnRestart").on("click", function () {
    $(".car1").css("margin-left", "0px");
    $(".car2").css("margin-left", "0px");
    $("#ff").addClass("hide-finish-flag");
    $("#rt").removeClass("darken-raceTrack");
    $(".btnRace").attr("disabled", false);
    counter = 2;
  });
});
