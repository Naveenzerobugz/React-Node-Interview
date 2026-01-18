/*
 * FIBONACCI SEQUENCE EXPLANATION (Tanglish):
 *
 * Fibonacci sequence na enna nu solla, adhu oru number series ah irukkum.
 * Ithula each number, previous rendu numbers oda sum ah irukkum.
 *
 * Simple ah solla:
 * - First number: 0
 * - Second number: 1
 * - Next numbers: Previous rendu numbers oda sum
 *
 * Formula: F(n) = F(n-1) + F(n-2)
 *
 * Examples step by step:
 * - F(0) = 0 (first number)
 * - F(1) = 1 (second number)
 * - F(2) = F(1) + F(0) = 1 + 0 = 1
 * - F(3) = F(2) + F(1) = 1 + 1 = 2
 * - F(4) = F(3) + F(2) = 2 + 1 = 3
 * - F(5) = F(4) + F(3) = 3 + 2 = 5
 * - F(6) = F(5) + F(4) = 5 + 3 = 8
 * - F(7) = F(6) + F(5) = 8 + 5 = 13
 *
 * Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...
 *
 * Function enna pannuthu:
 * 1. First rendu numbers (0, 1) ah array la add pannum
 * 2. Loop la, previous rendu numbers oda sum ah calculate pannum
 * 3. Each step la, new number ah array ku add pannum
 * 4. Finally, array ah JSON string ah convert pannitu return pannum
 *
 * Real-world uses:
 * - Nature la patterns (flower petals, pine cones)
 * - Stock market analysis
 * - Computer algorithms
 * - Art and design
 *
 * WHY WE START WITH 0 AND 1? (Base Case Explanation):
 *
 * Fibonacci sequence la, each number = previous rendu numbers oda sum.
 * But first rendu numbers ku previous numbers illa, so avanga ku special values venum.
 *
 * Reasons:
 * 1. BASE CASE (Starting Point):
 *    - F(0) = 0 and F(1) = 1 are the "seed values"
 *    - Ithu without calculation ah define pannanum, because previous numbers illa
 *    - Without this, formula work aagathu (F(n) = F(n-1) + F(n-2) needs previous values)
 *
 * 2. MATHEMATICAL DEFINITION:
 *    - Fibonacci sequence definition la, first number always 0
 *    - Second number always 1
 *    - This is the standard mathematical definition
 *
 * 3. WHY NOT OTHER NUMBERS?
 *    - If we start with different numbers (like 1, 1), it becomes a different sequence
 *    - 0 and 1 are the smallest non-negative integers, perfect starting point
 *    - They create the classic Fibonacci pattern: 0, 1, 1, 2, 3, 5, 8...
 *
 * 4. HOW IT WORKS:
 *    - F(2) = F(1) + F(0) = 1 + 0 = 1 ✓
 *    - F(3) = F(2) + F(1) = 1 + 1 = 2 ✓
 *    - F(4) = F(3) + F(2) = 2 + 1 = 3 ✓
 *    - Without 0 and 1, this chain break aagum!
 *
 * 5. RECURSION BASE CASE:
 *    - In recursion, we need a stopping point
 *    - 0 and 1 are the base cases that stop the recursion
 *    - Without them, infinite loop or error varum
 *
 * Simple analogy: Building construction la foundation irukkum, adha madhiri
 * 0 and 1 are the foundation for Fibonacci sequence!
 */

// Iteratively build a Fibonacci sequence with `num` members and return it as JSON.
function fibo(num) {
  // First rendu Fibonacci numbers (0, 1) ah array la initialize pannum
  // Ithu base case - intha rendu numbers without calculation ah irukkum
  //
  // Why 0 and 1?
  // - F(n) = F(n-1) + F(n-2) formula ku previous values venum
  // - First rendu numbers ku previous values illa, so special values define pannanum
  // - 0 and 1 are the mathematical definition of Fibonacci sequence starting point
  // - Without this, formula work aagathu (like building without foundation)
  let fiboArray = [0, 1];

  // Index 2 la irundhu start pannum, because 0 and 1 already array la irukkum
  for (let i = 2; i < num; i++) {
    // Each Fibonacci number = previous rendu numbers oda sum
    // fiboArray[i-1] = previous number (just before current)
    // fiboArray[i-2] = previous number ku previous number
    const nextValue = fiboArray[i - 1] + fiboArray[i - 2];

    // Step by step enna nadakkuthu nu paakum (debugging ku useful)
    console.log(
      `Step ${i}: ${fiboArray[i - 1]} + ${fiboArray[i - 2]} = ${nextValue}`
    );

    // New Fibonacci number ah array ku add pannum
    fiboArray.push(nextValue);
  }

  // Array ah JSON string ah convert pannitu return pannum
  // Ithu easy ah log panna or transmit panna use aagum
  return JSON.stringify(fiboArray);
}

// First 10 Fibonacci numbers ah generate pannitu JSON string ah print pannum
console.log("=".repeat(50));
console.log("Generating first 10 Fibonacci numbers:");
console.log("=".repeat(50));
console.log(fibo(10));

/*
 * fibo(10) step by step expansion (Tanglish):
 *
 * Start: [0, 1] - First rendu numbers (base case)
 *
 * i=2 ➜ [0, 1, 1] (1+0 = 1) - Previous rendu numbers (1, 0) oda sum
 * i=3 ➜ [0, 1, 1, 2] (1+1 = 2) - Previous rendu numbers (1, 1) oda sum
 * i=4 ➜ [0, 1, 1, 2, 3] (2+1 = 3) - Previous rendu numbers (2, 1) oda sum
 * i=5 ➜ [0, 1, 1, 2, 3, 5] (3+2 = 5) - Previous rendu numbers (3, 2) oda sum
 * i=6 ➜ [0, 1, 1, 2, 3, 5, 8] (5+3 = 8) - Previous rendu numbers (5, 3) oda sum
 * i=7 ➜ [0, 1, 1, 2, 3, 5, 8, 13] (8+5 = 13) - Previous rendu numbers (8, 5) oda sum
 * i=8 ➜ [0, 1, 1, 2, 3, 5, 8, 13, 21] (13+8 = 21) - Previous rendu numbers (13, 8) oda sum
 * i=9 ➜ [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] (21+13 = 34) - Previous rendu numbers (21, 13) oda sum
 *
 * Final result: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 *
 * Pattern: Each number = previous rendu numbers oda sum
 */
