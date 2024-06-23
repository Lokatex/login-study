fatch('https://reqres.in/api/users?page=2')
    .then(res => res.json())
    .then(data => console.log(data))

