// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

// Example 1:

// Input: digits = "23"
// Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
// Example 2:

// Input: digits = ""
// Output: []
// Example 3:

// Input: digits = "2"
// Output: ["a","b","c"]

// Constraints:

// 0 <= digits.length <= 4
// digits[i] is a digit in the range ['2', '9'].

// TC: O(n*4^n) because at each level of the backtracking tree, you'll have a worst case 4^n leaf nodes the you'll do that for every digits, n is the length of digits
// SC: O(n) you'll do recursion of n levels

class Solution
{
private:
    vector<string> res;
    // map - use BST for search, which will tc of O(log n)
    // unordered map - use hashtable for search
    // since this is a small map, we can use map to save memory
    const map<char, string> digitToChar = {
        {'2', "abc"},
        {'3', "def"},
        {'4', "ghi"},
        {'5', "jkl"},
        {'6', "mno"},
        {'7', "pqrs"},
        {'8', "tuv"},
        {'9', "wxyz"}};

    // Helper function to perform backtracking algorithm
    // pass by reference to digits
    // pass by value for i and curStr
    void backtrack(int i, string curStr, const string &digits)
    {
        if (i == digits.size())
        {
            res.push_back(curStr);
            return;
        }
        // cout << digits.at(0) << endl;
        string digitChar = digitToChar.at(digits[i]);

        for (const char c : digitChar)
        {
            backtrack(i + 1, curStr + c, digits);
        }
        return;
    }

public:
    vector<string> letterCombinations(string digits)
    {
        // Check first if input string digit is empty, if so, return res
        if (digits.empty())
        {
            return res;
        }

        // Perform backtrack
        backtrack(0, "", digits);

        return res;
    }
};

// class Solution {
// public:

//     void backtrack(int i, string curStr, const string& digits, const map<char,string>& digitToChar, vector<string>& res) {
//         if( i == digits.size() ) {
//             res.push_back(curStr);
//             return;
//         }
//         // cout << digits.at(0) << endl;
//         string digitChar = digitToChar.at(digits[i]);

//         for ( const char c : digitChar ) {
//             backtrack(i+1, curStr + c, digits, digitToChar, res);
//         }
//         return;
//     }

//     vector<string> letterCombinations(string digits) {
//         vector<string> res;
//         // map - use bst for search, which will tc of O(log n)
//         // unordered map - use hashtable for search
//         // since this is a small map, we can use map to save memory
//         map<char,string> digitToChar = {
//             {'2', "abc"},
//             {'3', "def"},
//             {'4', "ghi"},
//             {'5', "jkl"},
//             {'6', "mno"},
//             {'7', "pqrs"},
//             {'8', "tuv"},
//             {'9', "wxyz"}
//         };

//         // cout << digitToChar[2] << endl;

//         if( digits.empty() ) {
//             return res;
//         }

//         backtrack(0, "", digits, digitToChar, res);

//         return res;
//     }
// };