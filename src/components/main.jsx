import SearchBar from "./search-bar";

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
        <div className="section-content">Daily Forecast content</div>
      </div>
    </div>
  );
}