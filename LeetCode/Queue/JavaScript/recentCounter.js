// You have a RecentCounter class which counts the number of recent requests within a certain time frame.

// Implement the RecentCounter class:

// RecentCounter() Initializes the counter with zero recent requests.
// int ping(int t) Adds a new request at time t, where t represents some time in milliseconds, and returns the number of requests that has happened in the past 3000 milliseconds (including the new request). Specifically, return the number of requests that have happened in the inclusive range [t - 3000, t].
// It is guaranteed that every call to ping uses a strictly larger value of t than the previous call.

// Example 1:

// Input
// ["RecentCounter", "ping", "ping", "ping", "ping"]
// [[], [1], [100], [3001], [3002]]
// Output
// [null, 1, 2, 3, 3]

// Explanation
// RecentCounter recentCounter = new RecentCounter();
// recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
// recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
// recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
// recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3

// Constraints:

// 1 <= t <= 109
// Each test case will call ping with strictly increasing values of t.
// At most 104 calls will be made to ping.

// TC: O(1) We're not dealing with an array input
// SC: O(n) for the queue we maintain

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class RecentCounterRecord {
  constructor(pings, expected) {
    this.pings = pings;
    this.expected = expected;
  }
}

class Solution {
  constructor() {
    this.myQueue = [];
  }

  /**
   * @param {number} t
   * @return {number}
   */
  ping(t) {
    // We add to the queue
    this.myQueue.push(t);

    // then, we check that the value at the tail of the queue satisfy the condition
    let curT = t || null;

    // we use while loop to keep removing the tail of the queue until it satisfy the condition
    while (this.myQueue[0] < curT - 3000) {
      // remove the tail of the queue
      this.myQueue.shift();
    }
    // At this point, we return lenght of the queue

    return this.myQueue.length;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = record.pings.map((time) => solution.ping(time));
  const status =
    JSON.stringify(result) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL;

  console.log(`Input: pings = ${JSON.stringify(record.pings)}`);
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(status);
}

const records = [
  new RecentCounterRecord([1, 100, 3001, 3002], [1, 2, 3, 3]),
  new RecentCounterRecord([1, 3001, 3002, 6002], [1, 2, 2, 2]),
  new RecentCounterRecord([100, 3100, 6200, 9300], [1, 2, 1, 1]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
