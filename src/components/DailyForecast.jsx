import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
  Thermometer,
  Sunrise,
  Sunset,
  SunMedium,
  Droplets,
  Wind,
  Gauge,
} from "lucide-react";

const weatherCodeToIcon = (code) => {
  switch (code) {
    case 0:
      return { icon: Sun, label: "Clear sky" };
    case 1:
      return { icon: CloudSun, label: "Mainly clear" };
    case 2:
      return { icon: CloudSun, label: "Partly cloudy" };
    case 3:
      return { icon: Cloud, label: "Overcast" };
    case 45:
    case 48:
      return { icon: CloudFog, label: "Fog" };
    case 51:
    case 53:
    case 55:
      return { icon: CloudDrizzle, label: "Drizzle" };
    case 56:
    case 57:
      return { icon: CloudDrizzle, label: "Freezing drizzle" };
    case 61:
    case 63:
    case 65:
      return { icon: CloudRain, label: "Rain" };
    case 66:
    case 67:
      return { icon: CloudRain, label: "Freezing rain" };
    case 71:
    case 73:
    case 75:
      return { icon: Snowflake, label: "Snowfall" };
    case 77:
      return { icon: Snowflake, label: "Snow grains" };
    case 80:
    case 81:
    case 82:
      return { icon: CloudRain, label: "Rain showers" };
    case 85:
    case 86:
      return { icon: Snowflake, label: "Snow showers" };
    case 95:
      return { icon: CloudLightning, label: "Thunderstorm" };
    case 96:
    case 99:
      return { icon: CloudLightning, label: "Thunderstorm with hail" };
    default:
      return { icon: Cloud, label: "Unknown" };
  }
};

const formatDate = (date) => {
  const options = { day: "numeric", month: "long" };
  return date.toLocaleDateString("en-US", options);
};

const formatDay = (date) => {
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const dataFields = [
  { key: "temperature_2m_max", label: "High", unit: "°C", icon: Thermometer, tooltip: "Maximum temperature" },
  { key: "temperature_2m_min", label: "Low", unit: "°C", icon: Thermometer, tooltip: "Minimum temperature" },
  { key: "daylight_duration", label: "Daylight", unit: "h", icon: Sunrise, tooltip: "Total daylight hours", convert: (v) => (v / 3600).toFixed(1) },
  { key: "sunshine_duration", label: "Sunshine", unit: "h", icon: SunMedium, tooltip: "Total sunshine hours", convert: (v) => (v / 3600).toFixed(1) },
  { key: "uv_index_max", label: "UV Index", unit: "", icon: Sun, tooltip: "Maximum UV index", convert: (v) => v.toFixed(1) },
  { key: "precipitation_sum", label: "Precipitation", unit: "mm", icon: Droplets, tooltip: "Total precipitation" },
  { key: "wind_speed_10m_max", label: "Wind", unit: "km/h", icon: Wind, tooltip: "Maximum wind speed" },
  { key: "wind_gusts_10m_max", label: "Gusts", unit: "km/h", icon: Wind, tooltip: "Maximum wind gusts" },
];

export default function DailyForecastItem({ data }) {
  const dayDate = new Date(data.time);
  const weatherIcon = weatherCodeToIcon(data.weather_code);
  const WeatherIconComponent = weatherIcon.icon;

  return (
    <div className="daily-forecast-item">
      <div className="daily-forecast-header">
        <div className="daily-forecast-day">{formatDay(dayDate)}</div>
        <div className="daily-forecast-date">{formatDate(dayDate)}</div>
        <div className="daily-forecast-icon" title={weatherIcon.label}>
          <WeatherIconComponent size={28} />
        </div>
      </div>
      <div className="daily-forecast-data">
        {dataFields.map((field) => (
          <div key={field.key} className="daily-forecast-data-item" title={field.tooltip}>
            <field.icon size={14} className="daily-forecast-data-icon" />
            <span className="daily-forecast-data-value">
              {field.convert ? field.convert(data[field.key]) : data[field.key]} {field.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
