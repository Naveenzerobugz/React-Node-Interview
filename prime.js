/*
 * PRIME NUMBER EXPLANATION (Tanglish):
 *
 * Prime number na enna nu solla, adhu oru number ah irukkum.
 * Athu 1 ku mattum than divide aagum, oru number ku mattum than divide aagum (itself).
 *
 * Simple ah solla, prime number na:
 * - 1 ku mattum than divide aagum (1 and itself)
 * - Veru evanum divide panna mudiyathu
 *
 * Examples:
 * - 2: Prime ah irukkum (1 and 2 mattum divide pannum)
 * - 3: Prime ah irukkum (1 and 3 mattum divide pannum)
 * - 5: Prime ah irukkum (1 and 5 mattum divide pannum)
 * - 7: Prime ah irukkum (1 and 7 mattum divide pannum)
 *
 * Prime illatha numbers (Composite numbers):
 * - 4: Prime illa (1, 2, 4 divide pannum)
 * - 6: Prime illa (1, 2, 3, 6 divide pannum)
 * - 8: Prime illa (1, 2, 4, 8 divide pannum)
 * - 10: Prime illa (1, 2, 5, 10 divide pannum)
 *
 * Important points:
 * - 1 prime number illa (1 ku oru factor mattum irukkum)
 * - 2 dhan smallest prime number
 * - Prime numbers always odd numbers ah irukkum, except 2
 *
 * Function enna pannuthu:
 * 1. Number 1 or less na, prime illa nu return pannum
 * 2. 2 la irundhu number-1 varai check pannum
 * 3. Evanum divide pannalum (remainder 0 aachu), prime illa nu return pannum
 * 4. Ellam check pannitu, evanum divide pannalena, prime ah irukkum nu return pannum
 *
 * MODULO OPERATOR (%) EXPLANATION:
 *
 * % (percent sign) na "modulo" or "modulus" operator.
 * Ithu division pannitu, remainder ah return pannum.
 *
 * num % i means: num ah i ku divide pannitu, remainder enna nu paakum
 *
 * Examples:
 * - 10 % 2 = 0 (10 divide by 2 = 5, remainder = 0) - Perfect divide aagum
 * - 10 % 3 = 1 (10 divide by 3 = 3, remainder = 1) - Perfect divide aagala
 * - 7 % 2 = 1 (7 divide by 2 = 3, remainder = 1)
 * - 7 % 3 = 1 (7 divide by 3 = 2, remainder = 1)
 * - 7 % 7 = 0 (7 divide by 7 = 1, remainder = 0)
 * - 8 % 4 = 0 (8 divide by 4 = 2, remainder = 0)
 *
 * Prime number check la:
 * - num % i === 0 na, num ah i ku perfect ah divide pannalam
 * - Perfect divide aachu na, prime number illa (composite number)
 * - Remainder irundha, prime number ah irukkalam
 */

function isPrime(num) {
  // Number 1 or less na, prime number illa (1 ku oru factor mattum irukkum)
  if (num <= 1) return false;

  // 2 la irundhu number-1 varai check pannum
  // num % i means: num ah i ku divide pannitu remainder enna nu paakum
  // num % i === 0 na, num ah i ku perfect ah divide pannalam (remainder 0)
  // Perfect divide aachu na, prime number illa (composite number)
  console.log(`\nChecking if ${num} is prime:`);
  for (let i = 2; i < num; i++) {
    const remainder = num % i;
    console.log(`  i = ${i}: ${num} % ${i} = ${remainder}`);
    if (remainder === 0) {
      console.log(`  ✓ ${num} is divisible by ${i}, so it's NOT prime`);
      return false; // Remainder 0 na, prime illa
    } else {
      console.log(
        `  ✗ ${num} is NOT divisible by ${i} (remainder = ${remainder})`
      );
    }
  }

  // Ellam check pannitu, evanum divide pannalena, prime ah irukkum nu return pannum
  console.log(
    `  ✓ ${num} is NOT divisible by any number from 2 to ${
      num - 1
    }, so it IS prime`
  );
  return true;
}

console.log("=".repeat(50));
console.log("TEST 1: Checking if 7 is prime");
console.log("=".repeat(50));
console.log(isPrime(7));

console.log("\n" + "=".repeat(50));
console.log("TEST 2: Checking if 10 is prime");
console.log("=".repeat(50));
console.log(isPrime(10));
