export default function weatherIcons(code, isDay, windSpeed) {
    if (windSpeed > 35) {
      return "windsock.svg"
    }

    if (code === 0) {
      return isDay ? "clear-day.svg" : "clear-night.svg"
    }

    if ([1, 2].includes(code)) {
      return isDay ? "partly-cloudy-day.svg" : "partly-cloudy-night.svg"
    }

    if (code === 3) {
      return "overcast.svg"
    }

    if ([45, 48].includes(code)) {
      return "fog.svg"
    }

    if ([51, 53, 55].includes(code)) {
      return "drizzle.svg"
    }

    if ([56, 57].includes(code)) {
      return "sleet.svg"
    }

    if ([61, 63, 65, 66, 67].includes(code)) {
      return "rain.svg"
    }

    if ([71, 73].includes(code)) {
      return "snow.svg"
    }

    if (code === 75) {
      return "exterme-snow.svg"
    }

    if (code === 77) {
      return "snowflake.svg"
    }

    if ([80, 81, 82, 85, 86].includes(code)) {
      return "overcast-rain.svg"
    }

    if ([95].includes(code)) {
      return "thunderstorms.svg"
    }

    if ([96, 99].includes(code)) {
      return "thunderstorms-extreme.svg"
    }

    return isDay ? "clear-day.svg" : "clear-night.svg"
  }