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

// TC: O(m*n) m is the number of digits separated by . or : and n is either 4 for ipv6 or 3 for ipv4 which is the max digits per values separated by . or :.
// SC: O(32) due to the set created as LUT for digits and hexDigits

/**
 * @param {string} queryIP
 * @return {string}
 */
var validIPAddress = function (queryIP) {
  const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
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
  ]);

  // Helper function for IPv4
  function IPv4Check(ipAddr) {
    let ipVal = ipAddr.split(".");

    // check if we have 4 values to check
    if (ipVal.length !== 4) {
      return false;
    }

    // let's check each digit of the values
    for (i = 0; i < 4; i += 1) {
      // check if the leading digit is not zero or empty
      if (
        ipVal[i].length === 0 ||
        (ipVal[i].length > 1 && ipVal[i][0] === "0")
      ) {
        return false;
      }

      // check each element is a digit (0-9)
      for (let j = 0; j < ipVal[i].length; j += 1) {
        if (digits.has(ipVal[i][j]) === false) {
          return false;
        }
      }

      // check if ipVal[i] is 0 - 255
      if (parseInt(ipVal[i]) > 255) {
        return false;
      }
    }

    return true;
  }

  // Helper function for IPv6
  function IPv6Check(ipAddr) {
    const ipVal = ipAddr.split(":");

    // check if we have exactly 8 values
    if (ipVal.length !== 8) {
      return false;
    }

    // for each values we have, check if they have exactly 1 to 4 hex values and they are hex digits
    for (let i = 0; i < 8; i += 1) {
      // check if we have exactly 1 to 4 hex digits
      if (ipVal[i].length < 1 || ipVal[i].length > 4) {
        return false;
      }

      // check if each values are hex digits
      for (let j = 0; j < ipVal[i].length; j += 1) {
        if (hexDigits.has(ipVal[i][j]) === false) {
          return false;
        }
      }
    }

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
