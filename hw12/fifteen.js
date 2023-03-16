"use strict";
let space = function(x, y){
    this.x = x;
    this.y = y;
}

let puzzleArea = null;
let divs = null;
let emptySpace = new space(0, 0);

//Additional for glowing when won
let glowTimer1 = null;
let glowTimer2 = null;


const init = function() {
    puzzleArea = document.getElementById('puzzlearea');
    divs = puzzleArea.getElementsByTagName("div");
    
    let x = 0;
    let y = 0;
    
    // initialize each piece
    for (var i=0; i< divs.length; i++) {
        var div = divs[i];
        
        // calculate x and y for this piece
        x = ((i % 4) * 100) ;
        y = (Math.floor(i / 4) * 100) ;

        // set basic style and background
        div.className = "puzzlepiece image0";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';
        
        // store x and y for later
        div.x = x;
        div.y = y;        

        //clicked
        div.onclick = move;
    }
    // Now the empty space is the last
    emptySpace.x = x + 100;
    emptySpace.y = y;
    document.getElementById('shufflebutton').onclick = shuffle; 
    document.getElementById('changeImagebutton').onclick = changeImage;
};

const getRandomDivToMove = function(moves){
    var move = moves[Math.floor(Math.random()*(moves.length))];
    return getDiv(move.x, move.y);
}
const canDivBeMoved = function(divToMove){
    var moves = getDivsToMove();
    for(var i = 0; i< moves.length; i++) {
        var divCanBeMoved = getDiv(moves[i].x, moves[i].y);
        if (divCanBeMoved === divToMove) {
            return true;
        }
    }
    return false;
}

const getDivsToMove = function() {
    var spaces = [];
    //left
    if(emptySpace.x - 100 >= 0){
        spaces[spaces.length] = new space(emptySpace.x - 100, emptySpace.y);
    }
    //right
    if(emptySpace.x + 100 <= 300 ){
        spaces[spaces.length] = new space(emptySpace.x + 100, emptySpace.y);
    }
    //bottom
    if(emptySpace.y + 100 <= 300){
        spaces[spaces.length] = new space(emptySpace.x, emptySpace.y + 100);
    }
    //top
    if(emptySpace.y - 100 >= 0){
        spaces[spaces.length] = new space(emptySpace.x, emptySpace.y - 100);
    }
    return spaces;
}

const shuffle = function() {
    var traceBack = [];
    const maxShuffle = 200;
    for(var i = 0; i < maxShuffle; i++) {        
        var toMove = getRandomDivToMove(getDivsToMove());
        swap(toMove, false);        
        // This is to trace back the correct path
        traceBack[maxShuffle - i - 1] = [parseInt(toMove.style.left), parseInt(toMove.style.top)];
    }
    //Print trace in the console so that can be used to solve the puzzle
    console.log("Perform below moves exactly in order to come to the state where shuffle started.");
    for(var i = 0; i < maxShuffle; i++) {
        console.log("Move " + (i + 1) + ". " + (Math.floor(traceBack[i][0]/100) + 1) + ", " + (Math.floor(traceBack[i][1])/100 + 1));
    }
    setDivStyles();
    glowIfWon();
}

const changeImage = function() {    
    var imageNo = Math.floor(Math.random()*(4));
    for (var i = 0; i< divs.length; i++) {
        divs[i].className = divs[i].className.replace(/image[0-3]/, "image" + imageNo);
    }
}

const swap = function(toMoveElement, manualMove){
    let nextEmptyX = parseInt(toMoveElement.style.left);
    let nextEmptyY = parseInt(toMoveElement.style.top);
    toMoveElement.style.left = emptySpace.x + 'px';
    toMoveElement.style.top = emptySpace.y + 'px';
    emptySpace.x = nextEmptyX;
    emptySpace.y = nextEmptyY;
    if(manualMove) {
        glowIfWon();
    }
}
const move = function(target){
    let div = document.elementFromPoint(target.x, target.y);
    var oldClassName = div.className;
    if(canDivBeMoved(div)) {
        swap(div, true);
        setDivStyles();
        colorForWhile(div, div.className, oldClassName + " valid");
    } else {
        colorForWhile(div, div.className, oldClassName + " invalid");
    }
}

const colorForWhile = function(div, oldClassName, className) {
    div.className = className;
    setTimeout(() => {
        div.className = oldClassName;
    }, 1000);
}

const getDiv = function(x, y){
    for (var i=0; i< divs.length; i++) {
        var div = divs[i];
        var divX = parseInt(div.style.left);
        var divY = parseInt(div.style.top);
        if( divX <= x && divX + 100 > x &&
            divY <= y && divY + 100 > y) {
            return div;
        }
    }
}

const setDivStyles = function(){
    for (var i=0; i< divs.length; i++) {
        var div = divs[i];
        div.className = div.className = div.className.replace(/movablepiece/, "");
    }
    var spacesWhichCanBeMoved = getDivsToMove();
    for (var i=0; i<spacesWhichCanBeMoved.length; i++) {
        var div = getDiv(spacesWhichCanBeMoved[i].x, spacesWhichCanBeMoved[i].y);
        div.className = div.className.replace(/movablepiece/, "") + " movablepiece";
    }
}

const checkWin = function(){
    for (var i=0; i< divs.length; i++) {
        var div = divs[i];
        var divFromOriginalXY = getDiv(div.x, div.y)
        if( div != divFromOriginalXY) {
            return false;
        }
    }
    return true;
}

const glowIfWon = function() {
    if(glowTimer1 != null){
        clearInterval(glowTimer1);
        glowTimer1 = null;
    }
    if(glowTimer2 != null){
        clearInterval(glowTimer2);
        glowTimer2 = null;
    }
    if(checkWin()){
        glowTimer1 = setInterval(() => {
            puzzleArea.className = "";
        }, 400);
        glowTimer2 = setInterval(() => {
            puzzleArea.className = "glow";
        }, 800);
        alert("Congratulations, You have won!!!");        
    } else {
        puzzleArea.className = "";
    }

}
window.onload = init;
