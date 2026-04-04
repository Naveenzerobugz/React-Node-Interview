//question 1 Create a react custom hook and explain that
import { useState, useEffect } from "react";
const useUsers = () => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const resData = await res.json();
      if (resData.error) {
        throw resData.err;
      }
      setLoading(false);
      setData(resData);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };
  return { isLoading, isError, data };
};

export default useUsers;

// question 2 useState is async or sync? how to get values quicklly

// const [user, setUser] =  useState();

// setUser((preState)=>{

// });

//question 4 component unmoundiing in useeffect
// useEffect(()=>{
//     return ;
// },[])

//question 4 order to console log
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve().then(() => {
    console.log("Promise inside Timeout");
  });
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

console.log("End");
//start -> End -> Promise 1 -> Timeout 1 -> Promise inside Timeout-> Timeout 2

// question 5 output of the following code
const obj = {
  value: 10,
  fnA() {
    return this.value;
  },
  fnB: () => {
    return this.value;
  },
};

console.log(obj.fnA());
console.log(obj.fnB());
//question 6 print 1 to 10 in a loop and then 0 to 10 in a loop
let num = 0;
setInterval(() => {
  num = num + 1;
  console.log(num);
  if (num === 10) num = 0;
}, 100);
