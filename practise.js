let a=1;
let b=1;
let c=2;
let d =2;
// First decrement: c goes from 2 -> 1 and the new value is logged.
console.log(--c)
console.log(d--)
// Second expression breaks down as follows:
// 1. Evaluate (a == b): compares 1 and 1, returns true.
// 2. Evaluate (--c): c was 1 after the first decrement; decrement again, c becomes 0.
// 3. Compare (true == 0): true coerces to 1 in loose equality; 1 == 0 yields false.
console.log(a==b==--c)
console.log(a==b==d--)
//Yes. The prefix decrement `--c` modifies `c` immediately and returns that updated value. 
// //So each time `--c` runs, `c` itself is reduced by 1—there’s no separate copy. If you need the old value, 
// use `c--` (postfix) or work on a different variable.