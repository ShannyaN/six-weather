//INDEPENDENT
var allWeather = JSON.parse(localStorage.getItem('weatherData'))||[];

console.log(allWeather);
document.querySelector("#currentDay").textContent = "Today, " + dayjs().format('dddd, MMMM D, YYYY')
document.querySelector("#currentTime").textContent =dayjs().format('h:mm A')
var key = "69d4e3163b70b25ade9ac546dae8169a";
var apiAdd = "&appid=" + key;
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var idx = days.indexOf(dayjs().format('dddd'));
var in2 = days[idx+2] || idx-5;
var in3 = days[idx+3] || idx-4;
var in4 = days[idx+4] || idx-3;
console.log(in2)
//DEPENDENCIES
var hr = dayjs().format('h');
var subButton = document.getElementById("subButt");
var searchContent = document.querySelector("#locSearch");
var cityCollection = document.querySelector('.list-group');
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
var mainWeathEl = document.querySelectorAll(".mainWeath");
var descWeathEl = document.querySelectorAll(".descWeath");
var tempEl = document.querySelectorAll(".temp");
var windEl = document.querySelectorAll(".wind");
var weatherIconEl = document.querySelectorAll(".weathIcon");
var humidEl = document.querySelectorAll(".humid");
var tdForEl = document.querySelector("#tdFor");
var tmForEl = document.querySelector("#tmFor");
var in2ForEl = document.querySelector("#in2ds");
var in3ForEl = document.querySelector("#in3ds");
var in4ForEl = document.querySelector("#in4ds");
var cardTitleEls = [in2ForEl, in3ForEl, in4ForEl]
var cardTitle = [in2, in3, in4]
for (let index = 0; index < cardTitleEls.length; index++) {
  cardTitleEls[index].textContent=cardTitle[index];
}
var weatherIconElMain = document.getElementById("weathIcon");
console.log(in2ForEl)

var pic = "./assets/images/default.png"
weatherIconEl.src=pic

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
var city;

function getCoor(){
    var baseUrl="http://api.openweathermap.org/geo/1.0/direct?q=";
    city = searchContent.value.replace(/ /g, '');
    var limitAdd = "&limit=" + 5;
    var requestUrl = baseUrl + city + limitAdd + apiAdd ;
    var x;
    var y;
    cityWeather=[];
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
function addCity(cityAdd){
  for (let index = 0; index < allWeather.length; index++) {
    const currentLog = allWeather[index];
    if (currentLog[0].cityName === cityAdd) {return}
    else{
  var newCity = document.createElement('button');
  newCity.textContent= cityAdd
  cityCollection.appendChild(newCity)
  newCity.addEventListener('click', function (event){
    event.preventDefault();
    var idx;
    for (let index = 0; index < allWeather.length; index++) {
      const currentLog = allWeather[index];
      if (currentLog[0].cityName === cityAdd){
        idx=index;
        console.log(idx)
        console.log(index)
      }
    }
  cityWeather = allWeather[idx];
  popMain(cityWeather[0]);
  console.log(cityWeather)
  popFor(cityWeather);
  })
}}}
function createObj (x) {
  days[x] = {
    cityName,
    mainWeath,
    dayTime,
    mainWeath,
    descWeath,
    temp,
    wind,
    humid
  }
  console.log(days[x])
}
var cont = ["descWeath", "temp", "wind", "humid"]
var preFix = ["", "Temperature: ", "Wind: ", "Humidity: "]
var postFix = ["", "°F", " mph", "%"]
function popMain(obj){
  pic = `./assets/images/${obj.mainWeath.toLowerCase()}.png`
  weatherIconEl[0].src=pic
  var els0 = [descWeathEl[0],tempEl[0],windEl[0],humidEl[0]]
  for (let b = 0; b < els0.length; b++) {
    var popStr = `${preFix[b]}${obj[cont[b]]}${postFix[b]} `
    console.log(popStr);
    els0[b].textContent = popStr;
    console.log(obj)
}}
function popFor(fullObj){
  for (var s=0;s<fullObj.length;s++){
    var currentObj = fullObj[s];
    pic = `./assets/images/${fullObj[s].mainWeath.toLowerCase()}.png`
    weatherIconEl[s+1].src=pic
    var currentEl = [descWeathEl[s+1],tempEl[s+1],windEl[s+1],humidEl[s+1]];
    //var cont = ["mainWeath", "descWeath", "temp", "wind", "humid"]
    for (let d = 0; d < currentEl.length; d++) {
      var popStr = `${preFix[d]}${currentObj[cont[d]]}${postFix[d]} `
      console.log(popStr);
      currentEl[d].textContent = popStr;
      //console.log(obj)
    }
  }
}

function getWeather(addCoor) {
    var baseUrl2 = "http://api.openweathermap.org/data/2.5/forecast?"
    // var count = "&cnt=" + 50;
    var units = "&units=imperial";
    var requestUrl2 = baseUrl2 + addCoor + apiAdd + units ;
    console.log(requestUrl2)
    fetch(requestUrl2)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      cityName = `${data.city.name}, ${data.city.country}`;
      cityNameEl.textContent=cityName;
      // cityWeather.push(cityName);
       allInfo=data.list;
       console.log(allInfo)
       for (var i=0;i<40;i++){
        var x=0;
        console.log(allInfo);
        dayTime = allInfo[i].dt_txt;
        var stamp1=dayTime[11];
        var stamp2=dayTime[12];
        mainWeath = allInfo[i].weather[0].main;
        descWeath = allInfo[i].weather[0].description;
        temp = allInfo[i].main.temp
        wind = allInfo[i].wind.speed
        humid = allInfo[i].main.humidity
        if (stamp1==1 && stamp2==5) {//getting forecast for 15hrs or 3pm of each day
         if (cityWeather.length<6)
            createObj(i);
            cityWeather.push(days[i]);
        }
      }
      popMain(cityWeather[0]);
      popFor(cityWeather);
      addCity(cityName);
      allWeather.push(cityWeather);
      console.log(cityWeather)
      window.localStorage.setItem('weatherData',JSON.stringify(allWeather));
})
}

function showWeather(){
  mainEl.classList.remove("hide");
  for (let index = 0; index < forecastsec.children.length; index++) {
    const currentFor = forecastsec.children[index];
    currentFor.classList.remove("hide");
  }
};

subButton.addEventListener('click', function (event){
  event.preventDefault();
  getCoor();
  showWeather()
 })
 var forecastsec = document.querySelector('.forecast-section')
 console.log(forecastsec.children)
 allWeather.forEach(weatherEl => {
  addCity(weatherEl.cityName)
});