import Node from "./Node";
import State from "./State";
import React, { useState, useEffect } from "react";
import "./App.css";

export default function AStar() {
  const [map, setMap] = useState([[]]);
  const [mapSize, setMapSize] = useState([10, 10]);
  const [initialState, setInitialState] = useState([0, 0]);
  const [goalState, setGoalState] = useState([0, 0]);
  const [fringe, setFringe] = useState([]);
  const [finalPath, setFinalPath] = useState([]);

  function successor_fn(state) {
    let successors = [];
    if (state.x > 0) successors.push(new State(state.x - 1, state.y));
    if (state.y > 0) successors.push(new State(state.x, state.y - 1));
    if (state.x < mapSize[0]) successors.push(new State(state.x + 1, state.y));
    if (state.y < mapSize[0]) successors.push(new State(state.x, state.y + 1));
    return successors;
  }

  function insert(node, queue) {
    queue.push(node);
    return queue;
  }

  function insertAll(list, queue) {
    return queue.concat(list);
  }

  function expand(node) {
    let successors = [];
    let children = successor_fn(node.state);
    for (let child of children) {
      let s = new Node(node);
      s.state = child;
      s.parentNode = node;
      s.depth = node.depth + 1;
      s.goalState = goalState;
      successors = insert(s, successors);
    }
    return successors;
  }

  function aStarNode(queue) {
    let lowest = queue[0];
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].getF() < lowest.getF()) {
        lowest = queue[i];
        let array = [...queue];
        array.splice(i, 1);
        setFringe(array);
      }
    }
    return lowest;
  }

  function aStarSearch() {
    let initialNode = new Node(initialState);
    initialNode.goalState = goalState;
    setFringe([initialNode]);
    while (fringe) {
      let node = aStarNode(fringe);
      if (node.state.x === goalState.x && node.state.y === goalState.y) {
        return node.path();
      }
      let children = expand(node);
      setFringe((current) => [...current, ...children]);
    }
  }

  function runAStar() {
    [mapSize[0], mapSize[1]] = mapSize;
    setInitialState(new State(initialState[0], initialState[1]));
    setGoalState(new State(goalState[0], goalState[1]));
    setFinalPath(aStarSearch());
  }

  function createMap() {
    let tempMap = [];
    for (let y = 0; y < mapSize[1]; y++) {
      let subArr = [];
      for (let x = 0; x < mapSize[0]; x++) {
        subArr.push(null);
      }
      tempMap.push(subArr);
    }
    for (let node of finalPath) {
      tempMap[node.state.y][node.state.x] = node;
    }
    setMap(tempMap);
  }

  useEffect(() => {
    runAStar();
  }, [mapSize, initialState, goalState]);

  useEffect(() => {
    createMap();
  }, [finalPath]);

  return (
    <div>
      <table>
        <tbody>
          {map.map((row) => (
            <tr key={map.indexOf(row)}>
              {row.map((cell) =>
                cell ? (
                  <td
                    key={`${row.indexOf(cell)},${map.indexOf(row)}`}
                    onClick={() =>
                      console.log(`${row.indexOf(cell)},${map.indexOf(row)}`)
                    }
                  >
                    x
                  </td>
                ) : (
                  <td></td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
