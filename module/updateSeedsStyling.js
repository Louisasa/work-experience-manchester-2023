export function setnumberofseeds(numberOfSeedsInHouse, houseNumber, playerNumber) {
    // if number of number of seeds in house is zero
    if (numberOfSeedsInHouse === 0){
        // hide all seeds in the house
        for (let i = 1; i < 13; i++) {
            // show the seed number i
            hideSeed(i, houseNumber, playerNumber);
          }
        
        }   
    for (let i = 1; i < numberOfSeedsInHouse+1; i++) {
            // show the seed number i
            showSeed(i, houseNumber, playerNumber);
          }
    

    // for the number of counters, go down the list of seed elements and show every counter up to the number of counters
    
    }

function showSeed(seedNumber, houseNumber, playerNumber) {
    var seed = document.getElementsByClassName(`p${playerNumber}h${houseNumber}c${seedNumber}`)[0];
    //console.log(seed);
    console.log(seedNumber);
    console.log(houseNumber);
    console.log(playerNumber);
    seed.classList.remove('hide');
    seed.classList.add('show');
}   
function hideSeed(seedNumber, houseNumber, playerNumber) {
    var seed = document.getElementsByClassName(`p${playerNumber}h${houseNumber}c${seedNumber}`)[0];
    //console.log(hideseed);
    console.log(seedNumber);
    console.log(houseNumber);
    console.log(playerNumber);
    seed.classList.remove('show');
    seed.classList.add('hide');}
