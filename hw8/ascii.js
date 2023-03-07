/*
Sanjaya Jaysooriya 
615730
CS472-2023-03A-03D-01
*/
let selectedAnimationParts = [];
let animationTimer = null;
let speed = 250;
let currentFrame = 0;
$(document).ready(function(){
    $("#start-btn").click(function(){
        //Fetch the animation from textarea if the type is CUSTOM
        if($("#animation-select option:selected").val() == "CUSTOM") {
            let textAreaText = $("#mytextarea").val();
            selectedAnimationParts = textAreaText.split("=====\n");
        }
        animationTimer = setInterval(function () {
            if(selectedAnimationParts.length > 0 && 
               currentFrame < selectedAnimationParts.length &&
               selectedAnimationParts.length > currentFrame) {
                $("#mytextarea").val(selectedAnimationParts[currentFrame++]);
            } else {
                currentFrame = 0;
            }
        }, speed);
        $("#mytextarea").prop("readonly", true);
        $("#end-btn").prop("disabled", false);
        $("#start-btn").prop("disabled", true);
        $("#animation-select").prop("disabled", true);
        $("#speed-chk").prop("disabled", true);
    });
    $("#end-btn").click(function(){
        clearInterval(animationTimer);
        animationTimer = null;
        $("#mytextarea").prop("readonly", $("#animation-select option:selected").val() != "CUSTOM");
        $("#end-btn").prop("disabled", true);
        $("#start-btn").prop("disabled", false);
        $("#animation-select").prop("disabled", false);
        $("#speed-chk").prop("disabled", false);
    });
    $("#animation-select").change(function(){
        let selectedAnimation = () => {
            switch($("#animation-select option:selected").val()) {
                case 'EXERCISE':
                    return EXERCISE;
                case 'JUGGLER':
                    return JUGGLER;
                case 'DIVE':
                    return DIVE;
                case 'BIKE':
                    return BIKE;
                case 'CUSTOM':
                    // Use the custom value from textarea
                    $("#mytextarea").prop("readonly", false);
                    return $("#mytextarea").text();
                default:
                    return BLANK;                
            };
        };
        selectedAnimationParts = selectedAnimation().split("=====\n");
    });
    $("#font-select").change(function(){
        $("#mytextarea").css("fontSize",$("#font-select option:selected").val()+"pt");
    });
    $("#speed-chk").change(function(){
        if($("#speed-chk").is(":checked")) {
            speed = 50;
        } else {
            speed = 250;
        }
    });
});