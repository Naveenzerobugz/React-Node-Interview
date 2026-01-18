// const express = require("express")

// const app = express()

// app.get("/" ,(req, res) => {
//     res.send({})
// })

// app.listen(3000, ()=>{
//     console.log("server is running");
// })

// function prime() {
//     let val = 13
//     for(i=0; i< val.length, i++; ) {
//         console.log(`${1} X ${1}`)
//     }
    
// }

// select * from table1 t1
// left join table2 t2 on t1.id = t2.id 
// right join table3 t3 on t1.id = t3.id 

// select salry from salryTable top 2 order by desc limit 1


// let input = [2,11,7,15]
// let sum = 9
// // Output: [2,7] 
// let final = []
// for(i=0;i <input.length ; i++){
//     for(j=0; j <input.length; j++){
//         if(input[i] + input[j] == sum) {
//             final.push(input[i])
//         }
//     }
// }

  
  const num = [7, 2, 5, 6, 8, 7, 2, 3];
  const target = 9;
  
  const result = findPairs(num, target);
  console.log(result); // Output: [ [ 2, 7 ], [ 6, 3 ] ]
  
  const findPairs = (num, target) => {
    const numMap = new Map();
    const pairs = [];
    for(let i = 0; i < num.length; i++) {
      const complement = target - num[i];
      if(numMap.has(complement)) {
        pairs.push([num[i], complement]);
      }
      numMap.set(num[i], i);
    }
    return pairs;
  }