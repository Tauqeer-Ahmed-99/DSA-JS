type Vertex = string | number;

export class Graph {
  adjacencyList: { [key: Vertex]: Vertex[] };

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(v: Vertex) {
    if (!this.adjacencyList[v]) {
      this.adjacencyList[v] = [];
      return true;
    }

    return false;
  }

  addEdge(v1: Vertex, v2: Vertex) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1].push(v2);
      this.adjacencyList[v2].push(v1);
      return true;
    }

    return false;
  }

  removeEdge(v1: Vertex, v2: Vertex) {
    if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
      this.adjacencyList[v1] = this.adjacencyList[v1].filter((v) => v !== v2);
      this.adjacencyList[v2] = this.adjacencyList[v2].filter((v) => v !== v1);
      return true;
    }

    return false;
  }

  removeVertex(v: Vertex) {
    if (this.adjacencyList[v]) {
      while (this.adjacencyList[v].length) {
        const temp = this.adjacencyList[v].pop()!;
        this.removeEdge(v, temp);
      }

      delete this.adjacencyList[v];

      return true;
    }

    return false;
  }
}
