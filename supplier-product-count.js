/*
 * SUPPLIER-BASED PRODUCT COUNT EXPLANATION (Tanglish):
 *
 * Ithu oru products array la, each supplier ku enna products irukkum nu count pannum.
 * Result ah object la return pannum - key = supplier name, value = product count.
 *
 * Example:
 * Input: Products array with supplier field
 * Output: { supplier: 2, supplier1: 3, supplier2: 1 }
 *
 * Explanation:
 * - supplier1 ku 3 products irukkum
 * - supplier2 ku 1 product irukkum
 * - supplier3 ku 2 products irukkum
 *
 * Multiple methods irukkum:
 * 1. Using reduce() - Clean and functional approach
 * 2. Using forEach() - Simple and readable
 * 3. Using for loop - Traditional approach
 * 4. Using Map - Modern approach
 */

console.log("=".repeat(60));
console.log("SUPPLIER-BASED PRODUCT COUNT");
console.log("=".repeat(60));

// Sample products array with supplier information
const products = [
  { id: 1, name: "Laptop", supplier: "supplier1", price: 50000 },
  { id: 2, name: "Mouse", supplier: "supplier1", price: 500 },
  { id: 3, name: "Keyboard", supplier: "supplier2", price: 2000 },
  { id: 4, name: "Monitor", supplier: "supplier1", price: 15000 },
  { id: 5, name: "Webcam", supplier: "supplier3", price: 3000 },
  { id: 6, name: "Headphones", supplier: "supplier3", price: 2000 },
  { id: 7, name: "Speaker", supplier: "supplier1", price: 5000 },
];

console.log("Input products array:");
console.log(JSON.stringify(products, null, 2));
console.log("");
console.log("Expected output: { supplier1: 3, supplier2: 1, supplier3: 2 }");
console.log("");

// ============================================
// METHOD 1: Using reduce() (Most Popular)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 1: Using reduce()");
console.log("=".repeat(60));

// reduce() na array ah single value ku convert pannum
// Step by step:
// 1. Empty object {} start pannum (accumulator)
// 2. Each product ku:
//    - product.supplier already object la irundha, count ah increment pannum
//    - product.supplier object la illana, 1 ah set pannum
// 3. Final object ah return pannum

const supplierCount1 = products.reduce((acc, product) => {
  // product.supplier already object la irundha, count ah increment pannum
  // Illana, 1 ah set pannum
  acc[product.supplier] = (acc[product.supplier] || 0) + 1;
  return acc; // Updated object ah return pannum
}, {}); // Empty object {} ah initial value ah use pannum

console.log("Result:", supplierCount1);
console.log("");

// Step by step breakdown:
console.log("Step by step breakdown:");
const stepByStep = {};
products.forEach((product, index) => {
  const supplier = product.supplier;
  const prevCount = stepByStep[supplier] || 0;
  stepByStep[supplier] = prevCount + 1;
  console.log(
    `  Step ${index + 1}: product=${product.name}, supplier=${supplier}, count so far=${JSON.stringify(
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

const supplierCount2 = {};

// forEach() na each product ku function execute pannum
// Object la supplier count ah track pannum
products.forEach((product) => {
  const supplier = product.supplier;
  
  // Supplier already object la irundha, count ah increment
  // Illana, 1 ah set pannum
  if (supplierCount2[supplier]) {
    supplierCount2[supplier]++; // Count ah increment pannum
  } else {
    supplierCount2[supplier] = 1; // First time la, 1 ah set pannum
  }
});

console.log("Result:", supplierCount2);
console.log("");

// ============================================
// METHOD 3: Using for loop (Traditional)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 3: Using for loop");
console.log("=".repeat(60));

const supplierCount3 = {};

// Traditional for loop - each product ku iterate pannum
for (let i = 0; i < products.length; i++) {
  const product = products[i];
  const supplier = product.supplier;
  
  // Same logic - supplier already object la irundha increment, illana 1
  if (supplierCount3[supplier]) {
    supplierCount3[supplier]++;
  } else {
    supplierCount3[supplier] = 1;
  }
}

console.log("Result:", supplierCount3);
console.log("");

// ============================================
// METHOD 4: Using Map (Modern Approach)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 4: Using Map");
console.log("=".repeat(60));

// Map use pannum - similar to object, but Map ah use pannum
const supplierMap = new Map();

products.forEach((product) => {
  const supplier = product.supplier;
  
  // Map la get() use pannum current count ah get panna
  // set() use pannum count ah update panna
  const currentCount = supplierMap.get(supplier) || 0;
  supplierMap.set(supplier, currentCount + 1);
});

// Map ah object ku convert pannum
const supplierCount4 = Object.fromEntries(supplierMap);

console.log("Result:", supplierCount4);
console.log("");

// ============================================
// METHOD 5: With formatted output (User-friendly)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 5: Formatted Output (User-friendly)");
console.log("=".repeat(60));

const supplierCount5 = products.reduce((acc, product) => {
  acc[product.supplier] = (acc[product.supplier] || 0) + 1;
  return acc;
}, {});

// Formatted string ah create pannum - "supplier1: 3 products" format
const formattedOutput = Object.entries(supplierCount5)
  .map(([supplier, count]) => `${supplier}: ${count} product${count > 1 ? 's' : ''}`)
  .join(", ");

console.log("Result object:", supplierCount5);
console.log("Formatted output:", formattedOutput);
console.log("");

// ============================================
// METHOD 6: Group products by supplier (Detailed)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 6: Group products by supplier (Detailed)");
console.log("=".repeat(60));

// Not just count, but actual products ah group pannum
const productsBySupplier = products.reduce((acc, product) => {
  const supplier = product.supplier;
  
  // Supplier already object la illana, empty array create pannum
  if (!acc[supplier]) {
    acc[supplier] = [];
  }
  
  // Product ah supplier ku add pannum
  acc[supplier].push(product);
  return acc;
}, {});

// Count ah calculate pannum
const supplierCount6 = Object.keys(productsBySupplier).reduce((acc, supplier) => {
  acc[supplier] = productsBySupplier[supplier].length;
  return acc;
}, {});

console.log("Products grouped by supplier:");
console.log(JSON.stringify(productsBySupplier, null, 2));
console.log("");
console.log("Supplier product counts:", supplierCount6);
console.log("");

// ============================================
// METHOD 7: Filter and count (Alternative approach)
// ============================================
console.log("=".repeat(60));
console.log("METHOD 7: Filter and count (Alternative approach)");
console.log("=".repeat(60));

// Get unique suppliers first
const uniqueSuppliers = [...new Set(products.map((p) => p.supplier))];

// Each supplier ku, filter use pannitu count pannum
const supplierCount7 = {};
uniqueSuppliers.forEach((supplier) => {
  // Filter use pannitu supplier match aana products mattum get pannum
  // Length use pannitu count ah get pannum
  supplierCount7[supplier] = products.filter((p) => p.supplier === supplier).length;
});

console.log("Unique suppliers:", uniqueSuppliers);
console.log("Result:", supplierCount7);
console.log("");

// ============================================
// VERIFICATION
// ============================================
console.log("=".repeat(60));
console.log("VERIFICATION");
console.log("=".repeat(60));

const expected = { supplier1: 3, supplier2: 1, supplier3: 2 };

console.log("Expected:", expected);
console.log("Got (Method 1):", supplierCount1);

// All methods same result ah return pannuma nu check pannum
const allMatch =
  JSON.stringify(supplierCount1) === JSON.stringify(expected) &&
  JSON.stringify(supplierCount2) === JSON.stringify(expected) &&
  JSON.stringify(supplierCount3) === JSON.stringify(expected) &&
  JSON.stringify(supplierCount4) === JSON.stringify(expected) &&
  JSON.stringify(supplierCount6) === JSON.stringify(expected) &&
  JSON.stringify(supplierCount7) === JSON.stringify(expected);

console.log("All methods produce correct result:", allMatch ? "✓ Yes" : "✗ No");
console.log("");

// ============================================
// REAL-WORLD EXAMPLE: Display supplier statistics
// ============================================
console.log("=".repeat(60));
console.log("REAL-WORLD EXAMPLE: Supplier Statistics");
console.log("=".repeat(60));

const supplierStats = products.reduce((acc, product) => {
  const supplier = product.supplier;
  
  if (!acc[supplier]) {
    acc[supplier] = {
      count: 0,
      totalValue: 0,
      products: [],
    };
  }
  
  acc[supplier].count++;
  acc[supplier].totalValue += product.price;
  acc[supplier].products.push(product.name);
  
  return acc;
}, {});

console.log("Detailed Supplier Statistics:");
Object.entries(supplierStats).forEach(([supplier, stats]) => {
  console.log(`\n${supplier}:`);
  console.log(`  - Product Count: ${stats.count}`);
  console.log(`  - Total Value: ₹${stats.totalValue.toLocaleString()}`);
  console.log(`  - Products: ${stats.products.join(", ")}`);
});
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
   - Syntax: products.reduce((acc, product) => {...}, {})
   - Access supplier: product.supplier

2. forEach() - Simple and readable
   - Best for: Easy to understand
   - Syntax: products.forEach((product) => {...})
   - Access supplier: product.supplier

3. for loop - Traditional approach
   - Best for: Maximum control, performance critical
   - Syntax: for (let i = 0; i < products.length; i++)
   - Access supplier: products[i].supplier

4. Map - Modern approach
   - Best for: When you need Map features
   - Syntax: new Map() with get() and set()

5. Filter + count - Alternative approach
   - Best for: When you need unique suppliers first
   - Syntax: filter() to get products per supplier

6. All methods same result ah return pannum
   - Choose based on your coding style and requirements

IMPORTANT:
- product.supplier ah access pannum (object property)
- Count ah increment pannum (similar to frequency counting)
- Result ah object la return pannum
`);
