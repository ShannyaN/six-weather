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
var mainWeathEl = document.querySelectorAll(".mainWeath");
console.log(mainWeathEl)
var descWeathEl = document.querySelectorAll(".descWeath");
var tempEl = document.querySelectorAll(".temp");
var windEl = document.querySelectorAll(".wind");
var humidEl = document.querySelectorAll(".humid");
var tdForEl = document.querySelector("#tdFor");
var tmForEl = document.querySelector("#tmFor");
var in2ForEl = document.querySelector("#in2dFor");
var in3ForEl = document.querySelector("#in3dFor");
var in4ForEl = document.querySelector("#in4dFor");

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

function clearCurrent(){
  console.log(mainWeath)
    // var els1 = [mainWeathEl[0], descWeathEl[0],tempEl[0],windEl[0],humidEl[0]]
    // for (let b = 0; b < els1.length; b++) {
    //   var currentText;
    //   els1[b].textContent = currentTxt;
    //   console.log(currentTxt)
    //  //var colonLoc = currentTxt.indexOf(":")
    //   currentTxt = currentTxt.split(":");
    //   currentTxt = currentTxt[0] + ": ";
    //   console.log(currentTxt)
    //   els1[b].textContent=currentTxt;}
    /*for (var e=0;e<cityWeather.length;e++){
      var currentEls = [mainWeathEl[e+1], descWeathEl[e+1],tempEl[e+1],windEl[e+1],humidEl[e+1]];
      for (let w = 0; w < currentEls.length; w++) {
        var currentTxts = currentEls[w].textContent;
        currentTxts = currentTxts.split(":");
        currentTxts = currentTxts[0] + ": ";
        console.log(currentTxts)
        currentEls[w].textContent=currentTxts;
      }
    }*/
}
    

var temp = `Main weather: ${data[0].temp}`
currentEl.val(temp)

var cont = ["mainWeath", "descWeath", "temp", "wind", "humid"]
function popMain(obj){
  if (city)
  var els0 = [mainWeathEl[0], descWeathEl[0],tempEl[0],windEl[0],humidEl[0]]
  for (let b = 0; b < els0.length; b++) {
    els0[b].append(obj[cont[b]]);
    console.log(obj)
}}
function popFor(fullObj){
  for (var s=0;s<fullObj.length;s++){
    var currentObj = fullObj[s];
    var currentEl = [mainWeathEl[s+1], descWeathEl[s+1],tempEl[s+1],windEl[s+1],humidEl[s+1]];
    //var cont = ["mainWeath", "descWeath", "temp", "wind", "humid"]
    for (let d = 0; d < currentEl.length; d++) {
      currentEl[d].append(currentObj[cont[d]]);
      //console.log(obj)

  }
}}

function getWeather(addCoor) {
    var baseUrl2 = "http://api.openweathermap.org/data/2.5/forecast?"
    var count = "&cnt=" + 40;
    var units = "&units=imperial";
    var requestUrl2 = baseUrl2 + addCoor + count + apiAdd + units ;
    console.log(requestUrl2)
    fetch(requestUrl2)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      var cityWeather = [];
      cityName = `${data.city.name}, ${data.city.country}`;
      cityNameEl.textContent=cityName;
       allInfo=data.list;
       for (var i=0;i<38;i++){
        var x=0;
        dayTime = allInfo[i].dt_txt;
        stamp=dayTime[12];
        mainWeath = allInfo[i].weather[0].main;
        descWeath = allInfo[i].weather[0].description;
        temp = allInfo[i].main.temp
        wind = allInfo[i].wind.speed
        humid = allInfo[i].main.humidity
        if (stamp==3) {
          createObj(i);
          cityWeather.push(days[i]);
        }
      }
      
      popMain(cityWeather[0]);
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
  if (cityWeather) {clearCurrent()};
  getCoor();
  showWeather()
 })