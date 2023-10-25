import { makeAMove as OwareMakeAMove, versionName as OwareVersionName } from "./module/oware.js";
import { versionName as KalahVersionName } from "./module/kalah.js";

var version = OwareVersionName;
var GameStateButtonText = 'Start Game';
var initialHouseNumber = "4";
var initialScoreNumber = "0";
var playersTurn = 1;
var winnerText = "Winner!";
var invalidTurnText = "Invalid Turn! Try a different house.";
var pickAHouseText = "Pick a house:";
var isFirstGame = true;
var sec = 30;
var ChangeGo = false;
var TimeRanOut = false;
var Started = false;
var TimerIsOn = false;
var isAIPlayer = false;
var houselist = [1,2,3,4,5,6];

document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
document.getElementsByClassName("game-state")[0].onclick = startGame;

function startGame() {
    if (isFirstGame){
        isFirstGame = false;
        GameStateButtonText = "Restart Game";
        document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
    }
    setupGame();
    if (TimerIsOn) {
        timer();
    }
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
    
    document.getElementsByClassName("player-1-score")[0].innerHTML = initialScoreNumber;
    document.getElementsByClassName("player-2-score")[0].innerHTML = initialScoreNumber;

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
    document.getElementsByClassName("valid-turn-text")[0].innerHTML = pickAHouseText;
    
    document.getElementsByClassName("players-turn")[0].innerHTML ="It's Player 1's Turn!";
    playersTurn = 1;
}

function showWinner() {
    document.getElementsByClassName("winner")[0].innerHTML = winnerText;
}

function onHouseClick(player, playersHouseClicked) {
    var seedCheck = parseInt(document.getElementsByClassName(`player-${player}-house-${playersHouseClicked} seeds`)[0].innerHTML);
    if (playersTurn == player && seedCheck > 0) {
        makeAMove(player, playersHouseClicked);
        document.getElementsByClassName("valid-turn-text")[0].innerHTML = pickAHouseText;
    }
    else {
        document.getElementsByClassName("valid-turn-text")[0].innerHTML = invalidTurnText;
    }
    checkForEndgame();
}

function changePlayer() {
    if (playersTurn == 1) {
        if (TimeRanOut){
            document.getElementsByClassName("players-turn")[0].innerHTML ="Player 2 ran out of time! Next player!";
        }
        else{
            document.getElementsByClassName("players-turn")[0].innerHTML ="It's Player 1's Turn!";
        }
        if (Started && TimeRanOut==false){
            ChangeGo=true;
        }
        else{
            TimeRanOut=false
        }  
        playersTurn = 2;
        Started = true
    }
    else {
        if (TimeRanOut){
            document.getElementsByClassName("players-turn")[0].innerHTML ="Player 1 ran out of time! Next player!";
        }
        else{
            document.getElementsByClassName("players-turn")[0].innerHTML ="It's Player 2's Turn!";
        }
        if (TimeRanOut==false){
            ChangeGo=true;
        }
        else{
            TimeRanOut=false;
        }
        playersTurn = 1;
    }

}

function makeAMove(playerNumber, houseNumber) {
    OwareMakeAMove(playerNumber, houseNumber);
    changePlayer();
}

function checkForEndgame() {
    var p1score = parseInt(document.getElementsByClassName('player-1-score')[0].innerHTML);
    var p2score = parseInt(document.getElementsByClassName('player-2-score')[0].innerHTML);
    if (p1score > 24 || p2score > 24 || (p1score ===24 && p2score ===24)) {
        isFirstGame = false;
        GameStateButtonText = "New game";
        document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
        document.getElementsByClassName("valid-turn-text")[0].innerHTML = "";
        document.getElementsByClassName("players-turn")[0].innerHTML = "";
        showWinner();
    }
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
}

function TimeOut(){
    sec = 29;
    timer();
}
function timer(){
    document.getElementById('GameTimer').innerHTML='You have 00:'+sec;
    var timer = setInterval(function(){
        sec--;
        if (sec < 10){
            document.getElementById('GameTimer').innerHTML='You have 00:0'+sec;
        }
        else{
            document.getElementById('GameTimer').innerHTML='You have 00:'+sec;
        }
        if (sec < 0) {
            TimeRanOut=true;
            clearInterval(timer);
            changePlayer();
            TimeOut();
        }
        if (ChangeGo) {
            sec = 29
            ChangeGo = false;
            clearInterval(timer);
            TimeOut();
        }
    }, 1000);
}

document.getElementById("TimerSelect").onchange = function() {
    var TimerSelection = this.value;
    if (TimerSelection == "On"){
        TimerIsOn=true;
    }
    else if (TimerSelection == "Off"){
        TimerIsOn=false;
    }
}

document.getElementById("game-variant").onchange = function() {
    var variantChosen = this.value;
    if (variantChosen == "Kalah") {
        version = KalahVersionName;
    } else if (variantChosen == "Oware") {
        version = OwareVersionName;
    }
}

document.getElementById("PlayerType").onchange = function() {
    var variantChosen = this.value;
    if (variantChosen == "Player") {
        isAIPlayer = false;
    } else {
        isAIPlayer = true;
    }
}

function AImakeMove() {
    var houseChosen = houselist[Math.floor(Math.random() * houselist.length)];
    makeAMove(2,houseChosen);
}

function AImakeSmarterMove() {
    var maxHouseIndex = 0;
    var maxSeedNumber = 0;
    for(var index = 1; index < 7; index++) {
        var seedNumber = parseInt(document.getElementsByClassName(`player-2-house-${index} seeds`)[0].innerHTML);
        if (seedNumber > maxSeedNumber) {
            maxSeedNumber = seedNumber;
            maxHouseIndex = index;
        }
    }
    makeAMove(2, maxHouseIndex);
}
