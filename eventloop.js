/*
 * EVENT LOOP EXPLANATION (Tanglish):
 *
 * Event Loop na, JavaScript engine oda heart. Ithu single-threaded ah irukkum,
 * but asynchronous operations handle pannum.
 *
 * How it works:
 * 1. Call Stack - Synchronous code execute aagum (LIFO - Last In First Out)
 * 2. Web APIs - setTimeout, fetch, DOM events (browser provide pannum)
 * 3. Callback Queue (Task Queue) - Callbacks ready aana podhu queue la add aagum
 * 4. Microtask Queue - Promises, queueMicrotask (higher priority)
 * 5. Event Loop - Continuously check pannum, stack empty aana podhu queue la irukka
 *    callbacks ah stack ku move pannum
 *
 * Priority Order:
 * 1. Call Stack (synchronous code) - First execute aagum
 * 2. Microtask Queue (Promises, queueMicrotask) - Second execute aagum
 * 3. Callback Queue (setTimeout, setInterval) - Last execute aagum
 *
 * Important:
 * - Microtask queue always callback queue ku munnadi execute aagum
 * - Event loop microtask queue ah completely empty pannum, appuram callback queue ku
 *   move aagum
 */

console.log("=".repeat(60));
console.log("EVENT LOOP EXAMPLES");
console.log("=".repeat(60));

// ============================================
// EXAMPLE 1: Basic Synchronous Code
// ============================================
console.log("\nEXAMPLE 1: Synchronous Code Execution");
console.log("-".repeat(60));

console.log("1. First synchronous log");
console.log("2. Second synchronous log");
console.log("3. Third synchronous log");

// Output: 1, 2, 3 (in order - synchronous execution)

// ============================================
// EXAMPLE 2: setTimeout (Macrotask)
// ============================================
console.log("\nEXAMPLE 2: setTimeout (Macrotask - Callback Queue)");
console.log("-".repeat(60));

console.log("A. Before setTimeout");

// setTimeout na Web API - callback queue la add aagum
// 0ms delay irundhalum, synchronous code complete aagum varai wait pannum
setTimeout(() => {
  console.log("B. Inside setTimeout (0ms delay)");
}, 0);

console.log("C. After setTimeout");

// Output: A, C, B
// Why? setTimeout callback queue la add aagum, synchronous code complete aagum
// appuram execute aagum

// ============================================
// EXAMPLE 3: Promise (Microtask)
// ============================================
console.log("\nEXAMPLE 3: Promise (Microtask - Higher Priority)");
console.log("-".repeat(60));

console.log("1. Before Promise");

// Promise.then() na microtask queue la add aagum
// Microtask queue always callback queue ku munnadi execute aagum
Promise.resolve().then(() => {
  console.log("2. Inside Promise.then()");
});

console.log("3. After Promise");

// Output: 1, 3, 2
// Promise microtask queue la add aagum, synchronous code complete aagum
// appuram execute aagum

// ============================================
// EXAMPLE 4: setTimeout vs Promise (Priority)
// ============================================
console.log("\nEXAMPLE 4: setTimeout vs Promise (Priority Comparison)");
console.log("-".repeat(60));

console.log("Start");

// setTimeout - Callback Queue (lower priority)
setTimeout(() => {
  console.log("setTimeout callback");
}, 0);

// Promise - Microtask Queue (higher priority)
Promise.resolve().then(() => {
  console.log("Promise.then() callback");
});

console.log("End");

// Output: Start, End, Promise.then() callback, setTimeout callback
// Why? Microtask queue (Promise) always callback queue (setTimeout) ku munnadi
// execute aagum

// ============================================
// EXAMPLE 5: Multiple setTimeout with Different Delays
// ============================================
console.log("\nEXAMPLE 5: Multiple setTimeout with Different Delays");
console.log("-".repeat(60));

console.log("Start");

setTimeout(() => {
  console.log("setTimeout 100ms");
}, 100);

setTimeout(() => {
  console.log("setTimeout 0ms");
}, 0);

setTimeout(() => {
  console.log("setTimeout 50ms");
}, 50);

console.log("End");

// Output: Start, End, setTimeout 0ms, setTimeout 50ms, setTimeout 100ms
// All setTimeout callbacks callback queue la add aagum, delay basis la
// execute aagum

// ============================================
// EXAMPLE 6: Promise Chain (Microtask Queue)
// ============================================
console.log("\nEXAMPLE 6: Promise Chain (Microtask Queue)");
console.log("-".repeat(60));

console.log("1. Start");

Promise.resolve()
  .then(() => {
    console.log("2. First .then()");
    return Promise.resolve();
  })
  .then(() => {
    console.log("3. Second .then()");
  });

console.log("4. End");

// Output: 1. Start, 4. End, 2. First .then(), 3. Second .then()
// All Promise callbacks microtask queue la add aagum, synchronous code
// complete aagum appuram execute aagum

// ============================================
// EXAMPLE 7: async/await (Promise wrapper)
// ============================================
console.log("\nEXAMPLE 7: async/await (Promise wrapper)");
console.log("-".repeat(60));

console.log("1. Before async function");

async function asyncFunction() {
  console.log("2. Inside async function (before await)");

  // await na Promise resolve aagum varai wait pannum
  // But code execution continue aagum (non-blocking)
  await Promise.resolve();

  console.log("3. Inside async function (after await)");
}

asyncFunction();

console.log("4. After async function call");

// Output: 1, 2, 4, 3
// async function immediately execute aagum, but await ku appuram code
// microtask queue la add aagum

// ============================================
// EXAMPLE 8: Complex Example - All Together
// ============================================
console.log("\nEXAMPLE 8: Complex Example - All Together");
console.log("-".repeat(60));

console.log("1. Synchronous - Start");

// setTimeout - Callback Queue
setTimeout(() => {
  console.log("6. setTimeout callback");
}, 0);

// Promise - Microtask Queue
Promise.resolve().then(() => {
  console.log("4. Promise.then() - First");

  // Nested Promise - Microtask Queue
  Promise.resolve().then(() => {
    console.log("5. Promise.then() - Nested");
  });
});

// Another setTimeout - Callback Queue
setTimeout(() => {
  console.log("7. setTimeout callback - Second");
}, 0);

console.log("2. Synchronous - Middle");

// Another Promise - Microtask Queue
Promise.resolve().then(() => {
  console.log("3. Promise.then() - Second");
});

console.log("3. Synchronous - End");

// Expected Output:
// 1. Synchronous - Start
// 2. Synchronous - Middle
// 3. Synchronous - End (Note: This might be "3" due to variable naming)
// 3. Promise.then() - Second (or might be "4" depending on execution)
// 4. Promise.then() - First
// 5. Promise.then() - Nested
// 6. setTimeout callback
// 7. setTimeout callback - Second

// ============================================
// EXAMPLE 9: setImmediate vs setTimeout (Node.js)
// ============================================
console.log("\nEXAMPLE 9: setImmediate vs setTimeout (Node.js specific)");
console.log("-".repeat(60));

console.log("Start");

// setImmediate - Check phase la execute aagum
if (typeof setImmediate !== "undefined") {
  setImmediate(() => {
    console.log("setImmediate callback");
  });
}

// setTimeout(0) - Timer phase la execute aagum
setTimeout(() => {
  console.log("setTimeout(0) callback");
}, 0);

console.log("End");

// In Node.js: Start, End, setImmediate callback, setTimeout(0) callback
// setImmediate usually setTimeout(0) ku munnadi execute aagum

// ============================================
// EXAMPLE 10: queueMicrotask (Explicit Microtask)
// ============================================
console.log("\nEXAMPLE 10: queueMicrotask (Explicit Microtask)");
console.log("-".repeat(60));

console.log("1. Start");

// queueMicrotask na explicitly microtask queue ku add pannum
queueMicrotask(() => {
  console.log("3. queueMicrotask callback");
});

setTimeout(() => {
  console.log("4. setTimeout callback");
}, 0);

console.log("2. End");

// Output: 1. Start, 2. End, 3. queueMicrotask callback, 4. setTimeout callback
// queueMicrotask microtask queue la add aagum, so setTimeout ku munnadi
// execute aagum

// ============================================
// VISUAL REPRESENTATION
// ============================================
console.log("\n" + "=".repeat(60));
console.log("EVENT LOOP VISUAL REPRESENTATION");
console.log("=".repeat(60));
console.log(`
┌─────────────────────────────────────────┐
│         CALL STACK (Synchronous)        │
│  - Executes immediately                 │
│  - LIFO (Last In First Out)            │
└─────────────────────────────────────────┘
              │
              │ (when empty)
              ▼
┌─────────────────────────────────────────┐
│      EVENT LOOP (Continuous Check)      │
│  - Checks if stack is empty             │
│  - Moves callbacks from queues          │
└─────────────────────────────────────────┘
              │
              │ Priority Order:
              │
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
┌─────────────┐   ┌─────────────┐
│ MICROTASK   │   │ CALLBACK    │
│   QUEUE     │   │   QUEUE     │
│             │   │             │
│ - Promises  │   │ - setTimeout│
│ - queueMicro│   │ - setInterval│
│             │   │ - DOM events│
│ (Priority 1)│   │ (Priority 2)│
└─────────────┘   └─────────────┘

EXECUTION ORDER:
1. Call Stack (synchronous code)
2. Microtask Queue (completely empty pannum)
3. Callback Queue (one at a time)
4. Repeat...
`);

// ============================================
// KEY TAKEAWAYS
// ============================================
console.log("\n" + "=".repeat(60));
console.log("KEY TAKEAWAYS");
console.log("=".repeat(60));
console.log(`
1. JavaScript is SINGLE-THREADED
   - Only one thing execute aagum at a time
   - But asynchronous operations handle pannum through event loop

2. PRIORITY ORDER:
   - Call Stack (synchronous) > Microtask Queue > Callback Queue

3. MICROTASK QUEUE:
   - Promises, queueMicrotask
   - Always callback queue ku munnadi execute aagum
   - Completely empty pannum before moving to callback queue

4. CALLBACK QUEUE:
   - setTimeout, setInterval, DOM events
   - One callback at a time execute aagum

5. ASYNC/AWAIT:
   - Promise wrapper
   - await ku appuram code microtask queue la add aagum

6. NEVER BLOCK THE EVENT LOOP:
   - Long-running synchronous code block pannum
   - Use async operations or Web Workers
`);
