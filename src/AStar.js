/* eslint-disable react-hooks/exhaustive-deps */
import Node from "./Node";
import State from "./State";
import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "./Map";

export default function AStar({ initialState, goalState, mapSize }) {
  const [fringe, setFringe] = useState([]);
  const [finalPath, setFinalPath] = useState([]);
  const [finalFringe, setFinalFringe] = useState([]);

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

  function initializeFringe() {
    let initialNode = new Node(initialState);
    initialNode.goalState = goalState;
    setFringe([initialNode]);
  }

  //A star search algorithm
  useEffect(() => {
    if (fringe.length >= 1) {
      let node = aStarNode(fringe);
      if (node.state.x === goalState.x && node.state.y === goalState.y) {
        setFinalPath(node.path());
        setFinalFringe(fringe);
        setFringe([]);
      } else {
        let children = expand(node);
        setFringe((current) => [...current, ...children]);
      }
    }
  }, [fringe]);

  /*
  function aStarSearch() {
    while (fringe) {
      let node = aStarNode(fringe);
      console.log(node);
      if (node.state.x === goalState.x && node.state.y === goalState.y) {
        setFinalPath(node.path());
      }
      let children = expand(node);
      setFringe((current) => [...current, ...children]);
    }
  }
*/
  function runAStar() {
    initializeFringe();
  }

  useEffect(() => {
    runAStar();
  }, [initialState, goalState]);

  return (
    <div>
      <Map
        mapSize={mapSize}
        finalPath={finalPath}
        fringe={fringe}
        finalFringe={finalFringe}
      />
    </div>
  );
}
