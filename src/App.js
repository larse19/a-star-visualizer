import React, { useState } from "react";
import "./App.css";
import AStar from "./AStar";
import State from "./State";

function App() {
  const [size, setSize] = useState([10, 10]);
  const [start, setStart] = useState(new State(0, 0));
  const [goal, setGoal] = useState(new State(9, 9));

  function updateSizeX(x) {
    setSize((currentSize) => [x.target.value, currentSize[1]]);
  }

  function updateSizeY(y) {
    setSize((currentSize) => [currentSize[0], y.target.value]);
  }

  const handleParametersButton = () => {
    let start = [
      parseInt(document.querySelector("#startX").value),
      parseInt(document.querySelector("#startY").value),
    ];
    let goal = [
      parseInt(document.querySelector("#goalX").value),
      parseInt(document.querySelector("#goalY").value),
    ];
    setStart(new State(start[0], start[1]));
    setGoal(new State(goal[0], goal[1]));
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
            max="50"
            defaultValue={size[0]}
            onChange={updateSizeX}
          ></input>
          <label>,</label>
          <input
            id="sizeY"
            type="number"
            min="5"
            max="50"
            defaultValue={size[1]}
            onChange={updateSizeY}
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
            defaultValue={start.x}
          ></input>
          <label>,</label>
          <input
            id="startY"
            type="number"
            min="0"
            max={size[1]}
            defaultValue={start.y}
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
            defaultValue={goal.x}
          ></input>
          <label>,</label>
          <input
            id="goalY"
            type="number"
            min="0"
            max={size[1]}
            defaultValue={goal.y}
          ></input>
          <label>)</label>
        </div>
        <button onClick={handleParametersButton}>Start</button>
      </div>
      <AStar mapSize={size} goalState={goal} initialState={start} />
    </div>
  );
}

export default App;
