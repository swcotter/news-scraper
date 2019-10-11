$(".saveBtn").on("click", function() {
    var id = $(this).attr("value");
    $.ajax({
        method: "POST",
        url: "/save/" + id
    }).then(function(data) {
        console.log(data);
    });
});

$(".unsaveBtn").on("click", function() {
    var id = $(this).attr("value");
    $.ajax({
        method: "POST",
        url: "/unsave/" + id
    }).then(function(data) {
        console.log(data);
    });
});

$(".clearButton").on("click", function() {
    console.log("clicked");
    var category = $(this).attr("category");
    // $.ajax({
    //     method: "POST",
    //     url: "/api/clear/" + category
    // }).then(function(data) {
    //     console.log(data);
    // });
});

$(".scrapeButton").on("click", function() {
    var category = $(this).attr("category");
    console.log(category);
    $.ajax({
        method: "POST",
        url: "/scrape/" + category
    }).then(function(data) {
        console.log(data);
    });
});

$(".noteBtn").on("click", function() {
    // $(".noteDiv").html("");
    $("#noteSubmit").removeAttr("disabled")
    var id = $(this).attr("value");
    console.log(id);
    // $(".noteDiv").append('<div class="noteContent p-3 mb-4"><form><div class="form-group pb-4"><h5 class="float-left">Save a Note: </h5><p class="float-left">&nbsp;Article ' + id + '</p><button type="button" class="close float-right" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="form-group"><input class="form-control noteTitle" type="text" placeholder="Title"></div><div class="form-group"><textarea class="form-control noteBody" rows="3" placeholder="Body"></textarea></div><button type="submit" class="btn btn-outline-secondary" id="noteSubmit" value="' + id + '" data-dismiss="alert">Submit</button></form></div>')
    // $(".noteDiv").html('<div class="noteContent p-3 mb-4"><form><div class="form-group pb-4"><h5 class="float-left">Save a Note: </h5><p class="float-left">&nbsp;Article ' + id + '</p><button type="button" class="close float-right" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="form-group"><input class="form-control noteTitle" type="text" placeholder="Title"></div><div class="form-group"><textarea class="form-control noteBody" rows="3" placeholder="Body"></textarea></div><button type="button" class="btn btn-outline-secondary" id="noteSubmit" value="' + id + '">Submit</button></form></div>')
    $(".noteForm").html('<div class="form-group pb-4" value="' + id + '"><h5 class="float-left">Save a Note: </h5></div><div><p class="float-left">&nbsp;Article ' + id + '</p></div><div class="form-group"><input class="form-control noteTitle" type="text" placeholder="Title"></div><div class="form-group"><textarea class="form-control noteBody" rows="3" placeholder="Body"></textarea></div>')
});
   
$("#noteSubmit").on("click", function() {
    console.log($(".noteTitle").val());
    console.log($(".noteBody").val());

    var id = ($(".form-group").attr("value"));
    console.log(id);
    $.ajax({
        method: "POST",
        url: "/api/create/note/" + id,
        data: {
            title: $(".noteTitle").val(),
            body: $(".noteBody").val()
        }
    }).then(function(data) {
        console.log(data);
    });
})