var version = "Oware";
var HasGameStarted = false; 
var GameStateButtonText = 'Start Game';
var initialHouseNumber = "4";
var initialScoreNumber = "0";
var turnPlayerOne = true;

document.getElementsByClassName("mancala-game-type")[0].innerHTML = version;
document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;

function startGame() {
    if (HasGameStarted){
        HasGameStarted = false;
        GameStateButtonText = "Restart Game";
    } else {
        HasGameStarted = true;
        GameStateButtonText = "Start Game";
    }
    document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
    setupGame();
    PlayerTurn();
} 

function setupGame() {
    document.getElementsByClassName("player-1-house-1 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-1-house-2 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-1-house-3 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-1-house-4 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-1-house-5 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-1-house-6 seeds")[0].innerHTML = initialHouseNumber;

    document.getElementsByClassName("player-2-house-1 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-2-house-2 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-2-house-3 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-2-house-4 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-2-house-5 seeds")[0].innerHTML = initialHouseNumber;
    document.getElementsByClassName("player-2-house-6 seeds")[0].innerHTML = initialHouseNumber;
    
    document.getElementsByClassName("player-1 score")[0].innerHTML = initialScoreNumber;
    document.getElementsByClassName("player-2 score")[0].innerHTML = initialScoreNumber;
}

function PlayerTurn() {
    if (turnPlayerOne) {
        document.getElementsByClassName("main-game")[0].innerHTML ="It's Player 1's Turn!"
        turnPlayerOne =false;
    }
    else {
        document.getElementsByClassName("main-game")[0].innerHTML ="It's Player 2's Turn!"
        turnPlayerOne =true;
    }
}

function makeAMove(playerNumber, houseNumber) {
    // Figure out how many seeds are in the house
    var numberOfSeeds = document.getElementsByClassName(`player-${playerNumber}-house-${houseNumber} seeds`)[0].innerHTML;

    // Empty this house
    var amountleft = 0;
    document.getElementsByClassName(`player-${playerNumber}-house-${houseNumber} seeds`)[0].innerHTML = amountleft

    var houseIndex = houseNumber+1;
    var playerNumberToUpdate = playerNumber;

    // Add seeds clockwise
    for(var index = 0; index < numberOfSeeds; index++ ) {
        if (houseIndex > 6) {
            houseIndex = 1;
            if (playerNumberToUpdate===1){
                playerNumberToUpdate=2

            } else{
                playerNumberToUpdate =1
            } 
        }
        var seedsMoved=document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML;
        document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML = parseInt(seedsMoved)+1;
        houseIndex++;
    }
    PlayerTurn();
}
