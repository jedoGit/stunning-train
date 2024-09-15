// In this exercise, your task is to write a JavaScript function named groupAnagrams.
// The function will take an array of strings as its parameter.Your goal is to group
// anagrams from the given list of strings.An anagram is a word or phrase that forms a different word or phrase when the letters are rearranged.
// Your function should return an array of arrays, where each inner array contains a group of anagram strings.

// Examples:
// groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']) should return [ ['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat'] ].
// groupAnagrams(['abc', 'cab', 'bca', 'xyz', 'zyx']) should return [ ['abc', 'cab', 'bca'], ['xyz', 'zyx'] ].

// You can solve this problem using either of the two types of hash tables available in JavaScript:
// Map: A built-in object that lets you store key-value pairs in an organized manner.
// Object: A fundamental data structure in JavaScript that can also be used as a hash table for storing key-value pairs.

function groupAnagrams(arrStr) {
  const anagramMap = new Map();

  // We want to loop through each string in the input array and sort each string.
  // After sorting, we want to check the Map if the sorted string exist,
  // if not, add the data => key: sorted string, value: array of the strings
  // if exists, push the str to the value field of the key.
  for (const str of arrStr) {
    const chars = Array.from(str);
    chars.sort();
    const sortedStr = chars.join("");

    if (anagramMap.has(sortedStr)) {
      anagramMap.get(sortedStr).push(str);
    } else {
      const strGrp = [str];
      anagramMap.set(sortedStr, strGrp);
    }
  }

  // Return the map values as array of arrays

  return Array.from(anagramMap.values());
}
