// There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.

// A province is a group of directly or indirectly connected cities and no other cities outside of the group.

// You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.

// Return the total number of provinces.

// Example 1:

// Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
// Output: 2
// Example 2:

// Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
// Output: 3

// Constraints:

// 1 <= n <= 200
// n == isConnected.length
// n == isConnected[i].length
// isConnected[i][j] is 1 or 0.
// isConnected[i][i] == 1
// isConnected[i][j] == isConnected[j][i]

/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
  let numCities = isConnected.length;
  let provinceCount = 0;
  let visited = new Set();

  // Let's do a dfs on all the cities
  for (let city = 0; city < numCities; city++) {
    // Check if we've visited this city before
    if (!visited.has(city)) {
      dfs(city);
      // After we dfs (check the neighbor city basically)
      // We increment the province count
      provinceCount = provinceCount + 1;
    }
  }

  function dfs(city) {
    // first thing we need to do is to add the city to our visited set
    visited.add(city);

    for (let neighborCity = 0; neighborCity < numCities; neighborCity++) {
      // We need to check if we've visitied this neighbor city and if
      // it's connected to our city
      if (!visited.has(neighborCity) && isConnected[city][neighborCity]) {
        dfs(neighborCity);
      }
    }
  }

  return provinceCount;
};
