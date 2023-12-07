const url = new URL(window.location.href);
if(url.searchParams.get('api')){
    localStorage.setItem("WeatherCard", JSON.stringify({"key":url.searchParams.get('api'), "date": Date.now(), "city": "paris"}))
    window.location.href=url.origin + url.pathname
}

data = JSON.parse(localStorage.getItem("WeatherCard"))

if(data["date"] + 1500000000 < Date.now()){
    data["key"] = "obsolete"
    data["date"] = Date.now()
    localStorage.setItem("WeatherCard", JSON.stringify(data))
}