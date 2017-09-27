
var topics = [
  "Facepalm",
  "Happy",
  "Sad",
  "Help",
  "Awesome",
  "Sigh",
  "Slow clap",
  "Smh",
  "Smile",
  "Bored",
  "Confused",
  "Disgusted",
  "Eye roll",
  "Oh snap",
  "Omg",
  "Rejected",
  "Gtfo",
  "Frustrated",
  "Yolo",
  "Drunk"
];
console.log(topics);
$("#buttons-view").empty();
function renderButtons() {
  var reactionButton = $("<button class='btn btn-md reaction'>");
  var inside = $("#reaction-input").val().trim();
  reactionButton.attr("data-name", inside);
  reactionButton.text(inside);
  $("#buttons-view").append(reactionButton);
  // Adding reaction from the textbox to our array
  topics.push(inside);
  // resets the input field after you click submit
  $("reaction-input").val("");
  console.log(reactionButton);
}

$("#add-reaction").on("click", function(event) {
  event.preventDefault();
  renderButtons();
});

for (var i = 0; i < topics.length; i++) {
  var a = $("<button class='btn btn-md reaction'>");
  // Adding a data-attribute
  a.attr("data-name", topics[i]);
  a.text(topics[i]);
  // Adding the button to the buttons-view div
  $("#buttons-view").append(a);
}
// displayReactionInfo function re-renders the HTML to display the appropriate content


// jquery click event on dynamically added buttons, added body and reaction on click because otherwise the dynamically created buttons wouldn't use the ajax call

$("body").on("click", ".reaction",  function() {
  var reaction = $(this).attr("data-name");
  var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      reaction +
      "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg-13";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    //     transfer over the data states
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      var gifDiv = $("#reactions");
      var gifHold = $("<div class='inline'>");
      var gif = $("<img class ='gifAnimations'>");
      gif.attr("data-state", "still");
      // console.log(gif);
      gif.attr("src", results[i].images.fixed_height_still.url);
      gif.attr("data-still", results[i].images.fixed_height_still.url);
      gif.attr("data-animate", results[i].images.fixed_height.url);
      var p = $("<p>");
      p.text("Rating: " + results[i].rating);

      gifHold.append(p);
      gifHold.prepend(gif);
      $("#reactions").prepend(gifHold);
    }
    $(".gifAnimations").on("click", function() {
      var state = $(this).attr("data-state");
      console.log(state);

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log($(this).attr("data-state"));
      } else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

        console.log($(this).attr("data-state"));
      }
    });
  });
});
