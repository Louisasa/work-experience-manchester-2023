var version = "Oware";
<<<<<<< Updated upstream

document.getElementsByClassName("mancala-game-type")[0].innerHTML = version;
=======
var HasGameStarted = false; 
var GameStateButtonText = 'Start Game';
var initialHouseNumber = "4";
var initialScoreNumber = "0";
var playersTurn = 1;
var winnerText = "Winner!";
var invalidTurnText = "Invalid Turn! Try a different house.";
var pickAHouseText = "Pick a house:";
var sec = 30;
var sec2 = 30;
var ChangeGo=false;
var TimeRanOut = false;
var Started=false;
var TimerSelection=false
var TimerIsOn = false
var LastChoice = "option2"

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
    document.getElementById('GameTimer').innerHTML='';
    setupGame();
    timer();
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
    document.getElementsByClassName('alerts').innerHTML=' ';
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
        if (TimeRanOut){
            document.getElementsByClassName("main-game")[0].innerHTML ="Player 2 ran out of time! Next player!";
        }
        else{
            document.getElementsByClassName("main-game")[0].innerHTML ="It's Player 1's Turn!";
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
            document.getElementsByClassName("main-game")[0].innerHTML ="Player 1 ran out of time! Next player!";
        }
        else{
            document.getElementsByClassName("main-game")[0].innerHTML ="It's Player 2's Turn!";
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
    // Figure out how many seeds are in the house
    var numberOfSeeds = parseInt(document.getElementsByClassName(`player-${playerNumber}-house-${houseNumber} seeds`)[0].innerHTML);

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
        var seedsMoved = document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML;
        document.getElementsByClassName(`player-${playerNumberToUpdate}-house-${houseIndex} seeds`)[0].innerHTML = parseInt(seedsMoved)+1;
        houseIndex++;
    }
    changePlayer();
}

function checkForEndgame() {
    var p1score = document.getElementsByClassName('player-1 score')[0].innerHTML;
    var p2score = document.getElementsByClassName('player-2 score')[0].innerHTML;
    if (p1score > "24" || p2score > "24" || (p1score ==="24" && p2score ==="24")) {
        HasGameStarted = false;
        GameStateButtonText = "Restart game";
        document.getElementsByClassName("game-state")[0].innerHTML = GameStateButtonText;
        document.getElementsByClassName("messages")[0].innerHTML = "";
        document.getElementsByClassName("main-game")[0].innerHTML = "";
        showWinner();
    }
}

function capture(numberOfSeeds, player){
    var currentScore = document.getElementsByClassName(`player-${player} score`)[0].innerHTML
    document.getElementsByClassName(`player-${player} score`)[0].innerHTML = parseInt(currentScore)+numberOfSeeds;
}

function TimeOut(){
    sec = 29;
    timer();
}
function TimeOut2(){
    sec2 = 29;
    timer();
}
function timer(){
    if (TimerIsOn){
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
            if (TimerIsOn==false){
                sec =30
                document.getElementById('GameTimer').innerHTML='';
            }
        }, 1000);
}}
function timer2(){
    if (TimerIsOn){
        document.getElementById('GameTimer').innerHTML='You have 00:'+sec2;
        var timer2 = setInterval(function(){
            sec2--;
            if (sec2 < 10){
                document.getElementById('GameTimer').innerHTML='You have 00:0'+sec2;
            }
            else{
                document.getElementById('GameTimer').innerHTML='You have 00:'+sec2;
            }
            if (sec2 < 0) {
                TimeRanOut == true
                clearInterval(timer2);
                changePlayer();
                TimeOut();
            }
            if (ChangeGo) {
                sec2 = 29
                ChangeGo = false;
                clearInterval(timer2);
                TimeOut2();
            }
            if (TimerIsOn==false){
                sec2 =30
                document.getElementById('GameTimer').innerHTML='';
            }
        }, 1000);
}}
document.getElementById("TimerSelect").onchange = function() {
    TimerSelection = this.value;
    if (TimerSelection == "option2"){
        TimerIsOn=true;
        console.log("works");
        if (TimerSelection != LastChoice && Started){
            document.getElementsByClassName("GameUpdates").innerHTML='Press to apply new changes!';
    }
    }
    else if (TimerSelection == "option1"){
        TimerIsOn=false;
        if (TimerSelection != LastChoice && Started){
            document.getElementsByClassName("GameUpdates").innerHTML='Press to apply new changes!';
        }

    }
}
>>>>>>> Stashed changes
