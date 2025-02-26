function validatePhoneNumber(A) {
  // First thing first, remove all the spaces
  let temp = A.replace(/ /g, "");
  // Let's make a copy of the trimmed input without spaces
  let res = [...temp];
  let paren = [];
  const num = new Set("0,1,2,3,4,5,6,7,8,9");
  let count = 0;

  // console.log(res)
  // This is only to validate US phone number
  // The first char need to be a number... no '+'
  if (!num.has(temp[0])) {
    return false;
  }

  for (let [i, c] of res.entries()) {
    // console.log(c,i)

    // We count how many digits there are
    // There should be 11 digits total
    if (num.has(c)) {
      count += 1;
    }

    // If there are parenthesis, let's take care of that
    // Make sure it's balanced.
    if (c === ")") {
      // If we see a closing paren
      // The closing the paren need to be in index 5.
      // There should only be one element in the stack and it should be an open paren.
      if (
        paren.length !== 0 &&
        paren[paren.length - 1][1] === "(" &&
        paren[paren.length - 1][0] === 1 &&
        i === 5
      ) {
        paren.pop();
      } else {
        return false;
      }
    } else if (c === "(") {
      // If we see an open paren, let's push to stack
      paren.push([i, c]);
    }
  }

  // If we have not popped any thing that was added in the stack, it means we have an unbalanced paren.
  if (paren.length !== 0) {
    return false;
  }

  // If our digit count is not exactly 11, it's not valid
  if (count !== 11) {
    return false;
  }

  return true;
}

let input = "1      2345678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1234567890";
console.log(input + ": " + validatePhoneNumber(input));
input = "1(234)5678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1(2345678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1(2345678901)";
console.log(input + ": " + validatePhoneNumber(input));
input = "1234)5678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1(234)(567)(8901)";
console.log(input + ": " + validatePhoneNumber(input));
input = "1(234)(5)(67)(8901)";
console.log(input + ": " + validatePhoneNumber(input));
input = "1(234) 567 8901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1)234) 567 8901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1 (234) 567 8901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1-234-567-8901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1-(234)-567-8901";
console.log(input + ": " + validatePhoneNumber(input));
input = "12345678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1-234)5678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1 234 5678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1 234 567 8901";
console.log(input + ": " + validatePhoneNumber(input));
input = "01 234 5678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "+1 234 5678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "63 234 5678901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1(234)567-8901";
console.log(input + ": " + validatePhoneNumber(input));
input = "1 (234) 567-8901";
console.log(input + ": " + validatePhoneNumber(input));
// console.log(validatePhoneNumber("1234567890"))
// console.log(validatePhoneNumber("1(234)5678901"))
// console.log(validatePhoneNumber("1(2345678901"))
// console.log(validatePhoneNumber("1(2345678901)"))
// console.log(validatePhoneNumber("1234)5678901"))
// console.log(validatePhoneNumber("1(234)(567)(8901)"))
// console.log(validatePhoneNumber("1(234)(5)(67)(8901)"))
