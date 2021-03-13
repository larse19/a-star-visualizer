export default class State {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

State.prototype.toString = function stateToString() {
  return `(${this.x}, ${this.y})`;
};
