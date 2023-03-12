//INDEPENDENT
document.querySelector("#currentDay").textContent = "Today, " + dayjs().format('dddd, MMMM D, YYYY')
document.querySelector("#currentTime").textContent =dayjs().format('h:mm A')
var key = "69d4e3163b70b25ade9ac546dae8169a";
var apiAdd = "&appid=" + key;
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var idx = days.indexOf(dayjs().format('dddd'));
var in2 = days[idx+2] || idx-5;
var in3 = days[idx+3] || idx-4;
var in4 = days[idx+4] || idx-3;

//DEPENDENCIES
var hr = dayjs().format('h');
var subButton = document.getElementById("subButt");
var searchContent = document.querySelector("#locSearch");
var allCities = document.querySelector('.list-group').children;
var mainEl = document.querySelector("#main");
var city1El = document.querySelector("#city1");
var city2El = document.querySelector("#city2");
var city3El = document.querySelector("#city3");
var city4El = document.querySelector("#city4");
var city5El = document.querySelector("#city5");
var in2dsEl = document.querySelector("#in2ds");
var in3dsEl = document.querySelector("#in3ds");
var in4dsEl = document.querySelector("#in4ds");
var cityNameEl = document.querySelector(".cityName");
var locationEl = document.querySelector("#location");

//INITIALIZATIONS
var lat;
var lon;
var longlatAdd;
var i=0;
var allInfo;
var dayTime;
var mainWeath;
var descWeath;
var temp ;
var wind ;
var humid;
var days = [];
var cityWeather;
var cityName;

function getCoor(){
    var baseUrl="http://api.openweathermap.org/geo/1.0/direct?q=";
    var city = searchContent.value.replace(/ /g, '');
    var limitAdd = "&limit=" + 5;
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

function createObj (x) {
  days[x] = {
    dayTime,
    mainWeath,
    descWeath,
    temp,
    wind,
    humid
  }
  console.log(days[x])
}
function popFor(obj){
  locationEl.textContent("Today's Forecast in" + {cityName});
}
function getWeather(addCoor) {
    var baseUrl2 = "http://api.openweathermap.org/data/2.5/forecast?"
    var count = "&cnt=" + 40;
    var units = "&units=imperial";
    var requestUrl2 = baseUrl2 + addCoor + count + apiAdd + units ;
    console.log(requestUrl2)
    fetch(requestUrl2)
    .then(function (response) {
       // console.log(response.json())
        return response.json();
    })
    .then(function (data) {
      var cityWeather = [];
      cityName = `${data.city.name}, ${data.city.country}`;
      cityWeather.push(cityName);
       console.log(cityWeather);
       //console.log(data.list)
       allInfo=data.list;
       //console.log(city)
       for (var i=0;i<38;i++){
        //console.log(allInfo[i].dt_txt);
        dayTime = allInfo[i].dt_txt;
        //console.log(allInfo[i].weather[0].main);
        stamp=dayTime[12];
        mainWeath = allInfo[i].weather[0].main;
        descWeath = allInfo[i].weather[0].description;
       //console.log(allInfo[i].main.temp)
        temp = allInfo[i].main.temp
        wind = allInfo[i].wind.speed
        //console.log(wind)
        humid = allInfo[i].main.humidity
        if (stamp==3) {
          createObj(i);
          cityWeather.push(days[i]);
        }
      }
      popFor(cityWeather);
})
}

function showWeather(){
  for (let index = 0; index < allCities.length; index++) {
    const currentCity = allCities[index];
    currentCity.classList.remove("hide");
  }
  mainEl.classList.remove("hide");
};

subButton.addEventListener('click', function (event){
  event.preventDefault();
  getCoor();
  showWeather()
 })


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