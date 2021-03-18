import React, { useState } from "react";
import "./App.css";
import AStar from "./AStar";
import State from "./State";

function App() {
  const [size, setSize] = useState([25, 10]);
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
    setStart(new State(start[0] - 1, start[1] - 1));
    setGoal(new State(goal[0] - 1, goal[1] - 1));
  };

  return (
    <div className="screen">
      <div>
        <div>
          Size (
          <input
            id="sizeX"
            type="number"
            min="5"
            max="50"
            defaultValue={size[0]}
            onChange={updateSizeX}
          ></input>
          ,
          <input
            id="sizeY"
            type="number"
            min="5"
            max="50"
            defaultValue={size[1]}
            onChange={updateSizeY}
          ></input>
          )
        </div>
        <div>
          Start (
          <input
            id="startX"
            type="number"
            min="1"
            max={size[0] + 1}
            defaultValue={start.x + 1}
          ></input>
          ,
          <input
            id="startY"
            type="number"
            min="1"
            max={size[1] + 1}
            defaultValue={start.y + 1}
          ></input>
          )
          <input
            id="startRadio"
            type="radio"
            value="start"
            name="setPoint"
          ></input>
        </div>
        <div>
          Goal (
          <input
            id="goalX"
            type="number"
            min="1"
            max={size[0] + 1}
            defaultValue={goal.x + 1}
          ></input>
          ,
          <input
            id="goalY"
            type="number"
            min="1"
            max={size[1] + 1}
            defaultValue={goal.y + 1}
          ></input>
          )
          <input
            id="goalRadio"
            type="radio"
            value="goal"
            name="setPoint"
          ></input>
        </div>
        <div>
          <label>Set wall</label>
          <input type="radio" id="wallRadio" name="setPoint"></input>
        </div>
        <button onClick={handleParametersButton}>Start</button>
      </div>
      <AStar mapSize={size} goalState={goal} initialState={start} />
    </div>
  );
}

export default App;
