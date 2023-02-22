
document.querySelector("#currentDay").textContent = "Today, " + dayjs().format('dddd, MMMM D, YYYY')
document.querySelector("#currentTime").textContent =dayjs().format('h:mm A')

var hr = dayjs().format('h');

var searchContent = document.querySelector("#locSearch");
var subButton = document.getElementById("subButt");
var key = "69d4e3163b70b25ade9ac546dae8169a";
var apiAdd = "&appid=" + key;
var lat;
var lon;
var longlatAdd;
subButton.addEventListener('click', function (event){
    event.preventDefault();
    getCoor(); })

function getCoor(){
    var baseUrl="http://api.openweathermap.org/geo/1.0/direct?q=";
    var city = searchContent.value.replace(/ /g, '');
    var limitAdd = "&limi=" + 5;
    var requestUrl = baseUrl + city + limitAdd + apiAdd ;
    var x;
    var y;
    console.log(requestUrl);
    fetch(requestUrl)
    .then(function (response) {
        //console.log(response.json());
        return response.json();
    })
    .then(function (data) {
       // console.log(data.json())
       lat = data[0].lat;
       lon = data[0].lon;
        longlatAdd="lat=" + lat + "&lon=" + lon;
       console.log(lon,lat);
       //console.log(longlatAdd)
       getWeather(longlatAdd);
    })
}

function getWeather(addCoor) {
    var baseUrl2 = "http://api.openweathermap.org/data/2.5/forecast?"
    var count = "&cnt=" + 5;
    var units = "&units=imperial";
    var requestUrl2 = baseUrl2 + addCoor + count + apiAdd + units ;
    console.log(requestUrl2)
    fetch(requestUrl2)
    .then(function (response) {
       // console.log(response.json())
        return response.json();
    })
    .then(function (data) {
       console.log(data)
       console.log(data.city)
    })
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