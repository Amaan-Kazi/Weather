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

export default function WeatherIcon({ code, size = 24, strokeWidth = 1.5 }) {
  const { icon: Icon, label } = weatherCodeToIcon(code);
  return <Icon size={size} strokeWidth={strokeWidth} title={label} />;
}