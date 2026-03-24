import DailyForecastItem from "./DailyForecast";
import HourlyForecastItem from "./HourlyForecast";

export default function Main({ weatherData }) {
  const forecastDays = weatherData?.daily 
    ? weatherData.daily.time.map((time, index) => ({
        time,
        weather_code: weatherData.daily.weather_code[index],
        temperature_2m_max: weatherData.daily.temperature_2m_max[index],
        temperature_2m_min: weatherData.daily.temperature_2m_min[index],
        daylight_duration: weatherData.daily.daylight_duration[index],
        sunshine_duration: weatherData.daily.sunshine_duration[index],
        uv_index_max: weatherData.daily.uv_index_max[index],
        precipitation_sum: weatherData.daily.precipitation_sum[index],
        wind_speed_10m_max: weatherData.daily.wind_speed_10m_max[index],
        wind_gusts_10m_max: weatherData.daily.wind_gusts_10m_max[index],
      }))
    : [];

  const forecastHours = weatherData?.hourly
    ? weatherData.hourly.time.slice(0, 24).map((time, index) => ({
        time,
        weather_code: weatherData.hourly.weather_code[index],
        temperature_2m: weatherData.hourly.temperature_2m[index],
        relative_humidity_2m: weatherData.hourly.relative_humidity_2m[index],
      }))
    : [];

  return (
    <div className="main-layout">
      <style>{`
        .main-layout {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 20px;
          gap: 20px;
          overflow: hidden;
        }

        .main-top {
          display: flex;
          flex: 1;
          gap: 20px;
          min-height: 0;
        }

        .main-section {
          flex: 1;
          background: var(--background2);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          min-height: 0;
        }

        .main-section-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 12px;
          flex-shrink: 0;
        }

        .main-section-content {
          flex: 1;
          overflow-y: auto;
          min-height: 0;
        }

        .main-bottom {
          background: var(--background2);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .main-bottom-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 12px;
          flex-shrink: 0;
        }

        .main-bottom-content {
          flex: 1;
          overflow-x: auto;
          overflow-y: hidden;
          min-height: 0;
        }

        /* Daily Forecast Styles */
        .daily-forecast-container {
          display: flex;
          gap: 12px;
          min-width: min-content;
        }

        .daily-forecast-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 14px 16px;
          background: var(--search-bg);
          border-radius: 14px;
          border: 1px solid var(--search-border);
          flex: 1;
          min-width: 150px;
          max-width: 180px;
        }

        .daily-forecast-header-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .daily-forecast-icon {
          color: var(--text);
          flex-shrink: 0;
          padding-top: 2px;
        }

        .daily-forecast-day-date {
          display: flex;
          flex-direction: column;
        }

        .daily-forecast-day {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          line-height: 1.2;
        }

        .daily-forecast-date {
          font-size: 12px;
          color: var(--search-placeholder);
          line-height: 1.2;
        }

        .daily-forecast-groups {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }

        .daily-forecast-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .daily-forecast-group.inline {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 8px;
        }

        .daily-forecast-group-title {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .daily-forecast-group.inline .daily-forecast-group-title {
          margin-bottom: 0;
          flex-shrink: 0;
        }

        .daily-forecast-group-item {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          cursor: help;
        }

        .daily-forecast-group.inline .daily-forecast-group-item {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 4px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .daily-forecast-group-label {
          color: var(--search-placeholder);
        }

        .daily-forecast-group-value {
          color: var(--text);
          font-weight: 500;
        }

        .daily-forecast-group-value.inline {
          font-weight: 600;
          white-space: nowrap;
        }

        /* Hourly Forecast Styles */
        .hourly-forecast-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hourly-forecast-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: var(--search-bg);
          border-radius: 12px;
          border: 1px solid var(--search-border);
        }

        .hourly-forecast-icon {
          color: var(--text);
          flex-shrink: 0;
        }

        .hourly-forecast-datetime {
          display: flex;
          flex-direction: column;
          min-width: 80px;
        }

        .hourly-forecast-time {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
        }

        .hourly-forecast-date {
          font-size: 12px;
          color: var(--search-placeholder);
        }

        .hourly-forecast-data {
          display: flex;
          gap: 20px;
          margin-left: auto;
        }

        .hourly-forecast-data-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--search-placeholder);
        }

        .hourly-forecast-data-icon {
          color: var(--extra1);
        }

        .hourly-forecast-data-value {
          color: var(--text);
          font-weight: 500;
        }

        /* Tooltip Styles */
        .tooltip-wrapper {
          position: relative;
          display: inline-block;
        }

        .tooltip-content {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--text);
          color: var(--background);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 11px;
          white-space: nowrap;
          z-index: 1000;
          margin-bottom: 6px;
          pointer-events: none;
        }

        .tooltip-content::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: var(--text);
        }

        .empty-state {
          color: var(--search-placeholder);
          font-size: 14px;
          text-align: center;
          padding: 20px;
        }
      `}</style>

      <div className="main-top">
        <div className="main-section">
          <div className="main-section-title">Current Conditions</div>
          <div className="main-section-content">
            {weatherData?.current ? (
              <div>Current: {weatherData.current.temperature_2m}°C</div>
            ) : (
              <div className="empty-state">Select a location to see current conditions</div>
            )}
          </div>
        </div>
        <div className="main-section">
          <div className="main-section-title">Hourly Forecast</div>
          <div className="main-section-content">
            {forecastHours.length > 0 ? (
              <div className="hourly-forecast-list">
                {forecastHours.map((hour, index) => (
                  <HourlyForecastItem key={index} data={hour} />
                ))}
              </div>
            ) : (
              <div className="empty-state">Select a location to see hourly forecast</div>
            )}
          </div>
        </div>
      </div>

      <div className="main-bottom">
        <div className="main-bottom-title">Daily Forecast</div>
        <div className="main-bottom-content">
          {forecastDays.length > 0 ? (
            <div className="daily-forecast-container">
              {forecastDays.map((day, index) => (
                <DailyForecastItem key={index} data={day} />
              ))}
            </div>
          ) : (
            <div className="empty-state">Select a location to see the weather forecast</div>
          )}
        </div>
      </div>
    </div>
  );
}