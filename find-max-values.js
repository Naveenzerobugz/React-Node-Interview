/*
 * FIND MAXIMUM VALUES EXPLANATION (Tanglish):
 *
 * Ithu oru array la, maximum value and second maximum value ah find pannum.
 *
 * 1. Maximum Value (Last Max):
 *    - Array la irukka largest number ah find pannum
 *    - Example: [7, 2, 5, 6, 8, 7, 2, 3] -> max = 8
 *
 * 2. Second Maximum Value (Last Second Max):
 *    - Array la irukka second largest number ah find pannum
 *    - Example: [7, 2, 5, 6, 8, 7, 2, 3] -> second max = 7
 *    - Duplicates handle pannum - same max multiple times irundha, 
 *      actual second max ah find pannum
 *
 * Multiple methods irukkum:
 * 1. Using Math.max() and sort - Simple approach
 * 2. Using loop - Traditional approach
 * 3. Using reduce() - Functional approach
 * 4. Using Set to remove duplicates first
 */

console.log("=".repeat(60));
console.log("FIND MAXIMUM VALUES");
console.log("=".repeat(60));

// Sample arrays for testing
const numbers1 = [7, 2, 5, 6, 8, 7, 2, 3];
const numbers2 = [10, 10, 5, 8, 10, 8];
const numbers3 = [5, 5, 5, 5, 5]; // All same
const numbers4 = [1, 2, 3, 4, 5]; // Sorted ascending
const numbers5 = [9, 3, 7, 1, 6, 4, 2]; // Random

console.log("Test arrays:");
console.log("Array 1:", numbers1);
console.log("Array 2:", numbers2);
console.log("Array 3:", numbers3);
console.log("Array 4:", numbers4);
console.log("Array 5:", numbers5);
console.log("");

// ============================================
// FIND MAXIMUM VALUE (Last Max)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 1: FIND MAXIMUM VALUE (Last Max)");
console.log("=".repeat(60));

// ============================================
// METHOD 1a: Using Math.max() with spread operator
// ============================================
console.log("\n--- Method 1a: Using Math.max() with spread operator ---");

// Math.max() na multiple numbers la largest number ah return pannum
// Spread operator (...) use pannitu array ah individual numbers ah convert pannum
const max1 = Math.max(...numbers1);

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Maximum value: ${max1}`);
console.log("");

// ============================================
// METHOD 1b: Using Math.max() with apply()
// ============================================
console.log("--- Method 1b: Using Math.max() with apply() ---");

// apply() use pannum - older method (spread operator ku munnali)
const max2 = Math.max.apply(null, numbers1);

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Maximum value: ${max2}`);
console.log("");

// ============================================
// METHOD 1c: Using reduce()
// ============================================
console.log("--- Method 1c: Using reduce() ---");

// reduce() use pannum - each element compare pannitu max ah find pannum
const max3 = numbers1.reduce((max, current) => {
  // Current value max ku compare pannum, larger value ah return pannum
  return current > max ? current : max;
}, numbers1[0]); // First element ah initial value ah use pannum

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Maximum value: ${max3}`);
console.log("");

// ============================================
// METHOD 1d: Using sort() and pop()
// ============================================
console.log("--- Method 1d: Using sort() and pop() ---");

// sort() use pannitu ascending order la sort pannum, last element ah get pannum
// Note: sort() original array ah modify pannum, so slice() use pannum
const sorted1 = [...numbers1].sort((a, b) => a - b);
const max4 = sorted1[sorted1.length - 1];

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Sorted: [${sorted1.join(", ")}]`);
console.log(`Maximum value: ${max4}`);
console.log("");

// ============================================
// METHOD 1e: Using for loop (Traditional)
// ============================================
console.log("--- Method 1e: Using for loop (Traditional) ---");

let max5 = numbers1[0]; // First element ah initial value ah use pannum

// Each element ku iterate pannitu, max ku compare pannum
for (let i = 1; i < numbers1.length; i++) {
  if (numbers1[i] > max5) {
    max5 = numbers1[i]; // Larger value ah max ku assign pannum
  }
}

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Maximum value: ${max5}`);
console.log("");

// ============================================
// FIND SECOND MAXIMUM VALUE (Last Second Max)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 2: FIND SECOND MAXIMUM VALUE (Last Second Max)");
console.log("=".repeat(60));

// ============================================
// METHOD 2a: Remove duplicates, sort, get second last
// ============================================
console.log("\n--- Method 2a: Remove duplicates, sort, get second last ---");

// Set use pannitu duplicates remove pannum
// Sort pannitu, second last element ah get pannum
const unique1 = [...new Set(numbers1)];
const sortedUnique1 = unique1.sort((a, b) => a - b);

let secondMax1 = null;

if (sortedUnique1.length >= 2) {
  secondMax1 = sortedUnique1[sortedUnique1.length - 2]; // Second last element
} else {
  secondMax1 = "Not enough unique values";
}

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Unique values: [${sortedUnique1.join(", ")}]`);
console.log(`Second maximum: ${secondMax1}`);
console.log("");

// ============================================
// METHOD 2b: Using loop - Track max and second max
// ============================================
console.log("--- Method 2b: Using loop - Track max and second max ---");

let max = numbers1[0];
let secondMax2 = null;

// First pass - max value ah find pannum
for (let i = 1; i < numbers1.length; i++) {
  if (numbers1[i] > max) {
    max = numbers1[i];
  }
}

// Second pass - max ku different aana largest value ah find pannum
for (let i = 0; i < numbers1.length; i++) {
  if (numbers1[i] < max && (secondMax2 === null || numbers1[i] > secondMax2)) {
    secondMax2 = numbers1[i];
  }
}

if (secondMax2 === null) {
  secondMax2 = "All values are same or not enough distinct values";
}

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Maximum: ${max}`);
console.log(`Second maximum: ${secondMax2}`);
console.log("");

// ============================================
// METHOD 2c: Single loop - Track both max and second max
// ============================================
console.log("--- Method 2c: Single loop - Track both max and second max ---");

let max6 = numbers1[0];
let secondMax3 = null;

// Single loop la, max and second max ah track pannum
for (let i = 1; i < numbers1.length; i++) {
  const current = numbers1[i];
  
  // Current value max ku larger irundha
  if (current > max6) {
    secondMax3 = max6; // Previous max ah second max ku move pannum
    max6 = current; // Current value ah max ku assign pannum
  } 
  // Current value max ku smaller, but second max ku larger irundha
  else if (current < max6 && (secondMax3 === null || current > secondMax3)) {
    secondMax3 = current; // Current value ah second max ku assign pannum
  }
}

if (secondMax3 === null) {
  secondMax3 = "All values are same or not enough distinct values";
}

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Maximum: ${max6}`);
console.log(`Second maximum: ${secondMax3}`);
console.log("");

// ============================================
// METHOD 2d: Using reduce() - Track max and second max
// ============================================
console.log("--- Method 2d: Using reduce() - Track max and second max ---");

const result = numbers1.reduce(
  (acc, current) => {
    // Current value max ku larger irundha
    if (current > acc.max) {
      acc.secondMax = acc.max; // Previous max ah second max ku move pannum
      acc.max = current; // Current value ah max ku assign pannum
    } 
    // Current value max ku smaller, but second max ku larger irundha
    else if (
      current < acc.max &&
      (acc.secondMax === null || current > acc.secondMax)
    ) {
      acc.secondMax = current; // Current value ah second max ku assign pannum
    }
    return acc;
  },
  { max: numbers1[0], secondMax: null }
);

const secondMax4 =
  result.secondMax !== null
    ? result.secondMax
    : "All values are same or not enough distinct values";

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Maximum: ${result.max}`);
console.log(`Second maximum: ${secondMax4}`);
console.log("");

// ============================================
// METHOD 2e: Using sort() and Set (Remove duplicates first)
// ============================================
console.log(
  "--- Method 2e: Using sort() and Set (Remove duplicates first) ---"
);

// Step 1: Remove duplicates using Set
const unique2 = [...new Set(numbers1)];

// Step 2: Sort ascending order la
const sorted2 = unique2.sort((a, b) => a - b);

// Step 3: Get second last element
let secondMax5 = null;
if (sorted2.length >= 2) {
  secondMax5 = sorted2[sorted2.length - 2];
} else {
  secondMax5 = "Not enough unique values";
}

console.log(`Array: [${numbers1.join(", ")}]`);
console.log(`Unique values: [${unique2.join(", ")}]`);
console.log(`Sorted: [${sorted2.join(", ")}]`);
console.log(`Second maximum: ${secondMax5}`);
console.log("");

// ============================================
// TESTING WITH DIFFERENT ARRAYS
// ============================================
console.log("=".repeat(60));
console.log("TESTING WITH DIFFERENT ARRAYS");
console.log("=".repeat(60));

function findMaxAndSecondMax(arr) {
  // Remove duplicates, sort, get max and second max
  const unique = [...new Set(arr)];
  const sorted = unique.sort((a, b) => a - b);
  
  const max = sorted[sorted.length - 1];
  const secondMax = sorted.length >= 2 ? sorted[sorted.length - 2] : null;
  
  return { max, secondMax, array: arr };
}

const testCases = [numbers1, numbers2, numbers3, numbers4, numbers5];

testCases.forEach((arr, index) => {
  const result = findMaxAndSecondMax(arr);
  console.log(`\nTest Case ${index + 1}: [${arr.join(", ")}]`);
  console.log(`  Maximum: ${result.max}`);
  console.log(
    `  Second Maximum: ${result.secondMax !== null ? result.secondMax : "Not enough unique values"}`
  );
});
console.log("");

// ============================================
// COMPREHENSIVE FUNCTION: Find both values
// ============================================
console.log("=".repeat(60));
console.log("COMPREHENSIVE FUNCTION: Find both values");
console.log("=".repeat(60));

function findMaxValues(arr) {
  if (!arr || arr.length === 0) {
    return {
      max: null,
      secondMax: null,
      message: "Array is empty",
    };
  }

  // Remove duplicates first
  const unique = [...new Set(arr)];
  
  if (unique.length === 1) {
    return {
      max: unique[0],
      secondMax: null,
      message: "All values are same",
    };
  }

  if (unique.length === 0) {
    return {
      max: null,
      secondMax: null,
      message: "No valid values",
    };
  }

  // Sort ascending
  const sorted = unique.sort((a, b) => a - b);

  const max = sorted[sorted.length - 1];
  const secondMax = sorted.length >= 2 ? sorted[sorted.length - 2] : null;

  return {
    max,
    secondMax,
    message: secondMax !== null ? "Success" : "Not enough unique values",
  };
}

// Test with all arrays
testCases.forEach((arr, index) => {
  const result = findMaxValues(arr);
  console.log(`\nArray ${index + 1}: [${arr.join(", ")}]`);
  console.log(`  Maximum: ${result.max}`);
  console.log(`  Second Maximum: ${result.secondMax}`);
  console.log(`  Message: ${result.message}`);
});
console.log("");

// ============================================
// KEY TAKEAWAYS
// ============================================
console.log("=".repeat(60));
console.log("KEY TAKEAWAYS");
console.log("=".repeat(60));
console.log(`
FINDING MAXIMUM VALUE:

1. Math.max() with spread operator - Easiest
   - Syntax: Math.max(...array)
   - Best for: Simple arrays, small size

2. Math.max() with apply() - Alternative
   - Syntax: Math.max.apply(null, array)
   - Best for: Older JavaScript versions

3. reduce() - Functional approach
   - Syntax: array.reduce((max, current) => current > max ? current : max)
   - Best for: Functional programming style

4. sort() and last element - Simple
   - Syntax: [...array].sort((a,b) => a-b)[array.length-1]
   - Best for: When you need sorted array

5. for loop - Traditional
   - Syntax: Loop through and compare
   - Best for: Maximum control, performance critical

FINDING SECOND MAXIMUM VALUE:

1. Remove duplicates + sort + second last - Easiest
   - Use Set to remove duplicates
   - Sort array
   - Get second last element
   - Best for: Simple understanding

2. Single loop - Track max and second max - Efficient
   - Track both values in one loop
   - Update both when needed
   - Best for: Performance, large arrays

3. Two pass loop - Clear logic
   - First pass: Find max
   - Second pass: Find second max (different from max)
   - Best for: Easy to understand

4. reduce() - Functional approach
   - Track both max and second max in accumulator
   - Best for: Functional programming style

IMPORTANT NOTES:

- Second maximum na, duplicates consider pannathu
- Example: [10, 10, 5] la, max = 10, second max = 5 (not 10)
- All values same irundha, second max null ah irukkum
- Array length < 2 irundha, second max null ah irukkum
`);
