import logo from './logo.svg';
import './App.css';
import React from "react";


function App() {

    const tick = () => {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
    }
    return (
        setInterval(tick, 1000)
    );
}

export default App;
