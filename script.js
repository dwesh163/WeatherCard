const options = {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
};

async function fetchAPI(api_key, city) {
	$('.weatherLoadingBox').show();
	$('.weatherUnavailableData').hide();
	hideInfo();

	const url = `//api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}`;
	const response = await fetch(url);
	if (!response.ok) {
		$('.weatherLoading').hide();
		$('.weatherUnavailableData').show();
		hideInfo();
		return;
	}
	const data = await response.json();

	let isNight = '';

	$('.weatherTemperatureText').text(data['current']['temp_c']);
	$('.weatherIimeText').text(new Date().toLocaleDateString('en-us', options));
	$('.weatherLocationText').text(data['location']['name'] + ', ' + data['location']['country']);

	if (data['current']['is_day'] == 0) {
		isNight = '_night';
	}

	console.log(`weather_${data['current']['condition']['text'].replaceAll(' ', '_')}${isNight}`);

	$('.weatherSection').removeClass('weatherError');
	$('.weatherSection').addClass(`weather_${data['current']['condition']['text'].replaceAll(' ', '_')}${isNight}`);
	await $('.weatherLoadingBox').hide();
	await showInfo();
}

const api_key = localStorage.getItem('WeatherCard');
const city = 'Renens';

$('.weatherLoadingBox').hide();

function hideInfo() {
	$('.weatherIconSun').hide();
	$('.weatherTextBox').hide();
}

function showInfo() {
	$('.weatherIconSun').show();
	$('.weatherTextBox').show();
}

setInterval(() => {
	fetchAPI(api_key, city);
}, 30000);

fetchAPI(api_key, city);

//weather_Light_rain
//weather_Moderate_rain_night
