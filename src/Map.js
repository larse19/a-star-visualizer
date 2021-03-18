/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import State from "./State";

export default function Map({
  map,
  setMap,
  mapSize,
  finalPath,
  fringe,
  finalFringe,
}) {
  const [walls, setWalls] = useState([]);

  function createMap() {
    let tempMap = [];
    for (let y = 0; y < mapSize[1]; y++) {
      let subArr = [];
      for (let x = 0; x < mapSize[0]; x++) {
        subArr.push(null);
      }
      tempMap.push(subArr);
    }

    //Final path
    if (finalPath.length > 0) {
      showFinalPath(tempMap);
    }
    //walls
    for (let wall of walls) {
      tempMap[wall.y][wall.x] = wall;
    }

    return tempMap;
  }

  function showFinalPath(tempMap) {
    for (let node of finalPath) {
      tempMap[node.state.y][node.state.x] = node;
    }
  }

  function showFinalFringe(tempMap) {
    for (let node of finalFringe) {
      tempMap[node.state.y][node.state.x] = "x";
    }
    setMap(tempMap);
  }

  function handleSetCellFunction(x, y) {
    if (document.querySelector("#startRadio").checked) {
      document.querySelector("#startX").value = x;
      document.querySelector("#startY").value = y;
      getCellFromCoords(x, y).style.backgroundColor = "lightgreen";
    } else if (document.querySelector("#goalRadio").checked) {
      document.querySelector("#goalX").value = x;
      document.querySelector("#goalY").value = y;
      getCellFromCoords(x, y).style.backgroundColor = "pink";
    } else if (document.querySelector("#wallRadio").checked) {
      if (map[y - 1]?.[x - 1]?.wall) {
        let temp = [...walls];
        for (let i = 0; i < temp.length; i++) {
          if (temp[i].x === x - 1 && temp[i].y === y - 1) {
            temp.splice(i, 1);
          }
        }
        setWalls(temp);
      } else {
        setWalls((current) => [...current, new State(x - 1, y - 1, true)]);
      }
    }
  }

  function getCellFromCoords(x, y) {
    let table = document.getElementsByTagName("table")[0];
    let cells = table.getElementsByTagName("td");

    for (let cell of cells) {
      let cellIndex = cell.cellIndex + 1;
      let rowIndex = cell.parentNode.rowIndex + 1;
      if (cellIndex === x && rowIndex === y) {
        return cell;
      }
    }
  }

  useEffect(() => {
    let table = document.getElementsByTagName("table")[0];
    let cells = table.getElementsByTagName("td");

    for (let i = 0; i < cells.length; i++) {
      // Cell Object
      let cell = cells[i];
      // Track with onclick
      cell.onclick = function () {
        let cellIndex = this.cellIndex + 1;

        let rowIndex = this.parentNode.rowIndex + 1;

        handleSetCellFunction(cellIndex, rowIndex);
      };
    }
  }, [map]);

  useEffect(() => {
    setMap(createMap());
  }, [mapSize, finalPath, walls]);

  return (
    <div>
      <table>
        <tbody>
          {map.map((row) => {
            return (
              <tr key={uuidv4()}>
                {row.map((cell) => {
                  if (cell?.state) {
                    //Goalstate
                    if (
                      cell.state.x === cell.goalState.x &&
                      cell.state.y === cell.goalState.y
                    ) {
                      return (
                        <td
                          className="goalState"
                          key={uuidv4()}
                        >{`(${cell.state.x},${cell.state.y})`}</td>
                      );
                    }
                    //Initialstate
                    if (
                      cell.state.x ===
                        finalPath[finalPath.length - 1].state.x &&
                      cell.state.y === finalPath[finalPath.length - 1].state.y
                    ) {
                      return (
                        <td
                          className="initialState"
                          key={uuidv4()}
                        >{`(${cell.state.x},${cell.state.y})`}</td>
                      );
                    }

                    //Everything else
                    return (
                      <td
                        key={uuidv4()}
                      >{`(${cell.state.x},${cell.state.y})`}</td>
                    );
                  } else if (cell?.wall) {
                    return <td className="wall" key={uuidv4()}></td>;
                  }
                  //Not a Node
                  else {
                    return <td key={uuidv4()}></td>;
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
