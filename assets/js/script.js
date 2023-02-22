
document.querySelector("#currentDay").textContent = "Today, " + dayjs().format('dddd, MMMM D, YYYY')
document.querySelector("#currentTime").textContent =dayjs().format('h:mm A')

var hr = dayjs().format('h');

var searchContent = document.querySelector("#locSearch");
var subButton = document.getElementById("subButt");
var key = "69d4e3163b70b25ade9ac546dae8169a";
var apiAdd;
var lat;
var lon;

subButton.addEventListener('click', function (event){
    event.preventDefault();
    getCoor(); })

function getCoor(){
    var baseUrl="http://api.openweathermap.org/geo/1.0/direct?q=";
    var city = searchContent.value.replace(/ /g, '');
    var limitAdd = "&limi=" + 5;
    apiAdd = "&appid=" + key;
    var requestUrl = baseUrl + city + limitAdd + apiAdd ;
    console.log(requestUrl);
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
      console.log(response.json());
    })
    .then(function (data) {
       // console.log(data.json())
       lat = data[0].lat
       lon = data[0].lat
       console.log(lat,lon)
    })
    getWeather();
}


function getWeather(){
    console.log("hey")
    var baseUrl2 = "api.openweathermap.org/data/2.5/forecast?"
    var longlatAdd="lat=" + lat + "&lon=" + lon;
    var requestUrl2 = baseUrl2 + longlatAdd + apiAdd ;
    console.log(requestUrl2)
}
/*var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');

//getApi function is called when the fetchButton is clicked

function getApi() {
  // Insert the API url to get a list of your repos
  var requestUrl = 'https://api.github.com/users/shannyan/repos';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //looping over the fetch response and inserting the URL of your repos into a list
      for (var i = 0; i < data.length; i++) {
        //Create a list element
        var listItem = document.createElement('li');

        //Set the text of the list element to the JSON response's .html_url property
        listItem.textContent = data[i].html_url;

        //Append the li element to the id associated with the ul element.
        repoList.appendChild(listItem);
      }
    });
}

fetchButton.addEventListener('click', getApi);
*/