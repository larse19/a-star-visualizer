import React, { useState, useEffect } from "react";
import "./App.css";
import AStar from "./AStar";

function App() {
  const [size, setSize] = useState([10, 10]);
  const [start, setStart] = useState([0, 0]);
  const [goal, setGoal] = useState([0, 0]);

  const handleParametersButton = () => {
    let size = [
      parseInt(document.querySelector("#sizeX").value),
      parseInt(document.querySelector("#sizeY").value),
    ];
    let start = [
      parseInt(document.querySelector("#startX").value),
      parseInt(document.querySelector("#startY").value),
    ];
    let goal = [
      parseInt(document.querySelector("#goalX").value),
      parseInt(document.querySelector("#goalY").value),
    ];
    setSize(size);
    setStart(start);
    setGoal(goal);
  };

  return (
    <div className="screen">
      <div>
        <div>
          <label>Size (</label>
          <input
            id="sizeX"
            type="number"
            min="5"
            max="25"
            defaultValue={size[0]}
          ></input>
          <label>,</label>
          <input
            id="sizeY"
            type="number"
            min="5"
            max="25"
            defaultValue={size[1]}
          ></input>
          <label>)</label>
        </div>
        <div>
          <label>Start (</label>
          <input
            id="startX"
            type="number"
            min="0"
            max={size[0]}
            defaultValue={start[0]}
          ></input>
          <label>,</label>
          <input
            id="startY"
            type="number"
            min="0"
            max={size[1]}
            defaultValue={start[1]}
          ></input>
          <label>)</label>
        </div>
        <div>
          <label>Goal (</label>
          <input
            id="goalX"
            type="number"
            min="0"
            max={size[0]}
            defaultValue={goal[0]}
          ></input>
          <label>,</label>
          <input
            id="goalY"
            type="number"
            min="0"
            max={size[1]}
            defaultValue={goal[1]}
          ></input>
          <label>)</label>
        </div>
        <button onClick={handleParametersButton}>Start</button>
      </div>
      <AStar />
    </div>
  );
}

export default App;
