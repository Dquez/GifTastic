
// Create an array of gifs to populate the page
// loop over the array to add buttons on page
// when button is clicked, use api to get back 10 images

// when type in text box and submit, new button appears

    $(".gif").on("click", function() {
        
         var state = $(this).attr("data-state");
      // console.log(state);
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log($(this).attr("data-state"));
      }
      
      else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        
        console.log($(this).attr("data-state"));
      }

    });

 
var result;
console.log(result);


  var topics = ["Facepalm", "Happy", "Sad", "Help", "Awesome", "Sigh", "Slow clap", "Smh", "Smile", "Bored", "Confused", "Disgusted", "Eye roll", "Oh snap", "Omg", "Rejected", "Gtfo", "Frustrated", "Yolo", "Drunk"];
      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {
       var animal = $(this).attr("data-name");
       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
             //     var animal = $(this).attr("data-animal");
      // 
        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	result = response.data;
        	console.log(result);

          // Creating a div to hold the movie
          var movieDiv = $("<div class='movie'>");
          // Storing the rating data
          var rating = response.Rated;
          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " + rating);
          // Displaying the rating
          movieDiv.append(pOne);
          // Storing the release year
          var released = response.Released;
          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Released: " + released);
          // Displaying the release year
          movieDiv.append(pTwo);
          // Storing the plot
          var plot = response.Plot;
          // Creating an element to hold the plot
          var pThree = $("<p>").text("Plot: " + plot);
          // Appending the plot
          movieDiv.append(pThree);
          // Retrieving the URL for the image
          var imgURL = response.Poster;
          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);
          // Appending the image
          movieDiv.append(image);
          // Putting the entire movie above the previous movies
          $("#movies-view").prepend(movieDiv);
          console.log(response);
        });
      }
      // Function for displaying movie data
      function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("movie");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);

          // Adding a data-attribute
          a.attr("data-state", "still");         
          // a.attr("data-still=" + result[i].images.fixed_height_still.url); 
          // a.attr("data-animate=" + result[i].images.fixed_height.url);
          a.attr("class",  "gif");
          // // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
      // This function handles events where a movie button is clicked
      $("#add-destination").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#animal-input").val().trim();
        // Adding movie from the textbox to our array
        topics.push(movie);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".movie", displayMovieInfo);
      // Calling the renderButtons function to display the intial buttons
      renderButtons();
