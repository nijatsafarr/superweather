export default async function swApi(city) {
  try {
    const cityRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    const cityData = await cityRes.json()
    
    if (!cityData.results || cityData.results.length === 0) {
        "City not found..."
        return
    }

    const {latitude, longitude, name, country} = cityData.results[0]

    const weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation_probability,is_day,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant,moon_phase,relative_humidity_2m_mean&timezone=auto&forecast_days=7`)
    const weatherData = await weather.json()
    return {name, country, current: weatherData.current, hourly: weatherData.hourly, daily: weatherData.daily, timezone: weatherData.timezone, latitude: location.latitude, longitude: location.longitude}
  } catch (error) {
    console.log(error);
  }
}


