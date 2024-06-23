console.log("hello , word web !!");

fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json ())
    .then((data) => console.log(data));

const data =  {
    title: "This is title",
    body: "This is post body",
    userId: 2,
};

fetch("https://jsonplaceholder.typicode.com/posts" , {
    method:"POST", 
    body: JSON.stringify(data),
    headers: {
       "Content-type" : "application/json" 
    }
}).then(res => res.json())
  .then(data => console.log(data));  