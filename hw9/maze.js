$(document).ready(function(){
    $("#start").click(start);
});

let colorBoundaries = (color) => {
    $(".boundary").each(function(){
        this.style.backgroundColor = color
    });
}

let start = () => {
    colorBoundaries("");
    $(".boundary").mouseenter( boundaryMouseEnter ).mouseleave( boundaryMouseLeave );
    $("#maze").mouseleave(lose);
    $("#end").mouseenter(win);
    $("#start").unbind("click");
    $("#end").click(stop);
    $("#status").text("Click the \"S\" to begin.");
}
let stop = () => {
    $(".boundary").unbind("mouseenter");
    $("#maze").unbind("mouseleave");
    $(".boundary").unbind("mouseleave");
    $("#start").click(start);
    $("#end").unbind("click");
}
let boundaryMouseEnter = async(eventObject) => {
    eventObject.target.style.backgroundColor ="red";
    lose();
}
let boundaryMouseLeave = (eventObject) => {
    eventObject.target.style.backgroundColor = "";
}
let lose = () => {
    colorBoundaries("red");
    $("#status").text("Sorry, you lost! :[ Click the \"S\" again to begin.");
    stop();
}
let win = () => {
    colorBoundaries("green");
    $("#status").text("You Win! :] Click the \"S\" again to begin.");
    stop();
}
