export var versionName = "Kalah";
var Opposite_Map = [6,5,4,3,2,1];

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
        if (houseIndex == 7 && playerNumberToUpdate == playerNumber){
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
            var seedsMoved = document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML;
            document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML = parseInt(seedsMoved)+1;
        }
        else{
           index=index-1;
        }
        houseIndex++;
    }

    if (houseIndex-1 == 7) {
        return false;
    }
    else {
        var last_house_sown = houseIndex - 1 ;
        var current_side = playerNumberToUpdate;
        var current_player = playerNumber;
        kalah_capture(last_house_sown,current_side,current_player)
        return true;
    }

}

function kalah_capture(last_house,side,player){
    var currentSeedCount = parseInt((document.getElementsByClassName(`player-${side}-house-${last_house} seeds`)[0].innerHTML));

    if ((currentSeedCount == 1) && (side == player)){

        opponent_house = Opposite_Map[last_house-1];

        captureCount = parseInt(document.getElementsByClassName(`${opponent_house}-house-${last_house} seeds`)[0].innerHTML);
        
        currentScore = parseInt(document.getElementsByClassName(`player-${player}-score`)[0].innerHTML);
        
        document.getElementsByClassName(`player-${player}-score`)[0].innerHTML = (currentScore + captureCount);
    }
}
