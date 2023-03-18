$(document).ready(function () {
    $("#view_button").click(getPicture);
    $("#pic").hide();
});
function getPicture () {
    new Promise((resolve, reject) => {
        fetch("https://api.nasa.gov/planetary/apod?" + new URLSearchParams({  api_key: "DEMO_KEY",
                                                                              date: $("#date").val() })
        )
        .then((response) => {
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Oops, we haven't got JSON!");
            }
            return response.json();
        })
        .then ((data) => {
            resolve(showPicture(data));
        })
        .catch((error) => {
            reject(noPicture(error));
        });
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
