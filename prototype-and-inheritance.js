/**
 * ============================================================
 * JAVASCRIPT: Prototype & Prototype Inheritance
 * ============================================================
 * This file explains: WHAT it is, HOW it works, WHY and WHERE to use it.
 * Similar pattern to String.prototype.removeDuplicate in EpamInterview.js
 */

// ========== 1. WHAT IS PROTOTYPE? ==========
// In JavaScript, almost everything is an object. Every object has an internal
// link to another object called its "prototype". When you access a property
// or method, JS looks on the object first, then on its prototype, then the
// prototype's prototype (prototype chain) until it finds it or reaches null.

console.log("=== 1. WHAT IS PROTOTYPE? ===");

// Example: When you call "hello".toUpperCase(), toUpperCase doesn't live on
// the string "hello" — it lives on String.prototype. The engine looks up the chain.
const str = "hello";
console.log(str.toUpperCase()); // "HELLO" — method comes from String.prototype

// You can see the prototype:
console.log(Object.getPrototypeOf(str) === String.prototype); // true
console.log(str.__proto__ === String.prototype); // true (__proto__ is legacy, prefer getPrototypeOf)

// ========== 2. ADDING CUSTOM METHODS VIA PROTOTYPE (like removeDuplicate) ==========
// You can add methods to built-in types so ALL instances can use them.
// This is the same idea as String.prototype.removeDuplicate in EpamInterview.js.

console.log("\n=== 2. CUSTOM PROTOTYPE METHODS (like removeDuplicate) ===");

String.prototype.removeDuplicate = function () {
  return [...new Set(this.split(" "))].join(" ");
};

const s = "Hi this is the duplicate string Hi this";
console.log(s.removeDuplicate()); // "Hi this is the duplicate string"

// Now ANY string has .removeDuplicate():
console.log("a b a c b".removeDuplicate()); // "a b c"

// ========== 3. HOW PROTOTYPE INHERITANCE WORKS ==========
// When you create an object with "new Constructor()", the new object's
// [[Prototype]] is set to Constructor.prototype. So all instances "inherit"
// properties/methods from that prototype.

console.log("\n=== 3. HOW PROTOTYPE INHERITANCE WORKS ===");

function Person(name) {
  this.name = name;
}
// Method on prototype = shared by all instances (memory efficient)
Person.prototype.sayHi = function () {
  return "Hi, I am " + this.name;
};

const p1 = new Person("Alice");
const p2 = new Person("Bob");

console.log(p1.sayHi()); // "Hi, I am Alice"
console.log(p2.sayHi()); // "Hi, I am Bob"
console.log(p1.sayHi === p2.sayHi); // true — same function reference (inherited)

// Prototype chain: p1 -> Person.prototype -> Object.prototype -> null
console.log(Object.getPrototypeOf(p1) === Person.prototype); // true
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true

// ========== 4. WHY USE PROTOTYPE? ==========
// • Share methods across all instances (one function in memory, not per object).
// • Extend built-ins (String, Array, etc.) with custom helpers (e.g. removeDuplicate).
// • Implement "inheritance" without classes (pre-ES6 style).
// • Polyfills: add modern methods to old environments by assigning to *.prototype.

console.log("\n=== 4. WHY USE PROTOTYPE? ===");

// Example: One function shared vs one per object
function Car(model) {
  this.model = model;
}
Car.prototype.drive = function () {
  return this.model + " is driving";
};
const car1 = new Car("Tesla");
const car2 = new Car("BMW");
console.log(car1.drive(), car2.drive());
console.log("Same method?", car1.drive === car2.drive); // true — shared

// ========== 5. WHERE TO USE IT? ==========
// • Adding utility to built-in types: String.prototype.removeDuplicate, Array.prototype.unique, etc.
// • Constructor-based "classes" and inheritance (when not using ES6 class).
// • Polyfills (e.g. Array.prototype.includes for older browsers).
// • When you want every instance of a type to have a method without attaching it to each object.

console.log("\n=== 5. WHERE TO USE IT? ===");

// Example: Array "unique" helper (similar spirit to removeDuplicate for String)
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log([1, 2, 2, 3, 1].unique()); // [1, 2, 3]

// ========== 6. PROTOTYPE INHERITANCE (CHILD "extends" PARENT) ==========
// Child constructor's prototype is an instance of Parent, so Child instances
// get Parent's prototype methods too.

console.log("\n=== 6. PROTOTYPE INHERITANCE (Child extends Parent) ===");

function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return this.name + " makes a sound";
};

function Dog(name, breed) {
  Animal.call(this, name); // "super": set own props
  this.breed = breed;
}
// Inherit from Animal: Dog.prototype's [[Prototype]] = Animal.prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function () {
  return this.name + " barks";
};

const dog = new Dog("Max", "Lab");
console.log(dog.bark());   // "Max barks" (own method)
console.log(dog.speak());  // "Max makes a sound" (inherited from Animal)
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true

// ========== 7. SUMMARY: WHAT, HOW, WHY, WHERE ==========
/*
  WHAT
  - Prototype: internal object that another object delegates to for property lookup.
  - Prototype inheritance: objects get behavior from a chain of prototypes.

  HOW
  - Built-in: every constructor (String, Array, Function, etc.) has a .prototype;
    instances created with new Constructor() get that as their [[Prototype]].
  - Custom: add methods to Constructor.prototype; use Object.create(Parent.prototype)
    for inheritance.

  WHY
  - Share methods (one function for all instances).
  - Extend built-ins (e.g. String.prototype.removeDuplicate).
  - Implement inheritance and code reuse.

  WHERE
  - Custom methods on built-in types (String, Array, etc.) when you want
    "any string" or "any array" to have that method (like removeDuplicate).
  - Constructor-based "classes" and subclasses (or use ES6 class, which uses
    prototypes under the hood).
  - Polyfills for missing methods in older JS environments.
*/

console.log("\n=== END: Prototype & Prototype Inheritance ===");
