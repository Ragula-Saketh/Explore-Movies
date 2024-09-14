const form = document.querySelector('form');
const token = localStorage.getItem("token");

//To check whether token is still valid or not 
if (token) {
    
    fetch('http://localhost:3000/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Use the extracted token
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log(response.json());
        if (response.ok) {
           location.href = '/home.html';
        }
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    var obj = {};
    var formData = new FormData(form);
    for (const element of formData.entries()) {
        obj[element[0]] = element[1];
    }

    fetch('http://localhost:3000/home', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            alert("Please sign up");
            location.href = "./register";
            throw new Error("Login failed");
        }
    })
    .then(data => {
        const token = data.token; 
        console.log();
        if (token) {
             localStorage.setItem('token', token);
            const role=jwt_decode(token).role;
            if(role==="user"){
            return fetch('http://localhost:3000/homeuser', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });}
            else if(role==="admin"){
                return fetch('http://localhost:3000/admin', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }); 
            }
        } else {
            throw new Error("No token received");
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Request failed");
        }
     
    })
    .then(data => {
    
        if (data.message==="user") {
            location.href = '/user.html';
            return response.json();
        }else if(data.message==="admin"){
            location.href = '/adminUserManagement.html';
            return response.json();
        }
         else  {
            throw new Error("Authorization failed");
        }
    })
    .catch(error => console.error('Error:', error));

    form.reset();
});


