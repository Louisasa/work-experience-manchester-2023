import { setnumberofseeds } from "./updateSeedsStyling.js";

export var versionName = "Kalah";
var Opposite_Map = [6,5,4,3,2,1];

export function makeAMove(playerNumber, houseNumber) {
    // Figure out how many seeds are in the house
    var numberOfSeeds = document.getElementsByClassName(`player-${playerNumber}-house-${houseNumber} seeds`)[0].innerHTML;

    // Empty this house
    var amountleft = 0;
    document.getElementsByClassName(`player-${playerNumber}-house-${houseNumber} seeds`)[0].innerHTML = amountleft;
    setnumberofseeds(0, houseNumber, playerNumber);

    var houseIndex = houseNumber+1;
    var playerNumberToUpdate = playerNumber;

    // Add seeds anti-clockwise
    for(var index = 0; index < numberOfSeeds; index++ ) {
        if (houseIndex === 7 && playerNumberToUpdate === playerNumber){
            document.getElementsByClassName(`player-${playerNumber}-score`)[0].innerHTML = parseInt(document.getElementsByClassName(`player-${playerNumber}-score`)[0].innerHTML) + 1;
            houseIndex++;
            continue;
        }
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

    if (houseIndex-1 === 7) {
        return false;
    }
    else {
        var last_house_sown = houseIndex - 1 ;
        if (playerNumberToUpdate === playerNumber) {
            kalah_capture(last_house_sown, playerNumber)
        }
        return true;
    }

}

function kalah_capture(last_house, player){
    var opponent_house = Opposite_Map[last_house-1];
    var oppositePlayer = player === 1 ? 2 : 1;

    var oppositePlayerSeeds = parseInt(document.getElementsByClassName(`player-${oppositePlayer}-house-${opponent_house} seeds`)[0].innerHTML);
    var currentPlayerSeeds = parseInt(document.getElementsByClassName(`player-${player}-house-${last_house} seeds`)[0].innerHTML);

    if (currentPlayerSeeds === 1 && oppositePlayerSeeds > 0){
        document.getElementsByClassName(`player-${oppositePlayer}-house-${opponent_house} seeds`)[0].innerHTML = 0;
        document.getElementsByClassName(`player-${player}-house-${last_house} seeds`)[0].innerHTML = 0;

        setnumberofseeds(0, last_house, player);
        setnumberofseeds(0, opponent_house, oppositePlayer);
        
        var currentScore = parseInt(document.getElementsByClassName(`player-${player}-score`)[0].innerHTML);
        
        document.getElementsByClassName(`player-${player}-score`)[0].innerHTML = (currentScore + oppositePlayerSeeds + currentPlayerSeeds);
    }
}
