// There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.

// When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.

// Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.

// Example 1:

// Input: rooms = [[1],[2],[3],[]]
// Output: true
// Explanation:
// We visit room 0 and pick up key 1.
// We then visit room 1 and pick up key 2.
// We then visit room 2 and pick up key 3.
// We then visit room 3.
// Since we were able to visit every room, we return true.
// Example 2:

// Input: rooms = [[1,3],[3,0,1],[2],[0]]
// Output: false
// Explanation: We can not enter room number 2 since the only key that unlocks it is in that room.

// Constraints:

// n == rooms.length
// 2 <= n <= 1000
// 0 <= rooms[i].length <= 1000
// 1 <= sum(rooms[i].length) <= 3000
// 0 <= rooms[i][j] < n
// All the values of rooms[i] are unique.

// TC: O(n), we'll have to visit n rooms
// SC: O(n), we maintain a set of n keys for table lookup

/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  // This is graph problem
  // For each room, we'll have information (the key) on which room we have access to
  // We'll visit each room and save the information on a set() so we can keep track of the rooms we visited
  // Also, we can use either DFS or BFS. We'll use DFS.

  // DFS
  let stack = [];
  let visited = new Set();

  // From the problem statement, we always have access to room 0. From room 0, we'll see what keys we have there.
  stack.push(rooms[0]);
  visited.add(0);

  while (stack.length) {
    let curRoom = stack.pop();

    // In the current room, we will get a set of keys. So, we'll check our visited set if we have key, if not, we add it, if
    // it exist we move on.
    for (let key of curRoom) {
      if (!visited.has(key)) {
        visited.add(key);
        stack.push(rooms[key]);
      }
    }
  }

  // console.log(rooms.length)
  // console.log(visited.size)

  // At this point, we check our visited set if it's equal to the number of rooms.
  if (rooms.length === visited.size) return true;

  return false;
};
