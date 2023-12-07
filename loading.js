const url = new URL(window.location.href);
if(url.searchParams.get('api')){
    localStorage.setItem("WeatherCard", url.searchParams.get('api'))
    window.location.href=url.origin + url.pathname
}