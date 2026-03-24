import WeatherIcon from "./WeatherIcon";
import { Thermometer, Droplets } from "lucide-react";

const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
};

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", { day: "numeric", month: "long" });
};

export default function HourlyForecastItem({ data }) {
  const date = new Date(data.time);

  return (
    <div className="hourly-forecast-item">
      <div className="hourly-forecast-icon">
        <WeatherIcon code={data.weather_code} size={24} />
      </div>
      <div className="hourly-forecast-datetime">
        <div className="hourly-forecast-time">{formatTime(date)}</div>
        <div className="hourly-forecast-date">{formatDate(date)}</div>
      </div>
      <div className="hourly-forecast-data">
        <div className="hourly-forecast-data-item">
          <Thermometer size={14} className="hourly-forecast-data-icon" />
          <span>Temperature:</span>
          <span className="hourly-forecast-data-value">{data.temperature_2m.toFixed(1)}°C</span>
        </div>
        <div className="hourly-forecast-data-item">
          <Droplets size={14} className="hourly-forecast-data-icon" />
          <span>Humidity:</span>
          <span className="hourly-forecast-data-value">{data.relative_humidity_2m}%</span>
        </div>
      </div>
    </div>
  );
}