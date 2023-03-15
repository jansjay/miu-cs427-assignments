"use strict";
let puzzleArea = null;
let divs = null;
let space = function(x, y){
    this.x = x;
    this.y = y;
}
let emptySpace = new space(0, 0);
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
        div.className = "puzzlepiece";
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.backgroundImage = 'url("background.jpg")';
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
    const maxShuffle = 100;
    for(var i = 0; i < maxShuffle; i++) {        
        var toMove = getRandomDivToMove(getDivsToMove());
        swap(toMove);        
        // This is to trace back the correct path
        //traceBack[maxShuffle - i - 1] = [toMove.x, toMove.y];        
    }
    //Print trace back
    //for(var i = 0; i < maxShuffle; i++) {
    //    console.log((i + 1) + ". " + (Math.floor(traceBack[i][0]/100) + 1) + ", " + (Math.floor(traceBack[i][1])/100 + 1));
    //}
}
const swap = function(toMoveElement){
    let nextEmptyX = parseInt(toMoveElement.style.left);
    let nextEmptyY = parseInt(toMoveElement.style.top);
    toMoveElement.style.left = emptySpace.x + 'px';
    toMoveElement.style.top = emptySpace.y + 'px';
    emptySpace.x = nextEmptyX;
    emptySpace.y = nextEmptyY;  
}
const move = function(target){
    let div = document.elementFromPoint(target.x, target.y);
    if(canDivBeMoved(div)) {
        swap(div);
        colorForWhile(div,"green");
    } else {
        colorForWhile(div,"red");
    }
}

const colorForWhile = function(div, newColor) {
    var oldColor = div.style.borderColor;
    div.style.borderColor = newColor;
    setTimeout(() => {
        div.style.borderColor = oldColor;
    }, 1000);
}

const getDiv = function(x, y){
    for (var i=0; i< divs.length; i++) {
        var div = divs[i];
        let divX = parseInt(div.style.left);
        let divY = parseInt(div.style.top);
        if( divX <= x && divX + 100 > x &&
            divY <= y && divY + 100 > y) {
            return div;
        }
    }
}



window.onload = init;
