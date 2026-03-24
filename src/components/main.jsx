import SearchBar from "./search-bar";
import DailyForecastItem from "./DailyForecast";

const dailyData = {
  time: [
    new Date("2026-03-24"),
    new Date("2026-03-25"),
    new Date("2026-03-26"),
    new Date("2026-03-27"),
    new Date("2026-03-28"),
    new Date("2026-03-29"),
    new Date("2026-03-30"),
  ],
  weather_code: [3, 3, 1, 1, 2, 2, 2],
  temperature_2m_max: [29.7, 28.3, 29.4, 29.9, 28.3, 27.6, 28.0],
  temperature_2m_min: [27.8, 27.2, 27.1, 27.9, 26.6, 26.6, 26.9],
  daylight_duration: [43862.62, 43927.67, 43992.91, 44058.30, 44123.79, 44189.35, 44254.93],
  sunshine_duration: [42420.29, 41329.20, 41791.67, 43255.93, 43299.88, 43101.15, 43145.53],
  uv_index_max: [7.90, 7.95, 7.95, 7.95, 8.00, 7.75, 7.80],
  precipitation_sum: [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
  wind_speed_10m_max: [19.7, 15.9, 23.5, 16.3, 17.7, 18.3, 17.1],
  wind_gusts_10m_max: [27.4, 21.2, 31.3, 22.3, 24.1, 24.1, 24.5],
};

const forecastDays = dailyData.time.map((time, index) => ({
  time,
  weather_code: dailyData.weather_code[index],
  temperature_2m_max: dailyData.temperature_2m_max[index],
  temperature_2m_min: dailyData.temperature_2m_min[index],
  daylight_duration: dailyData.daylight_duration[index],
  sunshine_duration: dailyData.sunshine_duration[index],
  uv_index_max: dailyData.uv_index_max[index],
  precipitation_sum: dailyData.precipitation_sum[index],
  wind_speed_10m_max: dailyData.wind_speed_10m_max[index],
  wind_gusts_10m_max: dailyData.wind_gusts_10m_max[index],
}));

export default function Main() {
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

        .main-bottom {
          height: 300px;
          background: var(--background2);
          border-radius: 16px;
          padding: 20px;
          overflow-y: auto;
        }

        .main-section {
          flex: 1;
          background: var(--background2);
          border-radius: 16px;
          padding: 20px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 12px;
        }

        .section-content {
          color: var(--text);
          opacity: 0.7;
        }

        /* Daily Forecast Styles */
        .daily-forecast-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .daily-forecast-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 12px;
          background: var(--search-bg);
          border-radius: 12px;
          border: 1px solid var(--search-border);
        }

        .daily-forecast-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .daily-forecast-day {
          font-size: 15px;
          font-weight: 600;
          color: var(--text);
        }

        .daily-forecast-date {
          font-size: 13px;
          color: var(--search-placeholder);
        }

        .daily-forecast-icon {
          margin-left: auto;
          color: var(--text);
          display: flex;
          align-items: center;
        }

        .daily-forecast-data {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .daily-forecast-data-item {
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: help;
        }

        .daily-forecast-data-icon {
          color: var(--search-placeholder);
        }

        .daily-forecast-data-value {
          font-size: 12px;
          color: var(--text);
          opacity: 0.8;
        }

        .daily-forecast-data-item[title] {
          position: relative;
        }
      `}</style>

      <div className="main-top">
        <div className="main-section">
          <div className="section-title">Current Conditions</div>
          <div className="section-content">Current Conditions content</div>
        </div>
        <div className="main-section">
          <div className="section-title">Hourly Forecast</div>
          <div className="section-content">Hourly Forecast content</div>
        </div>
      </div>

      <div className="main-bottom">
        <div className="section-title">Daily Forecast</div>
        <div className="daily-forecast-container">
          {forecastDays.map((day, index) => (
            <DailyForecastItem key={index} data={day} />
          ))}
        </div>
      </div>
    </div>
  );
}