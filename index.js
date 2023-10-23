var version = "Oware";
document.getElementsByClassName("mancala-game-type")[0].innerHTML = version;

var HasGameStarted = false; 
var GameStateButtonText = 'Start Game';
document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;

function startGame() {
    if (HasGameStarted){
        HasGameStarted = false;
    } else {
        HasGameStarted = true;
    }
} 


function updateGameStateButtonText() {
    if (HasGameStarted){
        GameStateButtonText = "Restart Game";
    } else {
        GameStateButtonText = "Start Game";
    }
    document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
}

function change_game_state(){
    startGame();
    updateGameStateButtonText();
}

document.getElementsByClassName("mancala-game-type")[0].innerHTML = version;

var turnPlayerOne =true;

var p1h6 = "4";
document.getElementsByClassName("player-1-house-6 seeds")[0].innerHTML = p1h6;

var p2h1 = "4";
document.getElementsByClassName("player-2-house-1 seeds")[0].innerHTML = p2h1;

var p1h5 = "4";
document.getElementsByClassName("player-1-house-5 seeds")[0].innerHTML = p1h5;

var p2h2 = "4";
document.getElementsByClassName("player-2-house-2 seeds")[0].innerHTML = p2h2;

var p1h4 = "4";
document.getElementsByClassName("player-1-house-4 seeds")[0].innerHTML = p1h4;

var p2h3 = "4";
document.getElementsByClassName("player-2-house-3 seeds")[0].innerHTML = p2h3;

var p1h3 = "4";
document.getElementsByClassName("player-1-house-3 seeds")[0].innerHTML = p1h3;

var p2h4 = "4";
document.getElementsByClassName("player-2-house-4 seeds")[0].innerHTML = p2h4;

var p1h2 = "4";
document.getElementsByClassName("player-1-house-2 seeds")[0].innerHTML = p1h2;

var p2h5 = "4";
document.getElementsByClassName("player-2-house-5 seeds")[0].innerHTML = p2h5;

var p1h1 = "4";
document.getElementsByClassName("player-1-house-1 seeds")[0].innerHTML = p1h1;

var p2h6 = "4";
document.getElementsByClassName("player-2-house-6 seeds")[0].innerHTML = p2h6;

var p1score = "0";
document.getElementsByClassName("player-1 score")[0].innerHTML = p1score;

var p2score = "0";
document.getElementsByClassName("player-2 score")[0].innerHTML = p2score;

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
PlayerTurn();
