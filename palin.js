function checkPalin(str) {

  return str == str.split("").reverse().join("");
}

console.log(checkPalin('787'));
