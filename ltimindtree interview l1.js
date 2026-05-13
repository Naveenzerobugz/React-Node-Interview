// function debuncing (callBackfn, t) {
//     const timeout = setTimeout(callBackfn, t);
//     clearTimeout
// }

const data = [
  {salary:100,grade:"b"},
  {salary:50,grade:"c"},
  {salary:300,grade:"a"},
  {salary:200,grade:"a"}
];
//sum of salary after doubling the salary for grade a ?

const output  = data.filter((item) => item.grade === 'a').reduce((acc, cur)=> {
    return acc + cur.salary * 2 ;
}, 0);

console.log(output) 1   


// https://jsonplaceholder.typicode.com/posts/1
// https://jsonplaceholder.typicode.com/posts/2
// https://jsonplaceholder.typicode.com/posts/3

// run `node index.js` in the terminal
const posts = [];
const getPosts = async () => {
  const post1 = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post1res = await post1.json();
  console.log(post1res);
  posts.push(post1res);
  const post2 = await fetch('https://jsonplaceholder.typicode.com/posts/2');
  const post2res = await post2.json();
  console.log(post2res);
  posts.push(post2res);
  const post3 = await fetch('https://jsonplaceholder.typicode.com/posts/3');
  const post3res = await post3.json();
  console.log(post3res);
  posts.push(post3res);
  return posts;
};

console.log(getPosts());
