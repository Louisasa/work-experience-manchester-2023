import { setnumberofseeds } from "./updateSeedsStyling.js";

export var versionName = "Oware";

export function makeAMove(playerNumber, houseNumber) {
    // Figure out how many seeds are in the house
    var numberOfSeeds = document.getElementsByClassName(`player-${playerNumber}-house-${houseNumber} seeds`)[0].innerHTML;

    // Empty this house
    var amountleft = 0;
    document.getElementsByClassName(`player-${playerNumber}-house-${houseNumber} seeds`)[0].innerHTML = amountleft;
    setnumberofseeds(0,houseNumber, playerNumber);

    var houseIndex = houseNumber+1;
    var playerNumberToUpdate = playerNumber;

    // Add seeds anti-clockwise
    for(var index = 0; index < numberOfSeeds; index++ ) {
        if (houseIndex > 6) {
            houseIndex = 1;
            if (playerNumberToUpdate===1){
                playerNumberToUpdate = 2;

            } else{
                playerNumberToUpdate = 1;
            } 
        }
        if (document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML < 12){
            var seedsMoved = parseInt(document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML);
            document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML = seedsMoved+1;
            setnumberofseeds(seedsMoved+1, houseIndex, playerNumberToUpdate);
        }
        else{
            index=index-1;
        }
        houseIndex++;
    }
    if (playerNumberToUpdate != playerNumber) {
        capture_till(houseIndex-1, playerNumberToUpdate, playerNumber);
    }
}

function capture(numberOfSeeds, player){
    var currentScore = parseInt(document.getElementsByClassName(`player-${player}-score`)[0].innerHTML);
    document.getElementsByClassName(`player-${player}-score`)[0].innerHTML = currentScore+numberOfSeeds;
}

function capture_till(StartHouse, playerNumberToUpdate, player){
    var CurrentHouse = StartHouse;
    var CurrentHouse_Seed_Count = parseInt(document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${CurrentHouse} seeds`)[0].innerHTML);
    while ((CurrentHouse_Seed_Count === 2 || CurrentHouse_Seed_Count === 3) && CurrentHouse > 0){
        document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${CurrentHouse} seeds`)[0].innerHTML = 0;
        setnumberofseeds(0, CurrentHouse, playerNumberToUpdate);
        // capture the seeds
        capture(CurrentHouse_Seed_Count,player);
        // change current house to the previous house in order of sowing seeds
        CurrentHouse--;
        if (CurrentHouse > 0) {
            CurrentHouse_Seed_Count = parseInt(document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${CurrentHouse} seeds`)[0].innerHTML);
        }
    }

    return true;
}
