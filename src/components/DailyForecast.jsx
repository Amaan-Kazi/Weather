import { useState } from "react";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  Snowflake,
  CloudLightning,
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

function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && <div className="tooltip-content">{text}</div>}
    </div>
  );
}

const dataGroups = [
  {
    title: "Temperature",
    color: "var(--extra1)",
    items: [
      { key: "temperature_2m_max", label: "High", unit: "°C", convert: (v) => v.toFixed(1), tooltip: "Maximum temperature for the day" },
      { key: "temperature_2m_min", label: "Low", unit: "°C", convert: (v) => v.toFixed(1), tooltip: "Minimum temperature for the day" },
    ],
  },
  {
    title: "Sun",
    color: "var(--extra3)",
    items: [
      { key: "daylight_duration", label: "Daylight", unit: "h", convert: (v) => (v / 3600).toFixed(1), tooltip: "Total hours of daylight" },
      { key: "sunshine_duration", label: "Sunshine", unit: "h", convert: (v) => (v / 3600).toFixed(1), tooltip: "Total hours of sunshine" },
    ],
  },
  {
    title: "UV Index",
    color: "var(--extra2)",
    items: [
      { key: "uv_index_max", label: "UV", unit: "", convert: (v) => v.toFixed(1), tooltip: "Maximum UV index for the day" },
    ],
  },
  {
    title: "Precipitation",
    color: "var(--extra1)",
    items: [
      { key: "precipitation_sum", label: "Precip", unit: "mm", convert: (v) => v.toFixed(1), tooltip: "Total expected precipitation" },
    ],
  },
  {
    title: "Wind",
    color: "var(--text)",
    items: [
      { key: "wind_speed_10m_max", label: "Speed", unit: "km/h", convert: (v) => v.toFixed(1), tooltip: "Maximum wind speed" },
      { key: "wind_gusts_10m_max", label: "Gusts", unit: "km/h", convert: (v) => v.toFixed(1), tooltip: "Maximum wind gusts" },
    ],
  },
];

export default function DailyForecastItem({ data }) {
  const dayDate = new Date(data.time);
  const weatherIcon = weatherCodeToIcon(data.weather_code);
  const WeatherIconComponent = weatherIcon.icon;

  return (
    <div className="daily-forecast-item">
      <div className="daily-forecast-day">{formatDay(dayDate)}</div>
      <div className="daily-forecast-date">{formatDate(dayDate)}</div>
      <div className="daily-forecast-icon" title={weatherIcon.label}>
        <WeatherIconComponent size={32} strokeWidth={1.5} />
      </div>
      <div className="daily-forecast-groups">
        {dataGroups.map((group) => (
          <div key={group.title} className="daily-forecast-group">
            <div className="daily-forecast-group-title" style={{ color: group.color }}>
              {group.title}
            </div>
            {group.items.map((item) => (
              <Tooltip key={item.key} text={item.tooltip}>
                <div className="daily-forecast-group-item">
                  <span className="daily-forecast-group-label">{item.label}:</span>
                  <span className="daily-forecast-group-value">
                    {item.convert(data[item.key])} {item.unit}
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
