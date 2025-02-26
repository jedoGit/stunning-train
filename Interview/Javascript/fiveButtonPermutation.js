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

function generatePermutations() {
  let res = [];
  function backtrack(i, cur, choices) {
    // console.log(i, cur, choices);
    // at i === 5, we've used all 5 digits
    if (i === 5) {
      // we have all the five digit, let's save it to our res array
      res.push(cur);
      return;
    }

    // At each level, it is a combination, we need to capture it. Don't push if the last char is "-"
    if (cur.at(-1) !== "-") {
      res.push(cur);
    }

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

    // for (let k = 0; k < choices.length; k += 1) {
    //   cur += "-";
    //   cur += choices[k];
    //   let newChoices = [...choices];
    //   newChoices.splice(k, 1);
    //   //   console.log(i, k, cur, choices[k], choices, newChoices);
    //   // Then we recurse
    //   console.log("before: ", cur);
    //   backtrack(i + 1, cur, newChoices);

    //   // After we return from the recursive function, we remove the last char added to cur
    //   // cur = cur.slice(0, -2);
    //   // cur += (i + 1).toString();

    //   // // Then we recurse again without the "-"
    //   // backtrack(i + 1, cur);

    //   cur = cur.slice(0, -2);
    //   cur += choices[k];
    //   //   console.log(k, cur, choices[k], [...choices.splice(k)]);
    //   // Then we recurse
    //   console.log("after: ", cur);
    //   backtrack(i + 1, cur, newChoices);
    // }

    // After we return from the last backtrack, we return to the last caller
    return;
  }

  backtrack(1, "1", [2, 3, 4, 5]);

  return res;
}

console.log(generatePermutations());
