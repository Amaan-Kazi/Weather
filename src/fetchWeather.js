import { fetchWeatherApi } from "openmeteo";

export default async function fetchWeather(latitude, longitude) {
  const params = {
    latitude: latitude,
    longitude: longitude,

    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "surface_pressure",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ],

    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "dewpoint_2m",
      "apparent_temperature",
      "precipitation_probability",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "snow_depth",
      "weather_code",
      "cloud_cover",
      "cloud_cover_low",
      "cloud_cover_mid",
      "cloud_cover_high",
      "visibility",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ],

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "apparent_temperature_max",
      "apparent_temperature_min",
      "daylight_duration",
      "sunshine_duration",
      "uv_index_max",
      "precipitation_sum",
      "rain_sum",
      "showers_sum",
      "snowfall_sum",
      "precipitation_hours",
      "wind_speed_10m_max",
      "wind_gusts_10m_max",
      "wind_direction_10m_dominant",
    ],

    timezone: "auto",
    forecast_days: 7,
  };

  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  const response = responses[0];

  const latitudeRes = response.latitude();
  const longitudeRes = response.longitude();
  const elevation = response.elevation();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log("\n=== LOCATION INFO ===");
  console.log(`Coordinates: ${latitudeRes}°N ${longitudeRes}°E`);
  console.log(`Elevation: ${elevation}m`);
  console.log(`Timezone: ${timezone} (${timezoneAbbreviation})`);

  const current = response.current();
  const hourly = response.hourly();
  const daily = response.daily();

  const weatherData = {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0).value(),
      relative_humidity_2m: current.variables(1).value(),
      apparent_temperature: current.variables(2).value(),
      is_day: current.variables(3).value(),
      precipitation: current.variables(4).value(),
      rain: current.variables(5).value(),
      showers: current.variables(6).value(),
      snowfall: current.variables(7).value(),
      weather_code: current.variables(8).value(),
      cloud_cover: current.variables(9).value(),
      pressure_msl: current.variables(10).value(),
      surface_pressure: current.variables(11).value(),
      wind_speed_10m: current.variables(12).value(),
      wind_direction_10m: current.variables(13).value(),
      wind_gusts_10m: current.variables(14).value(),
    },
    hourly: {
      time: Array.from(
        { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() },
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature_2m: hourly.variables(0).valuesArray(),
      relative_humidity_2m: hourly.variables(1).valuesArray(),
      dewpoint_2m: hourly.variables(2).valuesArray(),
      apparent_temperature: hourly.variables(3).valuesArray(),
      precipitation_probability: hourly.variables(4).valuesArray(),
      precipitation: hourly.variables(5).valuesArray(),
      rain: hourly.variables(6).valuesArray(),
      showers: hourly.variables(7).valuesArray(),
      snowfall: hourly.variables(8).valuesArray(),
      snow_depth: hourly.variables(9).valuesArray(),
      weather_code: hourly.variables(10).valuesArray(),
      cloud_cover: hourly.variables(11).valuesArray(),
      cloud_cover_low: hourly.variables(12).valuesArray(),
      cloud_cover_mid: hourly.variables(13).valuesArray(),
      cloud_cover_high: hourly.variables(14).valuesArray(),
      visibility: hourly.variables(15).valuesArray(),
      wind_speed_10m: hourly.variables(16).valuesArray(),
      wind_direction_10m: hourly.variables(17).valuesArray(),
      wind_gusts_10m: hourly.variables(18).valuesArray(),
    },
  };

  if (daily) {
    const dailyLength = daily.variables(0).valuesArray().length;
    weatherData.daily = {
      time: Array.from(
        { length: dailyLength },
        (_, i) => new Date((Number(daily.time()) + i * 86400 + utcOffsetSeconds) * 1000)
      ),
      weather_code: daily.variables(0).valuesArray(),
      temperature_2m_max: daily.variables(1).valuesArray(),
      temperature_2m_min: daily.variables(2).valuesArray(),
      apparent_temperature_max: daily.variables(3).valuesArray(),
      apparent_temperature_min: daily.variables(4).valuesArray(),
      daylight_duration: daily.variables(5).valuesArray(),
      sunshine_duration: daily.variables(6).valuesArray(),
      uv_index_max: daily.variables(7).valuesArray(),
      precipitation_sum: daily.variables(8).valuesArray(),
      rain_sum: daily.variables(9).valuesArray(),
      showers_sum: daily.variables(10).valuesArray(),
      snowfall_sum: daily.variables(11).valuesArray(),
      precipitation_hours: daily.variables(12).valuesArray(),
      wind_speed_10m_max: daily.variables(13).valuesArray(),
      wind_gusts_10m_max: daily.variables(14).valuesArray(),
      wind_direction_10m_dominant: daily.variables(15).valuesArray(),
    };
  }

  console.log("\n=== CURRENT CONDITIONS ===");
  console.log(`Time: ${weatherData.current.time}`);
  console.log(`Temperature: ${weatherData.current.temperature_2m}°C`);
  console.log(`Feels Like (Apparent): ${weatherData.current.apparent_temperature}°C`);
  console.log(`Relative Humidity: ${weatherData.current.relative_humidity_2m}%`);
  console.log(`Is Day: ${weatherData.current.is_day ? "Yes" : "No"}`);
  console.log(`Precipitation: ${weatherData.current.precipitation} mm`);
  console.log(`Rain: ${weatherData.current.rain} mm`);
  console.log(`Showers: ${weatherData.current.showers} mm`);
  console.log(`Snowfall: ${weatherData.current.snowfall} cm`);
  console.log(`Weather Code: ${weatherData.current.weather_code}`);
  console.log(`Cloud Cover: ${weatherData.current.cloud_cover}%`);
  console.log(`Sea Level Pressure: ${weatherData.current.pressure_msl} hPa`);
  console.log(`Surface Pressure: ${weatherData.current.surface_pressure} hPa`);
  console.log(`Wind Speed: ${weatherData.current.wind_speed_10m} km/h`);
  console.log(`Wind Direction: ${weatherData.current.wind_direction_10m}°`);
  console.log(`Wind Gusts: ${weatherData.current.wind_gusts_10m} km/h`);

  console.log("\n=== HOURLY FORECAST (Next 24 hours) ===");
  for (let i = 0; i < Math.min(24, weatherData.hourly.time.length); i++) {
    console.log(`${weatherData.hourly.time[i]}: ${weatherData.hourly.temperature_2m[i]}°C, ${weatherData.hourly.weather_code[i]}, Humidity: ${weatherData.hourly.relative_humidity_2m[i]}%`);
  }

  if (weatherData.daily) {
    console.log("\n=== DAILY FORECAST (7 days) ===");
    for (let i = 0; i < weatherData.daily.time.length; i++) {
      const daylightHours = (weatherData.daily.daylight_duration[i] / 3600).toFixed(1);
      const sunshineHours = (weatherData.daily.sunshine_duration[i] / 3600).toFixed(1);
      console.log(`${weatherData.daily.time[i].toDateString()}: High ${weatherData.daily.temperature_2m_max[i]}°C, Low ${weatherData.daily.temperature_2m_min[i]}°C, Code: ${weatherData.daily.weather_code[i]}`);
      console.log(`  Daylight: ${daylightHours}h, Sunshine: ${sunshineHours}h`);
      console.log(`  UV Index: ${weatherData.daily.uv_index_max[i]}`);
      console.log(`  Precipitation: ${weatherData.daily.precipitation_sum[i]} mm`);
      console.log(`  Wind: ${weatherData.daily.wind_speed_10m_max[i]} km/h, Gusts: ${weatherData.daily.wind_gusts_10m_max[i]} km/h`);
    }
  }

  return weatherData;
}