/**
 * Compares two words to determine whether they are anagrams of each other.
 * The comparison is case-insensitive and ignores the original letter order.
 */
function checkAnagram(firstWord, secondWord) {
  // Convert both inputs to lowercase so case-sensitive differences do not affect the comparison.
  let one = firstWord.toLowerCase();
  let two = secondWord.toLowerCase();

  // Split each word into characters, sort them alphabetically, and join back into strings.
  one = one.split("").sort().join("");
  two = two.split("").sort().join("");
  console.log(one, two);

  // If the normalized strings match, the words are anagrams.
  return one === two;
}

console.log(checkAnagram("fast", "fats"));

const test = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9, [10, 11, 12]],
];
const flat = test.flat("Infinity");
console.log(flat);
