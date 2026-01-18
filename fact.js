/*
 * FACTORIAL EXPLANATION (Tanglish):
 *
 * Factorial na enna nu solla, adhu oru number oda product of all positive integers
 * from 1 to that number.
 *
 * Simple ah solla:
 * - n! (n factorial) = n × (n-1) × (n-2) × ... × 3 × 2 × 1
 * - Example: 5! = 5 × 4 × 3 × 2 × 1 = 120
 *
 * Formula: n! = n × (n-1)!
 *
 * Examples:
 * - 0! = 1 (special case - definition)
 * - 1! = 1
 * - 2! = 2 × 1 = 2
 * - 3! = 3 × 2 × 1 = 6
 * - 4! = 4 × 3 × 2 × 1 = 24
 * - 5! = 5 × 4 × 3 × 2 × 1 = 120
 * - 6! = 6 × 5 × 4 × 3 × 2 × 1 = 720
 *
 * Important points:
 * - 0! = 1 (mathematical definition)
 * - Negative numbers ku factorial illa (undefined)
 * - Factorial grows very fast (5! = 120, 10! = 3,628,800)
 *
 * RECURSION CONCEPT:
 *
 * Recursion na, function ah call pannum podhu, adhu than function ah again call pannum.
 * Like function calling itself!
 *
 * Factorial recursion la:
 * - factioral(5) = 5 × factioral(4)
 * - factioral(4) = 4 × factioral(3)
 * - factioral(3) = 3 × factioral(2)
 * - factioral(2) = 2 × factioral(1)
 * - factioral(1) = 1 (base case - stops here)
 *
 * Then values return aagum (unwinding):
 * - factioral(1) returns 1
 * - factioral(2) = 2 × 1 = 2
 * - factioral(3) = 3 × 2 = 6
 * - factioral(4) = 4 × 6 = 24
 * - factioral(5) = 5 × 24 = 120
 *
 * BASE CASE:
 * - Base case na, recursion stop panna venum
 * - Factorial la, base case = 0 or 1 (both return 1)
 * - Without base case, infinite recursion varum (stack overflow)
 *
 * Real-world uses:
 * - Permutations and combinations
 * - Probability calculations
 * - Arrangements and ordering problems
 */

// Recursive factorial helper: multiplies `num` by the factorial of (num - 1) until it reaches 1.
function factioral(num) {
  // Each recursive call ah log pannum (debugging ku useful)
  // Ithu recursion flow ah visualize pannum
  console.log(`Calculating factorial of ${num}...`);

  // Negative numbers ku factorial illa (undefined)
  if (num < 0) return "Less than zero dont have fact";

  // BASE CASE: 0 or 1 factorial = 1
  // Ithu recursion stop pannum (without this, infinite loop varum)
  // 0! = 1 and 1! = 1 (mathematical definition)
  if (num == 1 || num == 0) {
    console.log(`Base case reached: ${num}! = 1`);
    return 1;
  }

  // RECURSIVE CASE: n! = n × (n-1)!
  // Function ah than again call pannum with (num - 1)
  // Ithu num = 1 or 0 aagum varai continue aagum
  const result = num * factioral(num - 1);
  console.log(`${num}! = ${num} × ${num - 1}! = ${result}`);
  return result;
}

// Execution flow for factioral(5) - Step by step (Tanglish):
/*
 * GOING DOWN (Recursion drilling down):
 * 1. factioral(5) calls factioral(4)
 * 2. factioral(4) calls factioral(3)
 * 3. factioral(3) calls factioral(2)
 * 4. factioral(2) calls factioral(1)
 * 5. factioral(1) returns 1 (BASE CASE - stops here)
 *
 * COMING BACK UP (Unwinding):
 * 1. factioral(1) returns 1
 * 2. factioral(2) = 2 × 1 = 2
 * 3. factioral(3) = 3 × 2 = 6
 * 4. factioral(4) = 4 × 6 = 24
 * 5. factioral(5) = 5 × 24 = 120 (FINAL RESULT)
 *
 * Visual representation:
 * factioral(5)
 *   = 5 × factioral(4)
 *       = 4 × factioral(3)
 *           = 3 × factioral(2)
 *               = 2 × factioral(1)
 *                   = 1 (base case)
 *               = 2 × 1 = 2
 *           = 3 × 2 = 6
 *       = 4 × 6 = 24
 *   = 5 × 24 = 120
 */

console.log("=".repeat(50));
console.log("Calculating 5! (factorial of 5):");
console.log("=".repeat(50));
console.log(factioral(5));
