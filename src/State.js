export default class State {
  constructor(x, y, wall = false) {
    this.x = x;
    this.y = y;
    this.wall = wall;
  }
}

State.prototype.toString = function stateToString() {
  return `(${this.x}, ${this.y})`;
};
