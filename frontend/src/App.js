import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.text())
      .then(setMessage)
      .catch(() => setMessage("Could not reach backend"));
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Git Practice App</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
