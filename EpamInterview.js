// ========== TASK 1: for loop with var + setTimeout ==========
// Explanation: var is function-scoped, not block-scoped. By the time setTimeout callbacks run (after 1s),
// the loop has finished and i = 3. All 3 callbacks share the same i, so they all log 3.
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
// Answer: Output is 3, 3, 3 (after 1 second)

// ========== TASK 2: Same using closure (IIFE) ==========
// Explanation: IIFE(Immediately Invoked Function Expression) creates a new scope for each iteration. The parameter i captures the current value
// at that moment. Each setTimeout callback gets its own i from the closure.
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(() => {
      console.log(i);
    }, 1000);
  })(i);
}
// Answer: Output is 0, 1, 2 (after 1 second)

// ========== TASK 3: Promise chain with error ==========
// Explanation: Promise.resolve(1) → x=10 (assignment returns 10) → throw Error → catch runs,
// then() after throw is skipped. finally runs but receives undefined (catch doesn't pass value).
// Note: .then((x) => (x = 10)) assigns 10 to x and returns 10 for next then.
Promise.resolve(1)
  .then((x) => (x = 10))
  .then((x) => {
    throw new Error("Error");
  })
  .then((x) => console.log("success", x))
  .catch((e) => console.log("error", e.message))
  .then((x) => console.log("finally", x));
// Answer: Output is "error Error" then "finally undefined"

// ========== TASK 3: Promise chain with error ==========
/*
 * EVENT LOOP - Step-by-Step Output Explanation
 * --------------------------------------------
 * Phase 1 - Synchronous code:
 *   1. "start"
 *   2. setTimeout → schedules in timers phase
 *   3. setImmediate → schedules in check phase
 *   4. process.nextTick → schedules in nextTick queue
 *   5. asyncFunction() → "asyncFunction", await suspends, microtask queued
 *   6. Promise.then(promise1) → microtask queued
 *   7. Promise.then(promise2) → microtask queued
 *   8. "end"
 *
 * Phase 2 - process.nextTick queue: "process.nextTick"
 * Phase 3 - Microtasks (Promises): "promise", "promise1", "promise2"
 * Phase 4 - Timers phase: "setTimeout"
 * Phase 5 - Check phase (setImmediate): "setImmediate"
 *
 * Final output order:
 *   start → asyncFunction → end → process.nextTick → promise → promise1 → promise2 → setTimeout → setImmediate
 */
console.log("start");
setTimeout(() => {
  console.log("setTimeout");
}, 0);
setImmediate(() => {
  console.log("setImmediate");
});
process.nextTick(() => {
  console.log("process.nextTick");
});
async function asyncFunction() {
  console.log("asyncFunction");
  await Promise.resolve().then(() => {
    console.log("promise");
  });
}
asyncFunction();
Promise.resolve().then(() => {
  console.log("promise1");
});
Promise.resolve().then(() => {
  console.log("promise2");
});
console.log("end");
// Answer: start → asyncFunction → end → process.nextTick → promise → promise1 → promise2 → setTimeout → setImmediate

// ========== TASK 5: Remove duplicate words from string ==========
// Explanation: Two approaches - (1) filter + indexOf keeps first occurrence of each word, (2) Set removes duplicate words (order preserved with filter)
let s = "Hi this is the duplicate string string";
let s1 = s
  .split(" ")
  .filter((item, index) => s.indexOf(item) === index)
  .join(" ");
let s2 = s.split(" ");
const removedDuplicate = [...new Set(s2)].join(" ");
console.log(removedDuplicate);
// Answer: s1 = "Hi this is the duplicate string", removedDuplicate = "Hi this is the duplicate string" (unique words)

// ========== TASK 6: String prototype method (removeDuplicate) ==========
// Explanation: Adding custom method to String.prototype so any string can call .removeDuplicate()
// Note: Without implementation below, s.removeDuplicate() will throw TypeError
String.prototype.removeDuplicate = function () {
  return [...new Set(this.split(""))].join("");
};
s.removeDuplicate(); // in prototype
// Answer: Returns unique chars only. Implemented above to avoid error.

// ========== TASK 7: this keyword - regular function vs arrow function ==========
// Explanation: getFirstName() is regular function - this = user object. getLastName() is arrow function -
// arrow functions don't have their own this, they inherit from enclosing scope (here: global/undefined).
const user = {
  firstName: "John",
  lastName: "Doe",
  getFirstName() {
    console.log(this.firstName);
  },
  getLastName: () => {
    console.log(this.firstName);
  },
};
user.getFirstName();
user.getLastName();
// Answer: getFirstName logs "John". getLastName logs "undefined" (this is not user in arrow function)
