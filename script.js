// Event listener for the search button click
$('#searchBtn').on('click', () => {
  // Get the input value
  let searchQuery = $('#input').val();

  // Check if a valid searchQuery is provided
  if (searchQuery) {
    // Make an API request with the provided searchQuery
    makeAPIRequest(searchQuery);

    // Clear existing GIFs and text
    $('#gifs').html('');
    $('p').text('');
  } else {
    // Display an error message if no input is provided
    $('p').text('Invalid input');
  }

  // Clear the input field after processing
  $('#input').val('');
});

// Function to make an API request with a given searchQuery
function makeAPIRequest(searchQuery) {
  // Construct the URL for the API request
  const apiUrl =
    'https://g.tenor.com/v1/search?q=' +
    searchQuery +
    '&key=LIVDSRZULELA&limit=10';

  // Try making the API request and handle errors
  try {
    loadGifs(apiUrl);
  } catch (error) {
    // Log the error and display an error message
    console.error('API request failed:', error);
    showErrorMessage('Failed to load GIFs. Please try again.');
  }
}

// Function to load GIFs from a given URL using XMLHttpRequest
function loadGifs(apiUrl) {
  // Create a new XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // Open a GET request to the specified URL
  xhr.open('GET', apiUrl, true);

  // Send the request
  xhr.send();

  // Define a callback function to handle the response
  xhr.onreadystatechange = function () {
    // Check if the request is complete and successful
    if (xhr.readyState == 4 && xhr.status == 200) {
      // Parse the response JSON
      const responseObject = JSON.parse(this.responseText);

      // Extract the top 10 GIFs from the response
      const top10Gifs = responseObject['results'];

      // Display the top 10 GIFs
      showGifs(top10Gifs);
    }
  };
}

// Function to display GIFs in the '#gifs' element
function showGifs(top10Gifs) {
  // Iterate over the top 10 GIFs and append them to the '#gifs' element
  for (let i = 0; i < 10; i++) {
    // Extract the GIF URL from the response
    const gifUrl = top10Gifs[i]?.['media'][0]?.['nanogif']?.['url'];

    // Append the GIF as an image element to the '#gifs' element if the URL is available
    if (gifUrl) {
      $('#gifs').append(
        `<img src=${gifUrl} alt='' style='width:18%;height:164px;margin:2px;'>`,
      );
    }
  }
}

// Function to display an error message in the 'p' element
function showErrorMessage(message) {
  // Display the error message if the 'p' element is empty
  if ($('p:empty')) {
    $('p').text(message);
  }
}
