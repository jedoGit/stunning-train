class Graph {
  constructor() {
    // we create an adjacency list object to keep track of the edges and vertex
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    // In js, you can create an object property in two ways:
    // Object.defineProperty(this.adjacencyList, vertex, {value: []}); or
    // this.adjacencyList[vertex] = [];
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
      //Object.defineProperty(this.adjacencyList, vertex, { value: [] });
      return true;
    }
    return false;
  }

  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1);
      return true;
    }
    return false;
  }

  removeEdge(vertex1, vertex2) {
    //filter out the vertices from the edge
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (v) => v !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (v) => v !== vertex1
      );
      return true;
    }
    return false;
  }

  removeVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      return undefined;
    }

    while (this.adjacencyList[vertex].length) {
      let temp = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, temp);
    }

    delete this.adjacencyList[vertex];

    return this;
  }
}
