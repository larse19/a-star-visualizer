/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Map({ mapSize, finalPath, fringe, finalFringe }) {
  const [map, setMap] = useState([[]]);

  function createMap() {
    let tempMap = [];
    for (let y = 0; y < mapSize[1]; y++) {
      let subArr = [];
      for (let x = 0; x < mapSize[0]; x++) {
        subArr.push(null);
      }
      tempMap.push(subArr);
    }

    if (finalPath.length > 0) {
      console.log(finalPath);
      showFinalPath(tempMap);
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

  useEffect(() => {
    setMap(createMap());
  }, [mapSize, finalPath]);

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
                        <td className="goalState" key={uuidv4()}>{`(${
                          cell.state.x + 1
                        },${cell.state.y + 1})`}</td>
                      );
                    }
                    //Initialstate
                    if (
                      cell.state.x ===
                        finalPath[finalPath.length - 1].state.x &&
                      cell.state.y === finalPath[finalPath.length - 1].state.y
                    ) {
                      return (
                        <td className="initialState" key={uuidv4()}>{`(${
                          cell.state.x + 1
                        },${cell.state.y + 1})`}</td>
                      );
                    }
                    //Everything else
                    return (
                      <td key={uuidv4()}>{`(${cell.state.x + 1},${
                        cell.state.y + 1
                      })`}</td>
                    );
                  } else {
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
