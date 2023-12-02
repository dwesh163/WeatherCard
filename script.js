const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

async function fetchAPI(api_key, city) {
    $(".weatherLoadingBox").show()
    $(".weatherUnavailableData").hide()
    hideInfo()

    const url  = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}`;
    const response = await fetch(url)
    if (!response.ok) {
        $(".weatherLoading").hide()
        $(".weatherUnavailableData").show()
        hideInfo()
        return
    }
    const data = await response.json();

    $(".weatherTemperatureText").text(data["current"]["temp_c"])
    $(".weatherTimeText").text(new Date().toLocaleDateString("en-us", options))
    $(".weatherLocationText").text(data["location"]["name"] + ", " + data["location"]["country"])

    $(".weatherSection").removeClass("weatherError");
    $(".weatherSection").addClass("weatherSunny");
    await $(".weatherLoadingBox").hide()
    await showInfo()
}

const api_key = localStorage.getItem("WeatherCard")
const city = "Chabrey";

$(".weatherLoadingBox").hide()

function hideInfo() {
    $(".weatherSunnySun").hide()
    $(".weatherIconSun").hide()
    $(".weatherTextBox").hide()
}

function showInfo() {
    $(".weatherSunnySun").show()
    $(".weatherIconSun").show()
    $(".weatherTextBox").show()
}



fetchAPI(api_key, city)