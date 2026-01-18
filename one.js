/*
 * COUNT ELEMENT FREQUENCY EXPLANATION (Tanglish):
 *
 * Ithu oru array la, each number eppidi multiple times varuthu nu count pannum.
 * Result ah object la return pannum - key = number, value = count.
 *
 * Example:
 * Input: [7, 2, 5, 6, 8, 7, 2, 3]
 * Output: {7: 2, 2: 2, 5: 1, 6: 1, 8: 1, 3: 1}
 *
 * Explanation:
 * - 7 appears 2 times
 * - 2 appears 2 times
 * - 5 appears 1 time
 * - 6 appears 1 time
 * - 8 appears 1 time
 * - 3 appears 1 time
 *
 * Multiple methods irukkum:
 * 1. Using reduce() - Clean and functional approach
 * 2. Using forEach() - Simple and readable
 * 3. Using for loop - Traditional approach
 * 4. Using Map - Modern approach with Map
 */

const num = [7, 2, 5, 6, 8, 7, 2, 3];

console.log("=".repeat(60));
console.log("COUNT ELEMENT FREQUENCY");
console.log("=".repeat(60));
console.log("Input array:", num);
console.log("Expected output: {7: 2, 2: 2, 5: 1, 6: 1, 8: 1, 3: 1}");
console.log("");

// ============================================
// METHOD 1: Using reduce() (Most Popular)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 1: Using reduce()");
console.log("=".repeat(60));

// reduce() na array ah single value ku convert pannum
// accumulator na previous value ah store pannum
// Step by step:
// 1. Empty object {} start pannum (accumulator)
// 2. Each element ku:
//    - Element already object la irundha, count ah increment pannum
//    - Element object la illana, 1 ah set pannum
// 3. Final object ah return pannum

const frequency1 = num.reduce((acc, current) => {
  // current value already object la irundha, count ah increment pannum
  // Illana, 1 ah set pannum
  acc[current] = (acc[current] || 0) + 1;
  return acc; // Updated object ah return pannum
}, {}); // Empty object {} ah initial value ah use pannum

console.log("Result:", frequency1);
console.log("");

// Step by step breakdown:
console.log("Step by step breakdown:");
const stepByStep = {};
num.forEach((value, index) => {
  const prevCount = stepByStep[value] || 0;
  stepByStep[value] = prevCount + 1;
  console.log(
    `  Step ${index + 1}: value=${value}, count so far=${JSON.stringify(
      stepByStep
    )}`
  );
});
console.log("");

// ============================================
// METHOD 2: Using forEach() (Simple and Readable)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 2: Using forEach()");
console.log("=".repeat(60));

const frequency2 = {};

// forEach() na each element ku function execute pannum
// Object la count ah track pannum
num.forEach((value) => {
  // Value already object la irundha, count ah increment
  // Illana, 1 ah set pannum
  if (frequency2[value]) {
    frequency2[value]++; // Count ah increment pannum
  } else {
    frequency2[value] = 1; // First time la, 1 ah set pannum
  }
});

console.log("Result:", frequency2);
console.log("");

// ============================================
// METHOD 3: Using for loop (Traditional)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 3: Using for loop");
console.log("=".repeat(60));

const frequency3 = {};

// Traditional for loop - each index ku iterate pannum
for (let i = 0; i < num.length; i++) {
  const value = num[i];

  // Same logic - value already object la irundha increment, illana 1
  if (frequency3[value]) {
    frequency3[value]++;
  } else {
    frequency3[value] = 1;
  }
}

console.log("Result:", frequency3);
console.log("");

// ============================================
// METHOD 4: Using Map (Modern Approach)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 4: Using Map");
console.log("=".repeat(60));

// Map use pannum - similar to object, but Map ah use pannum
const frequencyMap = new Map();

num.forEach((value) => {
  // Map la get() use pannum current count ah get panna
  // set() use pannum count ah update panna
  const currentCount = frequencyMap.get(value) || 0;
  frequencyMap.set(value, currentCount + 1);
});

// Map ah object ku convert pannum
const frequency4 = Object.fromEntries(frequencyMap);

console.log("Result:", frequency4);
console.log("");

// ============================================
// METHOD 5: One-liner using reduce (Shortest)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 5: One-liner using reduce");
console.log("=".repeat(60));

// Shortest version - same logic, but more compact
const frequency5 = num.reduce(
  (acc, val) => ((acc[val] = (acc[val] || 0) + 1), acc),
  {}
);

console.log("Result:", frequency5);
console.log("");

// ============================================
// VERIFICATION
// ============================================
console.log("=".repeat(60));
console.log("VERIFICATION");
console.log("=".repeat(60));

const expected = { 7: 2, 2: 2, 5: 1, 6: 1, 8: 1, 3: 1 };

console.log("Expected:", expected);
console.log("Got:", frequency1);

// All methods same result ah return pannuma nu check pannum
const allMatch =
  JSON.stringify(frequency1) === JSON.stringify(expected) &&
  JSON.stringify(frequency2) === JSON.stringify(expected) &&
  JSON.stringify(frequency3) === JSON.stringify(expected) &&
  JSON.stringify(frequency4) === JSON.stringify(expected) &&
  JSON.stringify(frequency5) === JSON.stringify(expected);

console.log("All methods produce correct result:", allMatch ? "✓ Yes" : "✗ No");
console.log("");

// ============================================
// KEY TAKEAWAYS
// ============================================
console.log("=".repeat(60));
console.log("KEY TAKEAWAYS");
console.log("=".repeat(60));
console.log(`
1. reduce() - Most functional and clean approach
   - Best for: Functional programming style
   - Syntax: array.reduce((acc, val) => {...}, {})

2. forEach() - Simple and readable
   - Best for: Easy to understand
   - Syntax: array.forEach((val) => {...})

3. for loop - Traditional approach
   - Best for: Maximum control, performance critical
   - Syntax: for (let i = 0; i < array.length; i++)

4. Map - Modern approach
   - Best for: When you need Map features
   - Syntax: new Map() with get() and set()

5. All methods same result ah return pannum
   - Choose based on your coding style and requirements
`);
