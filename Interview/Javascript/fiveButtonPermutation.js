// ==========================================
//                       12345
// 0                                                           1
// 1                                                  "-"             ""
// 2                                          2    3    4    5    2    3    4    5
// 3                                    "-"      ""
// 4                                 3 4 5       3 4 5
// 5                          "-"      ""
// 6                       4       5               4       5
// 7                "-"      ""         "-"      ""
// 8                 5         5         5        5
//              1-2-3-4-5    1-2-3-45

const Result = { PASS: "\x1b[92mPASS\x1b[0m", FAIL: "\x1b[91mFAIL\x1b[0m" };

class FiveButtonPermutationRecord {
  constructor(expected) {
    this.expected = expected;
  }
}

class Solution {
  generatePermutations() {
    let res = [];
    let visited = new Set();

    function backtrack(i, cur) {
      // console.log(i, cur, choices);
      // at i === 5, we've used all 5 digits
      if (!visited.has(cur) && i === 5) {
        // we have all the five digit, let's save it to our res array
        res.push(cur);
        return;
      }

      // At each level, it is a combination, we need to capture it. Don't push if the last char is "-"
      if (!visited.has(cur) && i < 6 && cur.at(-1) !== "-") {
        res.push(cur);
      }

      visited.add(cur);

      // Before we recurse, let's add the "-"
      cur += "-";
      cur += (i + 1).toString();

      // Then we recurse
      backtrack(i + 1, cur);

      // After we return from the recursive function, we remove the last char added to cur
      cur = cur.slice(0, -2);
      cur += (i + 1).toString();

      // Then we recurse again without the "-"
      backtrack(i + 1, cur);

      /*
      for (let k = 0; k < choices.length; k += 1) {
        cur += "-";
        cur += choices[k];
        let newChoices = [...choices];
        newChoices.splice(k, 1);
        //   console.log(i, k, cur, choices[k], choices, newChoices);
        // Then we recurse
        console.log("before: ", cur);
        backtrack(i + 1, cur, newChoices);

        // After we return from the recursive function, we remove the last char added to cur
        // cur = cur.slice(0, -2);
        // cur += (i + 1).toString();

        // // Then we recurse again without the "-"
        // backtrack(i + 1, cur);

        cur.slice(0, -2);
        // cur += choices[k];
        //   console.log(k, cur, choices[k], [...choices.splice(k)]);
        // Then we recurse
        console.log("after: ", cur);
        backtrack(i + 1, cur, newChoices);
      }
      */

      // After we return from the last backtrack, we return to the last caller
      return;
    }

    backtrack(1, "1");

    return res;
  }
}

function testSolution(record) {
  const solution = new Solution();
  const result = solution.generatePermutations();
  const status = JSON.stringify(result) === JSON.stringify(record.expected) ? Result.PASS : Result.FAIL;

  console.log("Input: buttons = 12345");
  console.log(`Expected: ${JSON.stringify(record.expected)}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(status);
}

const records = [
  new FiveButtonPermutationRecord([
    "1",
    "1-2",
    "1-2-3",
    "1-2-3-4",
    "1-2-3-4-5",
    "1-2-3-45",
    "1-2-34",
    "1-2-34-5",
    "1-2-345",
    "1-23",
    "1-23-4",
    "1-23-4-5",
    "1-23-45",
    "1-234",
    "1-234-5",
    "1-2345",
    "12",
    "12-3",
    "12-3-4",
    "12-3-4-5",
    "12-3-45",
    "12-34",
    "12-34-5",
    "12-345",
    "123",
    "123-4",
    "123-4-5",
    "123-45",
    "1234",
    "1234-5",
    "12345",
  ]),
];

records.forEach((record, index) => {
  console.log(`# Test case ${index + 1}`);
  testSolution(record);
  console.log("--------------------");
});
