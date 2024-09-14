const token = localStorage.getItem("token");


if (token) {
    fetch('http://localhost:3000/home', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            location.href = '/home.html';
        }
    });
}

const form = document.querySelector('form');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    var obj = {};
    var formData = new FormData(form);
    for (element of formData) {
        obj[element[0]] = element[1];
    }
    console.log(obj)
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    form.reset();
    window.location.href = '/login.html';
});