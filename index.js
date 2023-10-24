var version = "Oware";
document.getElementsByClassName("mancala-game-type")[0].innerHTML = version;
var turnPlayerOne =true;
document.getElementsByClassName("messages")[0].innerHTML ="Pick a house:";
function Turn(houseCLICKED) {
    if (turnPlayerOne && houseCLICKED == "HOUSE1") {
        turnPlayerOne =false;
        document.getElementsByClassName("messages")[0].innerHTML ="Pick a house:";
        PlayerTurn();
    }
    else if (turnPlayerOne && houseCLICKED == "HOUSE2"){
        document.getElementsByClassName("messages")[0].innerHTML ="Invalid Turn! Try a different house.";
    }
    else if (turnPlayerOne == false && houseCLICKED == "HOUSE1"){
        document.getElementsByClassName("messages")[0].innerHTML ="Invalid Turn! Try a different house.";
    }
    else if (turnPlayerOne == false && houseCLICKED == "HOUSE2") {
        turnPlayerOne =true;
        document.getElementsByClassName("messages")[0].innerHTML ="Pick a house:";
        PlayerTurn(); 
    }
}
function PlayerTurn() {
    if (turnPlayerOne) {
        document.getElementsByClassName("main-game")[0].innerHTML ="It's Player 1's Turn!";
        document.getElementById("housing 1").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 2").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 3").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 4").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 5").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 6").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 7").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 8").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 9").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 10").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 11").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 12").onclick=function(){Turn("HOUSE2");};
    }
    else {
        document.getElementsByClassName("main-game")[0].innerHTML ="It's Player 2's Turn!";
        document.getElementById("housing 1").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 2").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 3").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 4").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 5").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 6").onclick=function(){Turn("HOUSE1");};
        document.getElementById("housing 7").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 8").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 9").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 10").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 11").onclick=function(){Turn("HOUSE2");};
        document.getElementById("housing 12").onclick=function(){Turn("HOUSE2");};
    }
}
PlayerTurn();