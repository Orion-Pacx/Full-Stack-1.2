function App() {
  const [text, setText] = React.useState("");
  const limit = 100;

  const handleChange = (e) => {
    if (e.target.value.length <= limit) {
      setText(e.target.value);
    }
  };

  const getBorderColor = () => {
    if (text.length === limit) return "#ff4d4f"; // red at limit
    if (text.length > limit * 0.7) return "#faad14"; // warning color
    return "#40a9ff"; // normal focus color
  };

  return (
    <div className="counter-container">
      <textarea
        rows="5"
        cols="40"
        placeholder="Type something amazing..."
        value={text}
        onChange={handleChange}
        style={{ borderColor: getBorderColor() }}
      ></textarea>
      <p className={`char-count ${text.length === limit ? "limit-reached" : ""}`}>
        {text.length} / {limit}
      </p>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${(text.length / limit) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

// Render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
