// Seven different symbols represent Roman numerals with the following values:

// Symbol	Value
// I	1
// V	5
// X	10
// L	50
// C	100
// D	500
// M	1000
// Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:

// If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.
// If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, for example, 4 is 1 (I) less than 5 (V): IV and 9 is 1 (I) less than 10 (X): IX. Only the following subtractive forms are used: 4 (IV), 9 (IX), 40 (XL), 90 (XC), 400 (CD) and 900 (CM).
// Only powers of 10 (I, X, C, M) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5 (V), 50 (L), or 500 (D) multiple times. If you need to append a symbol 4 times use the subtractive form.
// Given an integer, convert it to a Roman numeral.

// Example 1:

// Input: num = 3749

// Output: "MMMDCCXLIX"

// Explanation:

// 3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
//  700 = DCC as 500 (D) + 100 (C) + 100 (C)
//   40 = XL as 10 (X) less of 50 (L)
//    9 = IX as 1 (I) less of 10 (X)
// Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
// Example 2:

// Input: num = 58

// Output: "LVIII"

// Explanation:

// 50 = L
//  8 = VIII
// Example 3:

// Input: num = 1994

// Output: "MCMXCIV"

// Explanation:

// 1000 = M
//  900 = CM
//   90 = XC
//    4 = IV

// Constraints:

// 1 <= num <= 3999

// TC: O(n) loop through each digit of the input and compare to each entry in the array or arrays of roman to int dictionary
// SC: O(1) in place processing

/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const roman2Int = [
    ["I", 1],
    ["IV", 4],
    ["V", 5],
    ["IX", 9],
    ["X", 10],
    ["XL", 40],
    ["L", 50],
    ["XC", 90],
    ["C", 100],
    ["CD", 400],
    ["D", 500],
    ["CM", 900],
    ["M", 1000],
  ];
  let res = "";

  for (let i = roman2Int.length - 1; i > -1; i--) {
    const [sym, val] = roman2Int[i];

    // JS integer division: (X/Y) | 0
    // Check if the integer division is not zero
    if ((num / val) | 0) {
      let count = (num / val) | 0; // Get how many times we need to repeat the roman numeral, for example, 3000 = 3000/1000 = 3 => MMM
      res += sym.repeat(count); // Concatenate in the result string and repeat the roman numerals
      num = num % val; // update the num input to the next digit
    }
  }

  return res;
};
