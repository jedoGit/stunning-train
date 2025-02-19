// Given a string queryIP, return "IPv4" if IP is a valid IPv4 address, "IPv6" if IP is a valid IPv6 address or "Neither" if IP is not a correct IP of any type.

// A valid IPv4 address is an IP in the form "x1.x2.x3.x4" where 0 <= xi <= 255 and xi cannot contain leading zeros. For example, "192.168.1.1" and "192.168.1.0" are valid IPv4 addresses while "192.168.01.1", "192.168.1.00", and "192.168@1.1" are invalid IPv4 addresses.

// A valid IPv6 address is an IP in the form "x1:x2:x3:x4:x5:x6:x7:x8" where:

// 1 <= xi.length <= 4
// xi is a hexadecimal string which may contain digits, lowercase English letter ('a' to 'f') and upper-case English letters ('A' to 'F').
// Leading zeros are allowed in xi.
// For example, "2001:0db8:85a3:0000:0000:8a2e:0370:7334" and "2001:db8:85a3:0:0:8A2E:0370:7334" are valid IPv6 addresses, while "2001:0db8:85a3::8A2E:037j:7334" and "02001:0db8:85a3:0000:0000:8a2e:0370:7334" are invalid IPv6 addresses.

// Example 1:

// Input: queryIP = "172.16.254.1"
// Output: "IPv4"
// Explanation: This is a valid IPv4 address, return "IPv4".
// Example 2:

// Input: queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
// Output: "IPv6"
// Explanation: This is a valid IPv6 address, return "IPv6".
// Example 3:

// Input: queryIP = "256.256.256.256"
// Output: "Neither"
// Explanation: This is neither a IPv4 address nor a IPv6 address.

// Constraints:

// queryIP consists only of English letters, digits and the characters '.' and ':'.

// TC: O(n) where n is the length of queryIP
// SC: O(32) due to the set created as LUT for digits and hexDigits. We us an array to store max of 4 digits at every iteration.

/**
 * @param {string} queryIP
 * @return {string}
 */
var validIPAddress = function (queryIP) {
  const digits = new Set([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
  ]);
  const hexDigits = new Set([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    ":",
  ]);

  // Helper function for IPv4
  function IPv4Check(ipAddr) {
    // we can loop through the string and save the current string to a temp variable and stop if we see a dot.
    // Also, anytime we see a dot, we count the dot.
    let numDot = 0;
    let curVal = [];

    // We need to add the last ".". At the end, we should only have a total of 4 ".".
    ipAddr = ipAddr + ".";

    for (let i = 0; i < ipAddr.length; i += 1) {
      // Let's check if ipAddr[i] is even a valid digit
      if (!digits.has(ipAddr[i])) return false;

      curVal.push(ipAddr[i]);

      // We see a dot, let's validate the curVal
      // It should not have a 0 in front of it if its length is greater than 1
      if (ipAddr[i] === ".") {
        // Let's remove the last element added which is "."
        curVal.pop();

        // Return false if it's just blank, or if the leading digit is 0
        if (curVal.length === 0 || (curVal.length > 1 && curVal[0] === "0")) {
          return false;
        }

        // Let's join the elements of the array. Make sure to use join("").
        // Parse Int it and check if the value is greater than 255
        if (parseInt(curVal.join("")) > 255) {
          return false;
        }

        // Let's count the dots we have reset curVal to empty array
        numDot += 1;
        curVal = [];
      }
    }

    // Exited the for loop, we should only have 4 dots.
    if (numDot !== 4) {
      return false;
    }

    return true;
  }

  // Helper function for IPv6
  function IPv6Check(ipAddr) {
    let numColon = 0;
    let curVal = [];

    ipAddr += ":";

    for (let i = 0; i < ipAddr.length; i++) {
      // check if this is a hex digit or if it's a ":"
      if (!hexDigits.has(ipAddr[i])) return false;

      // Let's add this hex digit to our curval
      curVal.push(ipAddr[i]);

      // check if this is a ":", it so, let's check curval
      if (ipAddr[i] === ":") {
        // Remove the ":" which was the last element added to curval
        curVal.pop();

        // let's return false if curval is blank or if it's greater than 4
        if (curVal.length < 1 || curVal.length > 4) return false;

        // count numColon and reset curVal
        numColon += 1;
        curVal = [];
      }
    }

    // once we exit the for loop, we know we should have exactly 9 ":"
    if (numColon !== 8) return false;

    return true;
  }

  if (IPv4Check(queryIP)) {
    return "IPv4";
  } else if (IPv6Check(queryIP)) {
    return "IPv6";
  } else {
    return "Neither";
  }
};
