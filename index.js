'use strict';

const apiKey = 'jIaJSP7aMeZtpeddXmlu09ZIt5x3BGCIIl5W3Dt6'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}<p>
            <p><a href=${responseJson.data[i].url}>${responseJson.data[i].url}</a></p>
            <p>${responseJson.data[i].addresses[1].line1}</p>
            <p>${responseJson.data[i].addresses[1].line2}</p>
            <p>${responseJson.data[i].addresses[1].city}</p>
            <p>${responseJson.data[i].addresses[1].stateCode}</p>
            <p>${responseJson.data[i].addresses[1].postalCode}</p>
            </li>`
        )};
    $('#results').removeClass('hidden');
}

function getParks (searchTerm, limit=10) { 
  const params = {
    stateCode: searchTerm,
    api_key: apiKey,
    limit,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault(); 
    const searchTerm = $('#js-search-parks').val();
    const limit = $('#js-max-results').val();
    getParks (searchTerm, limit);
  });
}

$(watchForm);