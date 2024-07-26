import { useState } from "react";
import './App.css';
import useIncrement from "./hooks/useIncrement";

function App() {
  const [count1, setCount1] = useIncrement(1);
  const [count2, setCount2] = useIncrement(2);

  return (
      <div className="App">
        <h1>Counter App</h1>
        <div>
          <p>Count: {count1}</p>
          <button onClick={setCount1}>Add 1</button>
        </div>
        <div>
          <p>Count: {count2}</p>
          <button onClick={setCount2}>Add 2</button>
        </div>
      </div>
  );
}

export default App;
