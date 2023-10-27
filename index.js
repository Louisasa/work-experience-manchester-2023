import { makeAMove as OwareMakeAMove, versionName as OwareVersionName } from "./module/oware.js";
import { makeAMove as KalahMakeAMove, versionName as KalahVersionName } from "./module/kalah.js";
import { setnumberofseeds } from "./module/updateSeedsStyling.js";
import confetti from "https://cdn.skypack.dev/canvas-confetti@1";

var version = OwareVersionName;
var GameStateButtonText = 'Start Game';
var initialHouseNumber = "4";
var initialScoreNumber = "0";
var playersTurn = 1;
var winnerText = "Winner!";
var invalidTurnText = "Invalid Turn! Try a different house.";
var pickAHouseText = "Pick a house:";
var isFirstGame = true;
var initialTimer = 10;
var sec = initialTimer;
var ChangeGo = false;
var TimeRanOut = false;
var Started = false;
var TimerIsOn = false;
var isAIPlayer = false;
var houselist = [1,2,3,4,5,6];
var timer = null;
var setupGame = setupInitialGame;

document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
document.getElementsByClassName("game-state")[0].onclick = startGame;

function startGame() {
    if (isFirstGame){
        isFirstGame = false;
        GameStateButtonText = "Restart Game";
        document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
    }
    setupGame();
    clearInterval(timer);
    if (TimerIsOn) {
        sec = initialTimer;
        startTimer();
    } else {
        document.getElementById('GameTimer').innerHTML = null;
    }
} 



function showWinner() {
    GameStateButtonText = "New Game";
    document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
    isFirstGame = false;
    if (document.getElementsByClassName(`player-2-score`)[0].innerHTML > document.getElementsByClassName(`player-1-score`)[0].innerHTML){
            winnerText="Player 2 Wins!";
    }
    else if (document.getElementsByClassName(`player-1-score`)[0].innerHTML > document.getElementsByClassName(`player-2-score`)[0].innerHTML){
        winnerText="Player 1 Wins!";
    }
    else{
        winnerText="Draw!";
    }
    document.getElementsByClassName("winner")[0].innerHTML = winnerText;
    confetti({
        particleCount: 500,
        spread: 400,
        origin: {
            x: 0.5,
            y: 0.5
        }
    });
}

function onHouseClick(player, playersHouseClicked) {
    var seedCheck = parseInt(document.getElementsByClassName(`player-${player}-house-${playersHouseClicked} seeds`)[0].innerHTML);
    if (playersTurn === player && seedCheck > 0) {
        makeAMove(player, playersHouseClicked);
        document.getElementsByClassName("valid-turn-text")[0].innerHTML = pickAHouseText;
    }
    else{
        document.getElementsByClassName("valid-turn-text")[0].innerHTML = invalidTurnText;
    }
    checkForNoMoves();
    checkForEndgame();
    
}

function changePlayer() {
    if (playersTurn === 1) {
        if (TimeRanOut){
            document.getElementsByClassName("players-turn")[0].innerHTML ="Player 1 ran out of time! Next player!";
        }
        else{
            document.getElementsByClassName("players-turn")[0].innerHTML ="It's Player 2's Turn!";
        }
        if (Started && TimeRanOut===false){
            ChangeGo=true;
        }
        else{
            TimeRanOut=false;
        }  
        playersTurn = 2;
        Started = true;
    }
    else {
        if (TimeRanOut){
            document.getElementsByClassName("players-turn")[0].innerHTML ="Player 2 ran out of time! Next player!";
        }
        else{
            document.getElementsByClassName("players-turn")[0].innerHTML ="It's Player 1's Turn!";
        }
        if (TimeRanOut===false){
            ChangeGo=true;
        }
        else{
            TimeRanOut=false;
        }
        playersTurn = 1;
    }
}

function makeAMove(playerNumber, houseNumber) {
    var toChangePlayer = true;
    if (version === OwareVersionName) {
        OwareMakeAMove(playerNumber, houseNumber);
    } else if (version === KalahVersionName) {
        toChangePlayer = KalahMakeAMove(playerNumber, houseNumber);
    }
    
    if(isAIPlayer) {
        var choice = Math.floor(Math.random() * 2);
        if (choice === 1) {
            AImakeMove();
        } else {
            AImakeSmarterMove();
        }
    } else if (toChangePlayer) {
        changePlayer();
    }

}

function checkForEndgame(){
    var p1score = parseInt(document.getElementsByClassName('player-1-score')[0].innerHTML);
    var p2score = parseInt(document.getElementsByClassName('player-2-score')[0].innerHTML);
    if (p1score > 24 || p2score > 24 || (p1score ===24 && p2score ===24)) {
        isFirstGame = false;
        GameStateButtonText = "Restart game";
        document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
        document.getElementsByClassName("valid-turn-text")[0].innerHTML = "";
        document.getElementsByClassName("players-turn")[0].innerHTML = "";
        document.getElementById("p1h1").onclick=null;
        document.getElementById("p1h2").onclick=null;
        document.getElementById("p1h3").onclick=null;
        document.getElementById("p1h4").onclick=null;
        document.getElementById("p1h5").onclick=null;
        document.getElementById("p1h6").onclick=null;
        document.getElementById("p2h1").onclick=null;
        document.getElementById("p2h2").onclick=null;
        document.getElementById("p2h3").onclick=null;
        document.getElementById("p2h4").onclick=null;
        document.getElementById("p2h5").onclick=null;
        document.getElementById("p2h6").onclick=null;
        document.getElementById('GameTimer').innerHTML=null;
        clearInterval(timer);
        showWinner();
    }
}

function checkForNoMoves(){
    if (parseInt(document.getElementsByClassName("player-1-house-1 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-1-house-2 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-1-house-3 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-1-house-4 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-1-house-5 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-1-house-6 seeds")[0].innerHTML) === 0){
        document.getElementsByClassName(`player-2-score`)[0].innerHTML = parseInt(document.getElementsByClassName(`player-2-score`)[0].innerHTML) 
        + parseInt(document.getElementsByClassName("player-2-house-1 seeds")[0].innerHTML) 
        + parseInt(document.getElementsByClassName("player-2-house-2 seeds")[0].innerHTML) 
        + parseInt(document.getElementsByClassName("player-2-house-3 seeds")[0].innerHTML)
        + parseInt(document.getElementsByClassName("player-2-house-4 seeds")[0].innerHTML)
        + parseInt(document.getElementsByClassName("player-2-house-5 seeds")[0].innerHTML)
        + parseInt(document.getElementsByClassName("player-2-house-6 seeds")[0].innerHTML);
    }
    else if(parseInt(document.getElementsByClassName("player-2-house-1 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-2-house-2 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-2-house-3 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-2-house-4 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-2-house-5 seeds")[0].innerHTML) === 0 
    && parseInt(document.getElementsByClassName("player-2-house-6 seeds")[0].innerHTML) === 0){
        document.getElementsByClassName(`player-1-score`)[0].innerHTML = parseInt(document.getElementsByClassName(`player-1-score`)[0].innerHTML) 
        + parseInt(document.getElementsByClassName("player-1-house-1 seeds")[0].innerHTML) 
        + parseInt(document.getElementsByClassName("player-1-house-2 seeds")[0].innerHTML) 
        + parseInt(document.getElementsByClassName("player-1-house-3 seeds")[0].innerHTML)
        + parseInt(document.getElementsByClassName("player-1-house-4 seeds")[0].innerHTML)
        + parseInt(document.getElementsByClassName("player-1-house-5 seeds")[0].innerHTML)
        + parseInt(document.getElementsByClassName("player-1-house-6 seeds")[0].innerHTML);
    }
}

function TimeOut(){
    sec = initialTimer-1;
    startTimer();
}
function startTimer(){
    if (sec < 10){
        document.getElementById('GameTimer').innerHTML='You have 00:0'+sec;
    }
    else{
        document.getElementById('GameTimer').innerHTML='You have 00:'+sec;
    }
    timer = setInterval(function(){
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
            sec = initialTimer-1;
            ChangeGo = false;
            clearInterval(timer);
            TimeOut();
        }
    }, 1000);
}

document.getElementById("TimerSelect").onchange = function() {
    var TimerSelection = this.value;
    if (TimerSelection === "On"){
        TimerIsOn=true;
    }
    else if (TimerSelection === "Off"){
        TimerIsOn=false;
    }
}

document.getElementById("game-variant").onchange = function() {
    var variantChosen = this.value;
    if (variantChosen === "Kalah") {
        version = KalahVersionName;
    } else if (variantChosen === "Oware") {
        version = OwareVersionName;
    }
}

document.getElementById("PlayerType").onchange = function() {
    var variantChosen = this.value;
    if (variantChosen === "Player") {
        isAIPlayer = false;
        var timerContainer = document.getElementsByClassName('timer-container')[0];
        timerContainer.classList.remove('hide');
        timerContainer.classList.add('show');
    } else {
        isAIPlayer = true;
        var timerContainer = document.getElementsByClassName('timer-container')[0];
        timerContainer.classList.remove('show');
        timerContainer.classList.add('hide');
        TimerIsOn=false;
    }
}

document.getElementById("gameState").onchange = function() {
    var variantChosen = this.value;
    if (variantChosen === "initalGameSetup") {
        setupGame = setupInitialGame;
    } else if (variantChosen === "setupCloseToPlayer1Winning") {
        setupGame = setupCloseToPlayer1Winning;
    }else if (variantChosen === "setupCloseToPlayer2Winning") {
        setupGame = setupCloseToPlayer2Winning;
    }else if (variantChosen === "setupDrawGame") {
        setupGame = setupDrawGame;
    }else if (variantChosen === "capture") {
        if (version === OwareVersionName) {
            setupGame = setupOwareCaptureState;
        } else {
            setupGame = setupKalahCaptureState;
        }
    }else if (variantChosen === "setupOwareSkip12State") {
        setupGame = setupOwareSkip12State;
    }else if (variantChosen === "setupKalahExtraGoState") {
        setupGame = setupKalahExtraGoState;
    }
}

function AImakeMove() {
    var houseChosen = houselist[Math.floor(Math.random() * houselist.length)];
    if (version === OwareVersionName) {
        OwareMakeAMove(2, houseChosen);
    } else if (version === KalahVersionName) {
        KalahMakeAMove(2, houseChosen);
    }
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
    if (version === OwareVersionName) {
        OwareMakeAMove(2, maxHouseIndex);
    } else if (version === KalahVersionName) {
        KalahMakeAMove(2, maxHouseIndex);
    }

}

export function setupInitialGame() {
    setnumberofseeds(0, 1, 1);
    setnumberofseeds(0, 2, 1);
    setnumberofseeds(0, 3, 1);
    setnumberofseeds(0, 4, 1);
    setnumberofseeds(0, 5, 1);
    setnumberofseeds(0, 6, 1);
    setnumberofseeds(0, 1, 2);
    setnumberofseeds(0, 2, 2);
    setnumberofseeds(0, 3, 2);
    setnumberofseeds(0, 4, 2);
    setnumberofseeds(0, 5, 2);
    setnumberofseeds(0, 6, 2);
    
    setnumberofseeds(4, 1, 1);
    setnumberofseeds(4, 2, 1);
    setnumberofseeds(4, 3, 1);
    setnumberofseeds(4, 4, 1);
    setnumberofseeds(4, 5, 1);
    setnumberofseeds(4, 6, 1);
    setnumberofseeds(4, 1, 2);
    setnumberofseeds(4, 2, 2);
    setnumberofseeds(4, 3, 2);
    setnumberofseeds(4, 4, 2);
    setnumberofseeds(4, 5, 2);
    setnumberofseeds(4, 6, 2);


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
    document.getElementsByClassName("winner")[0].innerHTML = null;
    playersTurn = 1;
}

export function setupCloseToPlayer1Winning() {
    setnumberofseeds(0, 1, 1);
    setnumberofseeds(0, 2, 1);
    setnumberofseeds(0, 3, 1);
    setnumberofseeds(0, 4, 1);
    setnumberofseeds(0, 5, 1);
    setnumberofseeds(0, 6, 1);
    setnumberofseeds(0, 1, 2);
    setnumberofseeds(0, 2, 2);
    setnumberofseeds(0, 3, 2);
    setnumberofseeds(0, 4, 2);
    setnumberofseeds(0, 5, 2);
    setnumberofseeds(0, 6, 2);
    
    setnumberofseeds(4, 1, 1);
    setnumberofseeds(4, 2, 1);
    setnumberofseeds(4, 3, 1);
    setnumberofseeds(4, 4, 1);
    setnumberofseeds(4, 5, 1);
    setnumberofseeds(4, 6, 1);
    setnumberofseeds(4, 1, 2);
    setnumberofseeds(4, 2, 2);
    setnumberofseeds(4, 3, 2);
    setnumberofseeds(4, 4, 2);
    setnumberofseeds(4, 5, 2);
    setnumberofseeds(4, 6, 2);


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
    
    document.getElementsByClassName("player-1-score")[0].innerHTML = 25;
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
    document.getElementsByClassName("winner")[0].innerHTML = null;
    playersTurn = 1;
}

export function setupCloseToPlayer2Winning() {
    setnumberofseeds(0, 1, 1);
    setnumberofseeds(0, 2, 1);
    setnumberofseeds(0, 3, 1);
    setnumberofseeds(0, 4, 1);
    setnumberofseeds(0, 5, 1);
    setnumberofseeds(0, 6, 1);
    setnumberofseeds(0, 1, 2);
    setnumberofseeds(0, 2, 2);
    setnumberofseeds(0, 3, 2);
    setnumberofseeds(0, 4, 2);
    setnumberofseeds(0, 5, 2);
    setnumberofseeds(0, 6, 2);
    
    setnumberofseeds(4, 1, 1);
    setnumberofseeds(4, 2, 1);
    setnumberofseeds(4, 3, 1);
    setnumberofseeds(4, 4, 1);
    setnumberofseeds(4, 5, 1);
    setnumberofseeds(4, 6, 1);
    setnumberofseeds(4, 1, 2);
    setnumberofseeds(4, 2, 2);
    setnumberofseeds(4, 3, 2);
    setnumberofseeds(4, 4, 2);
    setnumberofseeds(4, 5, 2);
    setnumberofseeds(4, 6, 2);


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
    document.getElementsByClassName("player-2-score")[0].innerHTML = 25;

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
    document.getElementsByClassName("winner")[0].innerHTML = null;
    playersTurn = 1;
}

export function setupDrawGame() {
    setnumberofseeds(0, 1, 1);
    setnumberofseeds(0, 2, 1);
    setnumberofseeds(0, 3, 1);
    setnumberofseeds(0, 4, 1);
    setnumberofseeds(0, 5, 1);
    setnumberofseeds(0, 6, 1);
    setnumberofseeds(0, 1, 2);
    setnumberofseeds(0, 2, 2);
    setnumberofseeds(0, 3, 2);
    setnumberofseeds(0, 4, 2);
    setnumberofseeds(0, 5, 2);
    setnumberofseeds(0, 6, 2);
    
    setnumberofseeds(4, 1, 1);
    setnumberofseeds(4, 2, 1);
    setnumberofseeds(4, 3, 1);
    setnumberofseeds(4, 4, 1);
    setnumberofseeds(4, 5, 1);
    setnumberofseeds(4, 6, 1);
    setnumberofseeds(4, 1, 2);
    setnumberofseeds(4, 2, 2);
    setnumberofseeds(4, 3, 2);
    setnumberofseeds(4, 4, 2);
    setnumberofseeds(4, 5, 2);
    setnumberofseeds(4, 6, 2);


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
    
    document.getElementsByClassName("player-1-score")[0].innerHTML = 24;
    document.getElementsByClassName("player-2-score")[0].innerHTML = 24;

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
    document.getElementsByClassName("winner")[0].innerHTML = null;
    playersTurn = 1;
}

export function setupOwareCaptureState() {
    setnumberofseeds(0, 1, 1);
    setnumberofseeds(0, 2, 1);
    setnumberofseeds(0, 3, 1);
    setnumberofseeds(0, 4, 1);
    setnumberofseeds(0, 5, 1);
    setnumberofseeds(0, 6, 1);
    setnumberofseeds(0, 1, 2);
    setnumberofseeds(0, 2, 2);
    setnumberofseeds(0, 3, 2);
    setnumberofseeds(0, 4, 2);
    setnumberofseeds(0, 5, 2);
    setnumberofseeds(0, 6, 2);
    
    setnumberofseeds(5, 5, 1);
    setnumberofseeds(1, 6, 1);
    setnumberofseeds(3, 1, 2);
    setnumberofseeds(1, 2, 2);
    setnumberofseeds(1, 3, 2);
    setnumberofseeds(2, 4, 2);
    setnumberofseeds(1, 5, 2);
    setnumberofseeds(0, 6, 2);


    document.getElementsByClassName("player-1-house-1 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-1-house-2 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-1-house-3 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-1-house-4 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-1-house-5 seeds")[0].innerHTML = 5;
    document.getElementsByClassName("player-1-house-6 seeds")[0].innerHTML = 1;

    document.getElementsByClassName("player-2-house-1 seeds")[0].innerHTML = 3;
    document.getElementsByClassName("player-2-house-2 seeds")[0].innerHTML = 1;
    document.getElementsByClassName("player-2-house-3 seeds")[0].innerHTML = 1;
    document.getElementsByClassName("player-2-house-4 seeds")[0].innerHTML = 2;
    document.getElementsByClassName("player-2-house-5 seeds")[0].innerHTML = 1;
    document.getElementsByClassName("player-2-house-6 seeds")[0].innerHTML = 0;
    
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
    document.getElementsByClassName("winner")[0].innerHTML = null;
    playersTurn = 1;
}

export function setupKalahCaptureState() {
    setnumberofseeds(0, 1, 1);
    setnumberofseeds(0, 2, 1);
    setnumberofseeds(0, 3, 1);
    setnumberofseeds(0, 4, 1);
    setnumberofseeds(0, 5, 1);
    setnumberofseeds(0, 6, 1);
    setnumberofseeds(0, 1, 2);
    setnumberofseeds(0, 2, 2);
    setnumberofseeds(0, 3, 2);
    setnumberofseeds(0, 4, 2);
    setnumberofseeds(0, 5, 2);
    setnumberofseeds(0, 6, 2);
    
    setnumberofseeds(4, 1, 2);
    setnumberofseeds(4, 2, 2);
    setnumberofseeds(4, 3, 2);
    setnumberofseeds(4, 4, 2);
    setnumberofseeds(4, 5, 2);
    setnumberofseeds(4, 6, 2);
    setnumberofseeds(1, 2, 1);
    setnumberofseeds(8, 6, 1);


    document.getElementsByClassName("player-1-house-1 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-1-house-2 seeds")[0].innerHTML = 1;
    document.getElementsByClassName("player-1-house-3 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-1-house-4 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-1-house-5 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-1-house-6 seeds")[0].innerHTML = 8;

    document.getElementsByClassName("player-2-house-1 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-2 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-3 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-4 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-5 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-6 seeds")[0].innerHTML = 4;
    
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
    document.getElementsByClassName("winner")[0].innerHTML = null;
    playersTurn = 1;
}

export function setupOwareSkip12State() {
    setnumberofseeds(0, 1, 1);
    setnumberofseeds(0, 2, 1);
    setnumberofseeds(0, 3, 1);
    setnumberofseeds(0, 4, 1);
    setnumberofseeds(0, 5, 1);
    setnumberofseeds(0, 6, 1);
    setnumberofseeds(0, 1, 2);
    setnumberofseeds(0, 2, 2);
    setnumberofseeds(0, 3, 2);
    setnumberofseeds(0, 4, 2);
    setnumberofseeds(0, 5, 2);
    setnumberofseeds(0, 6, 2);
    
    setnumberofseeds(4, 1, 1);
    setnumberofseeds(4, 2, 1);
    setnumberofseeds(4, 3, 1);
    setnumberofseeds(4, 4, 1);
    setnumberofseeds(12, 5, 1);
    setnumberofseeds(4, 6, 1);
    setnumberofseeds(1, 6, 2);


    document.getElementsByClassName("player-1-house-1 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-1-house-2 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-1-house-3 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-1-house-4 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-1-house-5 seeds")[0].innerHTML = 12;
    document.getElementsByClassName("player-1-house-6 seeds")[0].innerHTML = 4;

    document.getElementsByClassName("player-2-house-1 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-2-house-2 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-2-house-3 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-2-house-4 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-2-house-5 seeds")[0].innerHTML = 0;
    document.getElementsByClassName("player-2-house-6 seeds")[0].innerHTML = 1;
    
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
    document.getElementsByClassName("winner")[0].innerHTML = null;
    playersTurn = 1;
}

export function setupKalahExtraGoState() {
    setnumberofseeds(0, 1, 1);
    setnumberofseeds(0, 2, 1);
    setnumberofseeds(0, 3, 1);
    setnumberofseeds(0, 4, 1);
    setnumberofseeds(0, 5, 1);
    setnumberofseeds(0, 6, 1);
    setnumberofseeds(0, 1, 2);
    setnumberofseeds(0, 2, 2);
    setnumberofseeds(0, 3, 2);
    setnumberofseeds(0, 4, 2);
    setnumberofseeds(0, 5, 2);
    setnumberofseeds(0, 6, 2);
    
    setnumberofseeds(6, 1, 1);
    setnumberofseeds(5, 2, 1);
    setnumberofseeds(4, 3, 1);
    setnumberofseeds(3, 4, 1);
    setnumberofseeds(2, 5, 1);
    setnumberofseeds(1, 6, 1);
    setnumberofseeds(4, 1, 2);
    setnumberofseeds(4, 2, 2);
    setnumberofseeds(4, 3, 2);
    setnumberofseeds(4, 4, 2);
    setnumberofseeds(4, 5, 2);
    setnumberofseeds(4, 6, 2);


    document.getElementsByClassName("player-1-house-1 seeds")[0].innerHTML = 6;
    document.getElementsByClassName("player-1-house-2 seeds")[0].innerHTML = 5;
    document.getElementsByClassName("player-1-house-3 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-1-house-4 seeds")[0].innerHTML = 3;
    document.getElementsByClassName("player-1-house-5 seeds")[0].innerHTML = 2;
    document.getElementsByClassName("player-1-house-6 seeds")[0].innerHTML = 1;

    document.getElementsByClassName("player-2-house-1 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-2 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-3 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-4 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-5 seeds")[0].innerHTML = 4;
    document.getElementsByClassName("player-2-house-6 seeds")[0].innerHTML = 4;
    
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
    document.getElementsByClassName("winner")[0].innerHTML = null;
    playersTurn = 1;
}

