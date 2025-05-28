/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfitMem = function (prices) {
  // This is a 3d array mem[2][3][prices.length]
  // mem[0-true/1-false][bought/sold/skip][stock positions]

  let mem = new Array(2)
    .fill()
    .map(() =>
      new Array(3).fill().map(() => new Array(prices.length).fill(-1))
    );

  //   console.log(mem);

  // bought 0 - false, 1 - true
  let recursion = (prices, pos, t, bought) => {
    // console.log("pos: " + pos);
    // console.log("t: " + t);
    // console.log("bought: " + bought);
    if (pos >= prices.length || t === 0) {
      return 0;
    }

    if (mem[bought][t][pos] !== -1) {
      return mem[bought][t][pos];
    }

    // 3 choices for a position-> buy/sell/skip
    let result = recursion(prices, pos + 1, t, bought); //skip
    if (bought) {
      result = Math.max(
        result,
        recursion(prices, pos + 1, t - 1, 0) + prices[pos]
      ); // Sell
    } else {
      result = Math.max(result, recursion(prices, pos + 1, t, 1) - prices[pos]); // Buy
    }

    mem[bought][t][pos] = result;

    return result;
  };

  res = recursion(prices, 0, 2, 0);

  return res;
};

let input1 = [3, 3, 5, 0, 0, 3, 1, 4];
let expected1 = 6;
let result1 = maxProfitMem(input1);
console.log("Input: " + input1);
console.log("Expected: " + expected1);
console.log("Result: " + result1);
console.log("-".repeat(50));

let input2 = [1, 2, 3, 4, 5];
let expected2 = 4;
let result2 = maxProfitMem(input2);
console.log("Input: " + input2);
console.log("Expected: " + expected2);
console.log("Result: " + result2);
console.log("-".repeat(50));

let input3 = [7, 6, 4, 3, 1];
let expected3 = 0;
let result3 = maxProfitMem(input3);
console.log("Input: " + input3);
console.log("Expected: " + expected3);
console.log("Result: " + result3);
console.log("-".repeat(50));
