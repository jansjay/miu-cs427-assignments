$(document).ready(function () {
    $("#view_button").click(getPicture);
    $("#pic").hide();
});
function getPicture () {
    $.ajax({
            url: "https://api.nasa.gov/planetary/apod",
            type: "GET",
            data: { api_key: "DEMO_KEY",
            date: $("#date").val() },
            dataType: "json",
            "success": showPicture,
            "error": noPicture
    });
};
function showPicture(data) {
    $("#pic").attr("src", data.url);
    // Title is used as the page title
    $(document).prop('title', data.title + " | Astronomy Picture of the Day");
    // Explanation is used as the picture title
    $("#pic").prop('title', data.explanation);
    $("#pic").show();
};
function noPicture(error) {
    alert(error.responseText);
};
