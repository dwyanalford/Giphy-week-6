// Initial array of movies
var topics = ["American Beauty", "Forrest Gump", "The Truman Show", "Braveheart", "Boogie Nights", "Reservoir Dogs", "The Sixth Sense", "Good Will Hunting", "The Usual Suspects", "Casino", "Goodfellas", "The Matrix", "Boyz N the Hood", "Pulp Fiction", "Fight Club", "Saving Private Ryan"];

// Function for dumping the JSON content for each button into the div
function displayContent() {

    var dance = $(this).attr("data-name");
	console.log(dance);

	// Constructing a queryURL using the dance button name
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
	        dance + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
        	console.log(queryURL);
			console.log(response);
			// storing the data from the AJAX request in the results variable
			var results = response.data;
			console.log(results);

			 // Looping through each result item
          	for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var resultsDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag.  
            var danceImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            danceImage.attr("src", results[i].images.original_still.url);
            danceImage.attr("data-state", "still");
            danceImage.attr("data-animate", results[i].images.fixed_height.url);
            danceImage.attr("data-still", results[i].images.original_still.url);
            danceImage.addClass("imageEffect");

            // Appending the paragraph and image tag to the resultsDiv
            resultsDiv.append(p);
            resultsDiv.append(danceImage);

            // Prependng the resultsDiv to the HTML page in the "#gifImages" div
            $("#gifImages").prepend(resultsDiv);


            $(".imageEffect").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");


      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        var animate_url = $(this).attr("data-animate")
        $(this).attr("src", animate_url);
        $(this).attr("data-state", "animate");
      } else {
        var still_url = $(this).attr("data-still")
        $(this).attr("src", still_url);
        $(this).attr("data-state", "still");
      }
    });


        }
    });    
}

function renderButtons() {

   	// Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonsRow").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array
    var a = $("<button>");
    // Adding a class of movie to our button
    a.addClass("btn btn-info dances");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttonsRow div
    $("#buttonsRow").append(a);
    }
}
	
// Calling the renderButtons function to display the intial buttons
renderButtons();


// $(".animate").on("click", function() {
//       // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//       var state = $(this).attr("data-state");


//       // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//       // Then, set the image's data-state to animate
//       // Else set src to the data-still value
//       if (state === "still") {
//         var animate_url = $(this).attr("data-animate")
//         $(this).attr("src", animate_url);
//         $(this).attr("data-state", "animate");
//       } else {
//         var still_url = $(this).attr("data-still")
//         $(this).attr("src", still_url);
//         $(this).attr("data-state", "still");
//       }
//     });



/// This function allows user to select their own dance style
$("#addButton").on("click", function(event) {
	event.preventDefault();

	// This line grabs the input from the textbox
	var topic = $("#addText").val().trim();

	// Adding the movie from the textbox to our array
	topics.push(topic);
	console.log(topics)

	// Calling renderButtons which handles the processing of our movie array
	renderButtons();
});

// Function for displaying the dances content
// Using $(document).on instead of $(".movie").on to add event listeners to dynamically generated elements
$(document).on("click", ".dances", displayContent);

// Calling the renderButtons function to display the intial buttons
renderButtons();

		 