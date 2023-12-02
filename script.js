const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

async function fetchAPI(api_key, city) {
    $(".loadingBox").show()
    $(".unavailableData").hide()
    hideInfo()

    const url  = `http://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}`;
    const response = await fetch(url)
    if (!response.ok) {
        $(".loading").hide()
        $(".unavailableData").show()
        hideInfo()
        return
    }
    const data = await response.json();

    $(".temperatureText").text(data["current"]["temp_c"])
    $(".timeText").text(new Date().toLocaleDateString("en-us", options))
    $(".locationText").text(data["location"]["name"] + ", " + data["location"]["country"])

    $("section").removeClass("error");
    $("section").addClass("sunny");
    await $(".loadingBox").hide()
    await showInfo()
}

const api_key = localStorage.getItem("WeatherCard")
const city = "Chabrey";

$(".loadingBox").hide()

function hideInfo() {
    $(".sunnySun").hide()
    $(".iconSun").hide()
    $(".textBox").hide()
}

function showInfo() {
    $(".sunnySun").show()
    $(".iconSun").show()
    $(".textBox").show()
}



fetchAPI(api_key, city)