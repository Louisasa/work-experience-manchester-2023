import { makeAMove as OwareMakeAMove, versionName as OwareVersionName } from "./module/oware.js";

var version = OwareVersionName;
var HasGameStarted = false; 
var GameStateButtonText = 'Start Game';
var initialHouseNumber = "4";
var initialScoreNumber = "0";
var playersTurn = 1;
var winnerText = "Winner!";
var invalidTurnText = "Invalid Turn! Try a different house.";
var pickAHouseText = "Pick a house:";
var AIButton = 'Play against AI';
var BoolAI = false; 

document.getElementsByClassName("mancala-game-type")[0].innerHTML = version;
document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
document.getElementsByClassName("game-state")[0].onclick = startGame;

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

    
    document.getElementById("p1h1").onclick=function() {onHouseClick(1, 1)};
    document.getElementById("p1h2").onclick=function() {onHouseClick(1, 2)};
    document.getElementById("p1h3").onclick=function() {onHouseClick(1, 3)};
    document.getElementById("p1h4").onclick=function() {onHouseClick(1, 4)};
    document.getElementById("p1h5").onclick=function() {onHouseClick(1, 5)};
    document.getElementById("p1h6").onclick=function() {onHouseClick(1, 6)};
    document.getElementById("p2h1").onclick=function() {onHouseClick(2, 1)};
    document.getElementById("p2h2").onclick=function() {onHouseClick(2, 2)};
    document.getElementById("p2h3").onclick=function() {onHouseClick(2, 3)};
    document.getElementById("p2h4").onclick=function() {onHouseClick(2, 4)};
    document.getElementById("p2h5").onclick=function() {onHouseClick(2, 5)};
    document.getElementById("p2h6").onclick=function() {onHouseClick(2, 6)};
    document.getElementsByClassName("messages")[0].innerHTML = pickAHouseText;
    
    document.getElementsByClassName("main-game")[0].innerHTML ="It's Player 1's Turn!";
}

function showWinner() {
    document.getElementsByClassName("winner")[0].innerHTML = winnerText;
}

function onHouseClick(player, playersHouseClicked) {
    var seedCheck = parseInt(document.getElementsByClassName(`player-${player}-house-${playersHouseClicked} seeds`)[0].innerHTML);
    if (playersTurn == player && seedCheck > 0) {
        makeAMove(player, playersHouseClicked);
        document.getElementsByClassName("messages")[0].innerHTML = pickAHouseText;
    }
    else {
        document.getElementsByClassName("messages")[0].innerHTML = invalidTurnText;
    }
    checkForEndgame();
}

function changePlayer() {
    if (playersTurn == 1) {
        document.getElementsByClassName("main-game")[0].innerHTML ="It's Player 1's Turn!";
        playersTurn = 2;
    }
    else {
        document.getElementsByClassName("main-game")[0].innerHTML ="It's Player 2's Turn!";
        playersTurn = 1;
    }
}

function makeAMove(playerNumber, houseNumber) {
    OwareMakeAMove(playerNumber, houseNumber);
    PlayerTurn();
}

function checkForEndgame() {
    var p1score = parseInt(document.getElementsByClassName('player-1 score')[0].innerHTML);
    var p2score = parseInt(document.getElementsByClassName('player-2 score')[0].innerHTML);
    if (p1score > 24 || p2score > 24 || (p1score ===24 && p2score ===24)) {
        HasGameStarted = false;
        GameStateButtonText = "Restart game";
        document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
        document.getElementsByClassName("messages")[0].innerHTML = "";
        document.getElementsByClassName("main-game")[0].innerHTML = "";
        showWinner();
    }
}

function capture(numberOfSeeds, player){
    var currentScore = parseInt(document.getElementsByClassName(`player-${player} score`)[0].innerHTML);
    document.getElementsByClassName(`player-${player} score`)[0].innerHTML = currentScore+numberOfSeeds;
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
}

document.getElementsByClassName("Play_AI")[0].innerHTML = AIButton

function Play_AI(){
    if ((BoolAI == False) && (HasGameStarted == False)){
        AIButton = 'Play against AI'
    }
    if (HasGameStarted){
        // Hide AI Button
        document.getElementsByClassName("Play_AI")[0].setAttribute("style", "display: none");
    }
    if (BoolAI){
        // Hide AI Button
        setupGame();
        playersTurn();
    }
    document.getElementsByClassName("Play_AI")[0].innerHTML = AIButton

}
