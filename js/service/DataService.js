var API_KEY = '7waqfqbprs7pajbz28mqf6vz';
var API_URL = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
var PAGE_SIZE = 25;
var PARAMS = '?apikey=' + API_KEY + '&page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

function fetchData(callback) {
    fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
            callback(responseData);
        })
        .done();
}

module.exports = {
    fetchData: fetchData
};
