$(document).ready(function () {
    $("#lookup-btn").click(getWord);
    $("#results").hide();
    $("#alert").hide();
});
function getWord () {
    $.ajax({
            url: "/get-word",
            type: "GET",
            data: { word: $("#word").val() },
            dataType: "json",
            "success": showWord,
            "error": noWord
    });
};
function showWord(data) {
    $(document).prop('title', $("#word").val() + " | WAP Dictionary");
    $("#results-body").html("");
    $("#results").show();
    $("#alert").hide();
    for(index in data) {
        $("#results-body").append(`<tr>
                                      <td>${data[index].wordtype}</th>
                                      <td class="def">${data[index].definition}</td>
                                  </tr>`);
    }
};
function noWord(error) {
    $("#alert").show();
    if(error.responseJSON == undefined || error.responseJSON.error == undefined) {
        if(error.responseText == undefined) {
            $("#alert").html(error.statusText);
        } else {
            $("#alert").html(error.responseText);
        }
    } else {
        $("#alert").html(error.responseJSON.error);
    }
};
