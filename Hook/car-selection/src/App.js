import { useState, useEffect } from "react";
import './App.css';

let carList = ["Roll roy", "BMW", "Mercedes", "Ferrari", "Vios", "Civic"];
let colorList = ["Black", "Blue", "Green", "Yellow", "Red", "White"];

function App() {
  const [selectedCar, setSelectedCar] = useState({
    car: carList[0],
    color: colorList[0]
  });

  const handleSelectCar = (event) => {
    const selectedCarValue = event.target.value;
    setSelectedCar(prevState => {
      return { ...prevState, car: selectedCarValue };
    });
  }

  const handleSelectColor = (event) => {
    const selectedColorValue = event.target.value;
    setSelectedCar(prevState => {
      return { ...prevState, color: selectedColorValue };
    });
  }
  return (
      <div>
        <h1>Car and Color Selector</h1>
        <div>
          <label>Choose a car:</label>
          <select value={selectedCar.car} onChange={handleSelectCar}>
            {carList.map((car, index) => (
                <option key={index} value={car}>{car}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Choose a color:</label>
          <select value={selectedCar.color} onChange={handleSelectColor}>
            {colorList.map((color, index) => (
                <option key={index} value={color}>{color}</option>
            ))}
          </select>
        </div>
        <div>
          <p>You Selected a {selectedCar.color} - {selectedCar.car}</p>
        </div>
      </div>
  );
}

export default App;
