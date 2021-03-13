class Node {
  constructor(state, parent = null, depth = 0) {
    this.state = state;
    this.parentNode = parent;
    this.depth = depth;
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

  getParentLetter() {
    return this.parentNode.state.letter;
  }

  getH() {
    return this.state.h * 2;
  }

  getG() {
    if (!this.parentNode) return 0;
    const toParent = pathCost(this.state.letter, this.getParentLetter());
    return toParent + this.parentNode.getG();
  }

  getF() {
    return this.getH() + this.getG();
  }
}

Node.prototype.toString = function nodeToString() {
  return `State: ${this.state} - Depth ${this.depth}`;
};

class State {
  constructor(letter, h) {
    this.letter = letter;
    this.h = h;
  }
}

State.prototype.toString = function stateToString() {
  return `(${this.letter}, ${this.h})`;
};

function successor_fn(state) {
  return STATE_SPACE[state.letter];
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
    successors = insert(s, successors);
  }
  return successors;
}

function aStarNode(queue) {
  let lowest = queue[0];
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].getF() < lowest.getF()) {
      lowest = queue[i];
      queue.splice(i, 1);
    }
  }
  return lowest;
}

export function aStarSearch() {
  let fringe = [];
  let initialNode = new Node(INITIAL_STATE);
  fringe = insert(initialNode, fringe);
  while (fringe) {
    let node = aStarNode(fringe);
    if (node.state === GOAL_STATE[0] || node.state === GOAL_STATE[0]) {
      return node.path();
    }
    let children = expand(node);
    fringe = insertAll(children, fringe);
  }
}

export function runAStar() {
  let path = aStarSearch();
  console.log(`Solution path: ${path.reverse().toString()}`);
  console.log(`Path length:${path[0].getF()}`);
}

const A = new State("A", 6);
const B = new State("B", 5);
const C = new State("C", 5);
const D = new State("D", 2);
const E = new State("E", 4);
const F = new State("F", 5);
const G = new State("G", 4);
const H = new State("H", 1);
const I = new State("I", 2);
const J = new State("J", 1);
const K = new State("K", 0);
const L = new State("L", 0);

const INITIAL_STATE = A;
const GOAL_STATE = [K, L];
const STATE_SPACE = {
  A: [B, C, D],
  B: [F, E],
  C: [E],
  D: [H, I, J],
  E: [G, H],
  F: [G],
  G: [K],
  H: [K, L],
  I: [L],
  J: [],
  K: [],
  L: [],
};

function pathCost(first, second) {
  if (first === "B" && second === "A") return 1;
  else if (first === "C" && second === "A") return 2;
  else if (first === "D" && second === "A") return 4;
  else if (first === "E" && second === "B") return 4;
  else if (first === "E" && second === "C") return 1;
  else if (first === "F" && second === "B") return 5;
  else if (first === "G" && second === "E") return 2;
  else if (first === "G" && second === "F") return 1;
  else if (first === "H" && second === "D") return 1;
  else if (first === "H" && second === "E") return 3;
  else if (first === "I" && second === "D") return 4;
  else if (first === "J" && second === "D") return 2;
  else if (first === "K" && second === "G") return 6;
  else if (first === "K" && second === "H") return 6;
  else if (first === "L" && second === "H") return 5;
  else if (first === "L" && second === "I") return 3;
}
