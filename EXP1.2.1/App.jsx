function App() {
  const [text, setText] = React.useState("");
  const limit = 100;

  const handleChange = (e) => {
    if (e.target.value.length <= limit) {
      setText(e.target.value);
    }
  };

  return (
    <div className="container">
      <textarea
        rows="5"
        cols="40"
        placeholder="Type here..."
        value={text}
        onChange={handleChange}
      ></textarea>
      <p className={text.length === limit ? "limit-reached" : ""}>
        {text.length} / {limit}
      </p>
    </div>
  );
}

// Render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
