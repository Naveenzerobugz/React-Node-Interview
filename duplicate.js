/*
 * REMOVE DUPLICATES EXPLANATION (Tanglish):
 *
 * Duplicate removal na, array la same values irundha, avanga ah remove pannum.
 * Different methods use pannalam - each method ku advantages irukkum.
 *
 * METHOD 1: Using Set (Easiest and Fastest)
 * - Set na, unique values mattum store pannum (duplicates automatically remove aagum)
 * - Array ah Set ku convert pannitu, again array ku convert pannum
 * - Syntax: [...new Set(array)]
 *
 * METHOD 2: Using filter() and indexOf()
 * - filter() na, condition satisfy aana values mattum return pannum
 * - indexOf() na, first occurrence oda index ah return pannum
 * - Logic: value oda current index = first occurrence index na, unique ah irukkum
 * - Syntax: array.filter((value, index) => array.indexOf(value) === index)
 *
 * METHOD 3: Using Map for Objects (Object-based duplicates)
 * - Objects ku Set work aagathu (objects are compared by reference, not value)
 * - Map use pannum, unique key (like product_id) basis la duplicates remove pannum
 * - Syntax: [...new Map(array.map(item => [key, item])).values()]
 *
 * When to use which method:
 * - Set: Simple arrays (numbers, strings) - fastest and cleanest
 * - filter + indexOf: When you need more control or browser compatibility
 * - Map: Objects with unique identifiers (product_id, id, etc.)
 */

// ============================================
// METHOD 1: Using Set (Numbers)
// ============================================
console.log("=".repeat(50));
console.log("METHOD 1: Remove duplicates using Set (Numbers)");
console.log("=".repeat(50));

const one = [1, 2, 1, 3, 4, 3, 2];
console.log("Original array:", one);

// Set na unique values mattum store pannum
// Spread operator (...) use pannitu Set ah array ku convert pannum
// Ithu easiest and fastest method
const uniqueWithSet = [...new Set(one)];
console.log("After removing duplicates (Set method):", uniqueWithSet);
console.log("");

// ============================================
// METHOD 2: Using filter() and indexOf() (Numbers)
// ============================================
console.log("=".repeat(50));
console.log("METHOD 2: Remove duplicates using filter() + indexOf() (Numbers)");
console.log("=".repeat(50));

// filter() - condition satisfy aana values mattum return pannum
// indexOf(value) - value oda first occurrence oda index ah return pannum
// Logic: current index === first occurrence index na, unique ah irukkum
// Example: [1, 2, 1, 3]
//   - index 0: value=1, indexOf(1)=0, 0===0 ✓ (keep)
//   - index 1: value=2, indexOf(2)=1, 1===1 ✓ (keep)
//   - index 2: value=1, indexOf(1)=0, 2===0 ✗ (remove - duplicate)
//   - index 3: value=3, indexOf(3)=3, 3===3 ✓ (keep)
const uniqueWithFilter = one.filter(
  (value, index) => one.indexOf(value) === index
);
console.log("After removing duplicates (filter method):", uniqueWithFilter);
console.log("");

// ============================================
// METHOD 2: Using filter() and indexOf() (Strings)
// ============================================
console.log("=".repeat(50));
console.log("METHOD 2: Remove duplicates using filter() + indexOf() (Strings)");
console.log("=".repeat(50));

const letters = ["a", "b", "a", "c", "b"];
console.log("Original array:", letters);

const uniqueLetters = letters.filter(
  (value, index) => letters.indexOf(value) === index
);
console.log("After removing duplicates:", uniqueLetters); // ['a', 'b', 'c']
console.log("");

// ============================================
// METHOD 3: Remove duplicates from Objects using Map
// ============================================
console.log("=".repeat(50));
console.log("METHOD 3: Remove duplicates from Objects using Map");
console.log("=".repeat(50));

// Objects array - products with product_id
const products = [
  { product_id: 1, name: "Laptop", price: 50000 },
  { product_id: 2, name: "Mouse", price: 500 },
  { product_id: 1, name: "Laptop", price: 50000 }, // Duplicate (same product_id)
  { product_id: 3, name: "Keyboard", price: 2000 },
  { product_id: 2, name: "Mouse", price: 500 }, // Duplicate (same product_id)
  { product_id: 4, name: "Monitor", price: 15000 },
];

console.log("Original products array:");
console.log(JSON.stringify(products, null, 2));
console.log("");

// Map use pannum - product_id ah key ah use pannum
// Map la same key irundha, latest value ah replace pannum (or first value keep pannum)
// Step by step:
// 1. products.map() - each product ah [product_id, product] array ah convert pannum
// 2. new Map() - Map object create pannum (duplicate keys automatically remove aagum)
// 3. .values() - Map la values (products) mattum get pannum
// 4. [... ] - Spread operator use pannitu array ku convert pannum

// Method 3a: Keep first occurrence (when duplicate found)
const uniqueProductsFirst = [
  ...new Map(products.map((product) => [product.product_id, product])).values(),
];
console.log("Unique products (keeping first occurrence):");
console.log(JSON.stringify(uniqueProductsFirst, null, 2));
console.log("");

// Method 3b: Keep last occurrence (when duplicate found)
// Reverse pannitu, again reverse pannum - last occurrence keep aagum
const uniqueProductsLast = [
  ...new Map(
    products
      .slice()
      .reverse()
      .map((product) => [product.product_id, product])
  ).values(),
].reverse();
console.log("Unique products (keeping last occurrence):");
console.log(JSON.stringify(uniqueProductsLast, null, 2));
console.log("");

// Method 3c: Using filter() for objects (alternative method)
// Objects ku filter + findIndex() use pannalam
const uniqueProductsFilter = products.filter(
  (product, index) =>
    products.findIndex((p) => p.product_id === product.product_id) === index
);
console.log("Unique products (using filter + findIndex):");
console.log(JSON.stringify(uniqueProductsFilter, null, 2));
console.log("");

// ============================================
// COMPARISON: Which method to use?
// ============================================
console.log("=".repeat(50));
console.log("WHICH METHOD TO USE?");
console.log("=".repeat(50));
console.log(`
1. Set Method:
   - Use: Simple arrays (numbers, strings)
   - Pros: Fastest, cleanest code
   - Cons: Objects ku work aagathu

2. filter() + indexOf():
   - Use: Simple arrays, browser compatibility needed
   - Pros: More control, works everywhere
   - Cons: Slightly slower than Set

3. Map Method (for objects):
   - Use: Arrays of objects with unique identifiers
   - Pros: Perfect for objects, handles duplicates well
   - Cons: Need unique key (like product_id, id, etc.)

4. filter() + findIndex() (for objects):
   - Use: Arrays of objects, alternative to Map
   - Pros: More readable, flexible
   - Cons: Slightly slower than Map for large arrays
`);
