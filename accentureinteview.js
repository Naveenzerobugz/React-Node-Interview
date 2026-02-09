/*
 * ACCENTURE INTERVIEW QUESTIONS EXPLANATION (Tanglish):
 *
 * This file contains common interview questions about:
 * 1. HOISTING - Variable declaration and initialization behavior
 * 2. CLOSURE - Function accessing outer scope variables
 * 3. VAR vs LET - Block scope vs function scope
 * 4. EVENT LOOP - setTimeout behavior with loops
 */

console.log("=".repeat(60));
console.log("ACCENTURE INTERVIEW QUESTIONS");
console.log("=".repeat(60));

// ============================================
// QUESTION 1: HOISTING (Variable Declaration)
// ============================================
console.log("\n" + "=".repeat(60));
console.log("QUESTION 1: HOISTING");
console.log("=".repeat(60));

/*
 * HOISTING EXPLANATION:
 *
 * Hoisting na, JavaScript la variable and function declarations ah
 * automatically top ku move pannum (before code execution).
 *
 * Rules:
 * 1. var declarations ah hoisted pannum (undefined ah initialize aagum)
 * 2. let and const ah hoisted pannum, but "Temporal Dead Zone" la irukkum
 *    (use panna munnadi initialize pannanum)
 * 3. Function declarations ah completely hoisted pannum (use panna mudiyum)
 *
 * Example 1: var hoisting
 */

console.log("\n--- Example 1a: var hoisting ---");
console.log("Original code:");
console.log("  var a;");
console.log("  console.log(a); // undefined");
console.log("  a = 10;");

// var declaration ah hoisted pannum - undefined ah initialize aagum
var a;
console.log("Result: a =", a); // undefined - hoisted and initialized with undefined
a = 10;
console.log("After assignment: a =", a); // 10

console.log("\n--- Example 1b: let hoisting (Temporal Dead Zone) ---");
console.log("Original code:");
console.log("  console.log(b); // Error: Cannot access before initialization");
console.log("  let b = 10;");

// let declaration ah hoisted pannum, but TDZ la irukkum
// Use panna munnadi initialize pannanum
try {
  console.log(b); // Error: Cannot access 'b' before initialization
} catch (error) {
  console.log("Error:", error.message);
}
let b = 10;
console.log("After declaration: b =", b); // 10

console.log("\n--- Example 1c: const hoisting ---");
try {
  console.log(c); // Error: Cannot access before initialization
} catch (error) {
  console.log("Error:", error.message);
}
const c = 20;
console.log("After declaration: c =", c); // 20

console.log("\nKEY TAKEAWAY:");
console.log("var: hoisted and initialized with undefined");
console.log("let/const: hoisted but in TDZ (must initialize before use)");

// ============================================
// FUNCTION HOISTING (Added Section)
// ============================================
console.log("\n" + "=".repeat(60));
console.log("FUNCTION HOISTING");
console.log("=".repeat(60));

/*
 * FUNCTION HOISTING EXPLANATION:
 *
 * Functions um hoisting pannum, but different ways la:
 * 1. Function Declaration - Fully hoisted (complete function available)
 * 2. Function Expression - Not hoisted (only variable declaration hoisted)
 * 3. Arrow Function - Not hoisted (only variable declaration hoisted)
 *
 * Rules:
 * - Function declarations ah completely hoisted pannum
 * - Function call panna munnadi function define pannalum work aagum
 * - Function expressions and arrow functions na variable hoisting mattum
 */

console.log("\n--- Example 1a: Function Declaration (Fully Hoisted) ---");
console.log("Code order:");
console.log("  add(5, 3); // Function call BEFORE declaration");
console.log("  function add(a, b) { return a + b; }");

// Function declaration na fully hoisted pannum
// Function call panna munnadi define pannalum work aagum
console.log("Result:", add(5, 3)); // 8 - Works! Function is hoisted

function add(a, b) {
  return a + b;
}

console.log("Explanation: Function declaration ah completely hoisted pannum");
console.log("Even though call munnadi irukkum, function available ah irukkum");
console.log("");

console.log("\n--- Example 1b: Multiple Function Declarations ---");
console.log("Code:");
console.log("  console.log(multiply(4, 3));");
console.log("  function multiply(a, b) { return a * b; }");
console.log("  function multiply(a, b) { return a * b * 2; } // Redeclared");

// Last declaration win aagum (overwrites previous)
console.log("Result:", multiply(4, 3)); // 24 (4 * 3 * 2) - Last declaration wins

function multiply(a, b) {
  return a * b;
}

function multiply(a, b) {
  return a * b * 2; // This overwrites the previous one
}

console.log(
  "Explanation: Same function name irundha, last declaration win aagum"
);
console.log("");

console.log("\n--- Example 2a: Function Expression (NOT Fully Hoisted) ---");
console.log("Code:");
console.log(
  "  console.log(subtract(10, 5)); // Error: Cannot access before initialization"
);
console.log("  const subtract = function(a, b) { return a - b; };");

// Function expression na fully hoisted aagathu
// Only variable declaration hoisted aagum (TDZ la irukkum)
try {
  console.log("Result:", subtract(10, 5)); // Error
} catch (error) {
  console.log("Error:", error.message); // Cannot access 'subtract' before initialization
}

const subtract = function (a, b) {
  return a - b;
};

console.log("After declaration:", subtract(10, 5)); // 5 - Now works
console.log("Explanation: Function expression na fully hoisted aagathu");
console.log("Only variable declaration hoisted, but TDZ la irukkum");
console.log("");

console.log(
  "\n--- Example 2b: Function Expression with VAR (Partially Hoisted) ---"
);
console.log("Code:");
console.log("  console.log(divide); // undefined");
console.log("  console.log(divide(10, 2)); // Error: divide is not a function");
console.log("  var divide = function(a, b) { return a / b; };");

// var use pannum - variable hoisted and initialized with undefined
// But function itself hoisted aagathu
console.log("divide value before assignment:", divide); // undefined

try {
  console.log("Result:", divide(10, 2)); // Error: divide is not a function
} catch (error) {
  console.log("Error:", error.message); // divide is not a function
}

var divide = function (a, b) {
  return a / b;
};

console.log("After assignment:", divide(10, 2)); // 5 - Now works
console.log(
  "Explanation: var declaration hoisted (undefined), but function not hoisted"
);
console.log("");

console.log("\n--- Example 3a: Arrow Function (NOT Fully Hoisted) ---");
console.log("Code:");
console.log(
  "  console.log(square(5)); // Error: Cannot access before initialization"
);
console.log("  const square = (n) => n * n;");

// Arrow function na function expression madhiri - fully hoisted aagathu
try {
  console.log("Result:", square(5)); // Error
} catch (error) {
  console.log("Error:", error.message); // Cannot access 'square' before initialization
}

const square = (n) => n * n;

console.log("After declaration:", square(5)); // 25 - Now works
console.log("Explanation: Arrow function na function expression madhiri");
console.log("Fully hoisted aagathu, TDZ la irukkum");
console.log("");

console.log("\n--- Example 3b: Arrow Function with VAR ---");
console.log("Code:");
console.log("  console.log(cube); // undefined");
console.log("  console.log(cube(3)); // Error: cube is not a function");
console.log("  var cube = (n) => n * n * n;");

// var use pannum - same behavior as function expression
console.log("cube value before assignment:", cube); // undefined

try {
  console.log("Result:", cube(3)); // Error
} catch (error) {
  console.log("Error:", error.message); // cube is not a function
}

var cube = (n) => n * n * n;

console.log("After assignment:", cube(3)); // 27 - Now works
console.log("Explanation: Arrow function with var na same behavior");
console.log("");

console.log("\n--- Example 4: Mixed Hoisting (Function and Variable) ---");
console.log("Code:");
console.log(
  "  console.log(typeof myFunc); // function (function declaration wins)"
);
console.log("  function myFunc() { return 'function declaration'; }");
console.log("  var myFunc = 'variable';");

// Function declaration na variable declaration ku munnadi hoisted aagum
// Function declaration win aagum (even though var redeclares it)
console.log("Type of myFunc:", typeof myFunc); // function

function myFunc() {
  return "function declaration";
}

var myFunc = "variable"; // This assignment happens after

console.log("After var assignment:", myFunc); // 'variable' - Assignment changes value
console.log("Explanation: Function declaration hoisted first, then variable");
console.log("But var assignment runtime la execute aagum");
console.log("");

console.log(
  "\n--- Example 5: Function Call Before Declaration (Real Example) ---"
);
console.log("Code:");
console.log("  calculateSum(10, 20, 30);");
console.log("  function calculateSum(...numbers) {");
console.log("    return numbers.reduce((sum, num) => sum + num, 0);");
console.log("  }");

// Function declaration na fully hoisted - call munnadi define pannalum work aagum
function calculateSum(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

const result = calculateSum(10, 20, 30);
console.log("Result of calculateSum(10, 20, 30):", result); // 60
console.log("This works because function declaration is fully hoisted");
console.log("");

console.log("\n" + "=".repeat(60));
console.log("FUNCTION HOISTING SUMMARY");
console.log("=".repeat(60));
console.log(`
1. FUNCTION DECLARATION (function keyword):
   - Fully hoisted (complete function available)
   - Can call before declaration
   - Example: function add() { }
   - ✅ Hoisted: Yes (complete function)
   - ✅ Call before: Works

2. FUNCTION EXPRESSION (const/let):
   - Variable hoisted (but TDZ la irukkum)
   - Cannot call before declaration
   - Example: const add = function() { }
   - ❌ Hoisted: No (only variable, but TDZ)
   - ❌ Call before: Error

3. FUNCTION EXPRESSION (var):
   - Variable hoisted (undefined ah initialize aagum)
   - Cannot call before assignment
   - Example: var add = function() { }
   - ⚠️ Hoisted: Partial (variable only, undefined)
   - ❌ Call before: Error (not a function)

4. ARROW FUNCTION (const/let):
   - Variable hoisted (but TDZ la irukkum)
   - Cannot call before declaration
   - Example: const add = () => { }
   - ❌ Hoisted: No (only variable, but TDZ)
   - ❌ Call before: Error

5. ARROW FUNCTION (var):
   - Variable hoisted (undefined ah initialize aagum)
   - Cannot call before assignment
   - Example: var add = () => { }
   - ⚠️ Hoisted: Partial (variable only, undefined)
   - ❌ Call before: Error (not a function)

PRIORITY ORDER (when same name):
1. Function declaration (hoisted first)
2. Variable declaration (hoisted second)
3. Variable assignment (runtime)
`);

// ============================================
// QUESTION 2: CLOSURE (Fixed and Explained)
// ============================================
console.log("\n" + "=".repeat(60));
console.log("QUESTION 2: CLOSURE (Fixed Version)");
console.log("=".repeat(60));

/*
 * CLOSURE EXPLANATION:
 *
 * Closure na, inner function outer scope oda variables ah access panna mudiyum,
 * even after outer function return aachu.
 *
 * Closure = Function + its lexical environment (outer variables)
 *
 * How it works:
 * 1. Inner function outer variables ah "remember" pannum
 * 2. Outer function return aachum, but closure variables ah keep pannum
 * 3. Each closure has its own copy of variables
 */

console.log("\n--- Original Code (Has Errors) ---");
console.log("// function closure() {");
console.log("//   let a = 10;");
console.log("//   function count () {");
console.log("//     a = a++  // ERROR: Should be a++ or a = a + 1");
console.log("//   }");
console.log("// }");
console.log("// cons insitance = closure();  // ERROR: Typo");
console.log("// instance.count();");

console.log("\n--- Fixed Closure Example ---");

// FIXED VERSION: Proper closure implementation
function closure() {
  let a = 10; // Outer scope variable

  // Inner function ah return pannum - closure form aagum
  // This function still has access to variable 'a' even after closure() returns
  function count() {
    a++; // Increment outer variable
    console.log(`Count value: ${a}`);
    return a; // Return updated value
  }

  return count; // Return inner function (this creates closure)
}

// Closure create pannum - inner function ah get pannum
const instance = closure(); // 'instance' na inner function ah store pannum

console.log("First call:");
instance(); // 11 - closure la variable 'a' ah remember pannum

console.log("Second call:");
instance(); // 12 - same closure, so 'a' continues from 11

console.log("Third call:");
instance(); // 13 - 'a' value persist aagum (closure memory)

console.log("\n--- Multiple Instances (Separate Closures) ---");
const instance1 = closure(); // New closure with a = 10
const instance2 = closure(); // Another new closure with a = 10

console.log("Instance 1:");
instance1(); // 11
instance1(); // 12

console.log("Instance 2:");
instance2(); // 11 (separate closure, starts fresh at 10)

console.log("\nKEY TAKEAWAY:");
console.log("Closure = Function remembers outer scope variables");
console.log("Each closure instance has its own copy of variables");

// ============================================
// QUESTION 3: FOR LOOP WITH VAR (Classic Problem)
// ============================================
console.log("\n" + "=".repeat(60));
console.log("QUESTION 3: FOR LOOP WITH VAR vs LET");
console.log("=".repeat(60));

/*
 * FOR LOOP WITH VAR EXPLANATION:
 *
 * Problem:
 * - var na function scope (or global scope) la work aagum
 * - Loop la var use pannalum, same variable ah share pannum
 * - setTimeout callback queue la add aagum (async)
 * - Loop complete aagum podhu, callback execute aagum
 * - By that time, i value final value (6) ah irukkum
 *
 * Solution:
 * - let na block scope - each iteration ku new variable
 * - Each setTimeout callback ku separate variable reference
 * - Correct values print aagum
 */

console.log("\n--- Example 3a: for loop with VAR (Problem) ---");
console.log("Code:");
console.log("  for (var i = 0; i <= 5; i++) {");
console.log("    setTimeout(() => {");
console.log("      console.log(i);");
console.log("    }, 0);");
console.log("  }");
console.log("\nExpected: 0, 1, 2, 3, 4, 5");
console.log("Actual output (will print after synchronous code):");

// var use pannum - function scope, same variable share aagum
for (var i = 0; i <= 5; i++) {
  // setTimeout callback queue la add aagum (async)
  // But i variable same ah share aagum (var is function scoped)
  setTimeout(() => {
    console.log(`  var i = ${i}`); // All will print 6 (final value)
  }, 0);
}

// Synchronous code first execute aagum
console.log("Synchronous code executed first (i =", i, ")");

// Wait a bit for async callbacks
setTimeout(() => {
  console.log("\n--- Why this happened? ---");
  console.log("1. Loop runs completely (i becomes 6)");
  console.log("2. setTimeout callbacks added to callback queue");
  console.log("3. By the time callbacks execute, i = 6 (final value)");
  console.log("4. All callbacks reference same variable i = 6");
  console.log("");

  // ============================================
  // SOLUTION 1: Using LET (Block Scope)
  // ============================================
  console.log("=".repeat(60));
  console.log("SOLUTION 1: Using LET (Block Scope)");
  console.log("=".repeat(60));

  console.log("\nCode:");
  console.log("  for (let j = 0; j <= 5; j++) {");
  console.log("    setTimeout(() => {");
  console.log("      console.log(j);");
  console.log("    }, 0);");
  console.log("  }");
  console.log("\nExpected: 0, 1, 2, 3, 4, 5");
  console.log("Actual output:");

  // let use pannum - block scope, each iteration ku new variable
  for (let j = 0; j <= 5; j++) {
    // Each iteration ku new 'j' variable create aagum
    // Each setTimeout callback ku separate 'j' reference irukkum
    setTimeout(() => {
      console.log(`  let j = ${j}`); // Correct values: 0, 1, 2, 3, 4, 5
    }, 0);
  }

  setTimeout(() => {
    console.log("\n--- Why LET works? ---");
    console.log("1. let na block scope - each iteration ku new variable");
    console.log("2. Each setTimeout callback ku separate variable reference");
    console.log(
      "3. Closure form aagum - each callback its own j value ah remember pannum"
    );
    console.log("");

    // ============================================
    // SOLUTION 2: Using IIFE (Immediately Invoked Function Expression)
    // ============================================
    console.log("=".repeat(60));
    console.log("SOLUTION 2: Using IIFE with VAR");
    console.log("=".repeat(60));

    console.log("\nCode:");
    console.log("  for (var k = 0; k <= 5; k++) {");
    console.log("    (function(index) {");
    console.log("      setTimeout(() => {");
    console.log("        console.log(index);");
    console.log("      }, 0);");
    console.log("    })(k);");
    console.log("  }");

    // IIFE use pannum - each iteration ku separate closure create pannum
    for (var k = 0; k <= 5; k++) {
      // IIFE create pannum - k value ah parameter ah pass pannum
      // Each IIFE ku separate closure form aagum
      (function (index) {
        // index na IIFE parameter - separate variable
        setTimeout(() => {
          console.log(`  IIFE index = ${index}`); // Correct: 0, 1, 2, 3, 4, 5
        }, 0);
      })(k); // k value ah parameter ah pass pannum
    }

    setTimeout(() => {
      console.log("\n--- Why IIFE works? ---");
      console.log("1. IIFE create pannum - separate function scope");
      console.log("2. Each iteration ku separate closure with separate index");
      console.log("3. k value ah parameter ah pass pannum (by value)");
      console.log("");

      // ============================================
      // SOLUTION 3: Using bind()
      // ============================================
      console.log("=".repeat(60));
      console.log("SOLUTION 3: Using bind() or call()");
      console.log("=".repeat(60));

      function logValue(value) {
        console.log(`  bind() value = ${value}`);
      }

      for (var m = 0; m <= 5; m++) {
        // bind() use pannum - value ah parameter ah bind pannum
        setTimeout(logValue.bind(null, m), 0); // Correct: 0, 1, 2, 3, 4, 5
      }

      setTimeout(() => {
        console.log("\n--- Summary ---");
        console.log("=".repeat(60));
        console.log("VAR IN FOR LOOP:");
        console.log("  - Function scope - same variable shared");
        console.log("  - All callbacks reference final value");
        console.log("  - Output: 6, 6, 6, 6, 6, 6");
        console.log("");
        console.log("LET IN FOR LOOP:");
        console.log("  - Block scope - new variable each iteration");
        console.log("  - Each callback has separate variable reference");
        console.log("  - Output: 0, 1, 2, 3, 4, 5");
        console.log("");
        console.log("SOLUTIONS:");
        console.log("  1. Use LET (easiest and recommended)");
        console.log("  2. Use IIFE to create separate closure");
        console.log("  3. Use bind() to pass value as parameter");
      }, 100);
    }, 100);
  }, 100);
}, 100);
