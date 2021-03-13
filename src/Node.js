export default class Node {
  constructor(state, parent = null, depth = 0, goalState) {
    this.state = state;
    this.parentNode = parent;
    this.depth = depth;
    this.goalState = goalState;
  }

  path() {
    let currentNode = this;
    let path = [this];
    while (currentNode.parentNode) {
      currentNode = currentNode.parentNode;
      path.push(currentNode);
    }
    return path;
  }

  display() {
    return this.toString();
  }

  getH() {
    return (
      (Math.abs(this.state.x - this.goalState.x) +
        Math.abs(this.state.y - this.goalState.y)) *
      2
    );
  }

  getG() {
    if (!this.parentNode) return 0;
    return 1 + this.parentNode.getG();
  }

  getF() {
    return this.getH() + this.getG();
  }
}

Node.prototype.toString = function nodeToString() {
  return `State: ${this.state} - Depth ${
    this.depth
  } - H: ${this.getH()} - G: ${this.getG()}`;
};
