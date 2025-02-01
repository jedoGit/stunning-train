// You parked your car in a parking lot and want to compute the total cost of the ticket. The billing rules are as follows:

// The entrance fee of the car parking lot is 2;
// The first full or partial hour costs 3;
// Each successive full or partial hour (after the first) costs 4.
// You entered the car parking lot at time E and left at time L. In this task, times are represented as strings in the format "HH:MM" (where "HH" is a two-digit number between 0 and 23, which stands for hours, and "MM" is a two-digit number between 0 and 59, which stands for minutes).

// Write a function:

// function solution(E, L);

// that, given strings E and L specifying points in time in the format "HH:MM", returns the total cost of the parking bill from your entry at time E to your exit at time L. You can assume that E describes a time before L on the same day.

// For example, given "10:00" and "13:21" your function should return 17, because the entrance fee equals 2, the first hour costs 3 and there are two more full hours and part of a further hour, so the total cost is 2 + 3 + (3 * 4) = 17. Given "09:42" and "11:42" your function should return 9, because the entrance fee equals 2, the first hour costs 3 and the second hour costs 4, so the total cost is 2 + 3 + 4 = 9.

// Assume that:

// strings E and L follow the format "HH:MM" strictly;
// string E describes a time before L on the same day.
// In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// TC: O(1)
// SC: O(1)

function solution(E, L) {
  // Implement your solution here

  // Extract the HH and MM from the input string

  let eHH = E[0] + E[1];
  let eMM = E[3] + E[4];
  let lHH = L[0] + L[1];
  let lMM = L[3] + L[4];

  // console.log(eHH, eMM, lHH, lMM)

  // Compute the hrs elapsed

  let hrsElapsed = 0;

  // if E <= L
  if (eHH <= lHH) {
    // E 1230 L 1500
    hrsElapsed = parseInt(lHH) - parseInt(eHH);
  } else {
    // crossed the 24 hr period
    // E 2330 - L 0400
    hrsElapsed = 24 - parseInt(eHH) + parseInt(lHH);
  }

  // console.log("hrsElapsed:" + hrsElapsed)

  // if the mins elapsed is > 0, it counts as a full hour
  let minsElapsed = parseInt(lMM) - parseInt(eMM);

  if (minsElapsed > 0) {
    hrsElapsed += 1;
    // console.log("minsElapsed: " + minsElapsed )
  }

  // console.log("Total hrsElapsed:" + hrsElapsed)

  // $2 for entrance fee, $3 for first full or partial hrs, $4 for succeeding partial or full hrs
  // 2 + 3 (first full or partial hr) + 4 * (succeeding full or partial hrs)
  // can be computed as 2 + 4 * total hrs elapsed - 1 because the first hr is only $3
  // simplified as 1 + total hrs elapsed * 4

  return 1 + hrsElapsed * 4;
}
