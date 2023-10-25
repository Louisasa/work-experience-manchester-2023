export function setnumberofseeds(numberOfSeedsInHouse, houseNumber, playerNumber) {
    // if number of number of seeds in house is zero
    if (numberOfSeedsInHouse === 0) {
        seed.classList.add("hide")
        // hide all seeds in the house
    }

    // for the number of counters, go down the list of seed elements and show every counter up to the number of counters
    for (let i = 1; i < numberOfSeedsInHouse+1; i++) {
        // show the seed number i
        showSeed(i, houseNumber, playerNumber);
      }

}

function showSeed(seedNumber, houseNumber, playerNumber) {
    var seed = document.getElementsByClassName(`p${playerNumber}h${houseNumber}c${seedNumber}`)[0];
    seed.classList.remove("hide");
    seed.classList.add('show');
    console.log(seed);
}