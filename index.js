var version = "Oware";
document.getElementsByClassName("mancala-game-type")[0].innerHTML = version;
var turnPlayerOne =true;

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