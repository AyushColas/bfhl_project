import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("{\"data\":[\"A\",\"1\",\"B\",\"2\"]}");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post("https://bfhl-project-1gn0.onrender.com", parsedInput);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or server error");
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>BFHL API Frontend</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <>
          <h3>Select Data to View</h3>
          <label>
            <input type="checkbox" onChange={() => handleOptionChange("alphabets")} /> Alphabets
          </label>
          <label>
            <input type="checkbox" onChange={() => handleOptionChange("numbers")} /> Numbers
          </label>
          <label>
            <input type="checkbox" onChange={() => handleOptionChange("highest_alphabet")} /> Highest Alphabet
          </label>
          <h3>Response Data:</h3>
          <pre>{
            JSON.stringify(
              Object.fromEntries(
                Object.entries(response).filter(([key]) => selectedOptions.includes(key))
              ),
              null,
              2
            )
          }</pre>
        </>
      )}
    </div>
  );
};

export default App;
