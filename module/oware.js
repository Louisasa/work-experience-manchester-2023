export var versionName = "Oware";

export function makeAMove(playerNumber, houseNumber) {
    // Figure out how many seeds are in the house
    var numberOfSeeds = document.getElementsByClassName(`player-${playerNumber}-house-${houseNumber} seeds`)[0].innerHTML;

    // Empty this house
    var amountleft = 0;
    document.getElementsByClassName(`player-${playerNumber}-house-${houseNumber} seeds`)[0].innerHTML = amountleft

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
         var seedsMoved = document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML;
         document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML = parseInt(seedsMoved)+1;
        }
        else{
            index=index-1
        }
         houseIndex++;
    }
    capture_till(houseIndex-1, playerNumberToUpdate);
}

function capture(numberOfSeeds, player){
    var currentScore = parseInt(document.getElementsByClassName(`player-${player}-score`)[0].innerHTML);
    document.getElementsByClassName(`player-${player}-score`)[0].innerHTML = currentScore+numberOfSeeds;
}

function capture_till(StartHouse, player){
    var CurrentHouse = StartHouse;
    var CurrentHouse_Seed_Count = parseInt(document.getElementsByClassName(`player-${player}-house-${CurrentHouse} seeds`)[0].innerHTML);
    while ((CurrentHouse_Seed_Count == 2 || CurrentHouse_Seed_Count == 3) && CurrentHouse > 0){
        document.getElementsByClassName(`player-${player}-house-${CurrentHouse} seeds`)[0].innerHTML = 0;
        // capture the seeds
        capture(CurrentHouse_Seed_Count,player);
        // change current house to the previous house in order of sowing seeds
        CurrentHouse-= 1;
        CurrentHouse_Seed_Count = parseInt(document.getElementsByClassName(`player-${player}-house-${CurrentHouse} seeds`)[0].innerHTML);
    }

    return true;
}
