/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var minReorder = function (n, connections) {
  // This graph will keep track of the neighbors of the city
  let g = new Map();
  // This set, we'll use this keep track of the direction of travel
  let s = new Set();
  // This is our visited set. We use this to keep track of the cities we've visited.
  let visited = new Set();

  // Let's fill our graph and set
  // For graph, we fill the key with the city, and the values with the cities it is connected with
  // For the set, we fill it with the directions we get from the connection input
  for (let [a, b] of connections) {
    if (!g.has(a)) {
      g.set(a, []);
    }

    if (!g.has(b)) {
      g.set(b, []);
    }

    // This is our adjacency list
    let temp = g.get(a);
    temp.push(b);
    g.set(a, temp);

    temp = g.get(b);
    temp.push(a);
    g.set(b, temp);

    // This is our direction list
    s.add([a, b].join());
  }

  // This is our dfs function
  function dfs(city) {
    // First, let's mark this city as visited
    visited.add(city);

    let count = 0;

    // Let's check our adjacency list for each of our cities.
    for (let nei of g.get(city)) {
      // First, let's check if the neighbor city is in our visited set, if not,
      // we'll dfs on this neighbor city
      if (!visited.has(nei)) {
        // We'll check if the direction from city to neighbor exists in our set.
        // If it exists, we increment our count of directions we need to
        // reverse.
        if (s.has([city, nei].join())) {
          count += 1;
        }
        count += dfs(nei);
      }
    }

    return count;
  }

  // Run the dfs on first city
  return dfs(0);
};
