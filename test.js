const num = [7, 2, 5, 6, 8, 7, 2, 3];
let numMap = new Map();
let pairs = []
const target = 9;

for(let i = 0 ; i < num.length ; i++) {
    let complement = target - num[i]
    // console.log(pairs.flat(), complement)
    // console.log(!pairs.flat().includes(complement))
    
    
    if(numMap.has(complement) && !pairs.flat().includes(complement)){
        pairs.push([num[i], complement])
    }
    numMap.set(num[i], i)
    console.log(numMap);
}

console.log(pairs.flat());
// console.log([...new Set(pairs.flat())]);