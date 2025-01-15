// You are given an absolute path for a Unix-style file system, which always begins with a slash '/'. Your task is to transform this absolute path into its simplified canonical path.

// The rules of a Unix-style file system are as follows:

// A single period '.' represents the current directory.
// A double period '..' represents the previous/parent directory.
// Multiple consecutive slashes such as '//' and '///' are treated as a single slash '/'.
// Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. For example, '...' and '....' are valid directory or file names.
// The simplified canonical path should follow these rules:

// The path must start with a single slash '/'.
// Directories within the path must be separated by exactly one slash '/'.
// The path must not end with a slash '/', unless it is the root directory.
// The path must not have any single or double periods ('.' and '..') used to denote current or parent directories.
// Return the simplified canonical path.

// Example 1:

// Input: path = "/home/"

// Output: "/home"

// Explanation:

// The trailing slash should be removed.

// Example 2:

// Input: path = "/home//foo/"

// Output: "/home/foo"

// Explanation:

// Multiple consecutive slashes are replaced by a single one.

// Example 3:

// Input: path = "/home/user/Documents/../Pictures"

// Output: "/home/user/Pictures"

// Explanation:

// A double period ".." refers to the directory up a level (the parent directory).

// Example 4:

// Input: path = "/../"

// Output: "/"

// Explanation:

// Going one level up from the root directory is not possible.

// Example 5:

// Input: path = "/.../a/../b/c/../d/./"

// Output: "/.../b/d"

// Explanation:

// "..." is a valid name for a directory in this problem.

// Constraints:

// 1 <= path.length <= 3000
// path consists of English letters, digits, period '.', slash '/' or '_'.
// path is a valid absolute Unix path.

// TC: O(n) we're processing each elements
// SC: O(n) we're building a stack at worst will contain at most the same size as in the input

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  // We're reading each chars and building our current filename or directory.
  // We only want to save these to a temp variable if it's between a "/". For
  // example, /abc/... We want to sabe abc to current.
  // During the time we build our temp variable, we check for "/"
  // Once we hit "/", we then check if we're getting "..", "", and ".".
  // If we see a "" and ".", we push the temp variable to our stack.
  // If we see a "..", we pop our stack.
  // We do this until we read all chars.
  // After we read all the chars, we should have a stack with values on it.
  // We will join the values in the stack with "/" and return it.

  let stack = [];
  let curr = "";

  for (let c of path + "/") {
    if (c === "/") {
      // Here, we saw a "/", we need to decide whether to add to the stack or pop the stack
      if (curr === "..") {
        // here the temp variable we built is "..", so we need to pop the stack if it's not empty
        stack.length !== 0 && stack.pop();
      } else if (curr !== "" && curr !== ".") {
        // else if the temp variable we built is not null or a period
        // for example our current var is "abc", we add it to the stack
        stack.push(curr);
      }

      // After we performed either of the operations above, we need to clear our temp variable so we can build the next filename or directory name
      curr = "";
    } else {
      // Here, we're building our temp variable so that we can add it to our stack later
      curr += c;
    }
  }

  // At this point, we should have a stack full of values, we need to join each elements with "/". Also, prepend a "/"
  return "/" + stack.join("/");
};
