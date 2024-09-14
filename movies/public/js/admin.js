const tokencheck=localStorage.getItem("token");
if(!tokencheck) window.location.href = '/login.html';
const display = (function () {
    return function () {
        let arr;
        fetch('http://localhost:3000/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                arr = data;
                const root = document.getElementById('root');
                root.innerHTML = '';
                for (let item of arr) {
                    const card = document.createElement('div');
                    const buttonContainer = document.createElement('div');
                    const del = document.createElement("button");
                    const edit = document.createElement("button");
                    card.id = `${item.id}`;
                    del.textContent = "Delete";
                    del.setAttribute("onclick", `del("${item.id}")`);
                    edit.setAttribute("onclick", `edit("${item.id}")`);
                    edit.textContent = "Edit";
                    edit.style.marginLeft = "10px";
                    edit.style.marginRight = "10px";
                    card.className = 'card';
                    card.style.marginLeft = "10px";
                    card.style.marginRight = "10px";
                    buttonContainer.className = "buttonContainer";
                    const title = document.createElement('div');
                    title.className = 'title';
                    title.textContent = item.username;
                    card.appendChild(title);
                    card.appendChild(buttonContainer);
                    buttonContainer.appendChild(del);
                    buttonContainer.appendChild(edit);
                    root.appendChild(card);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
})();
display();

const AddUser2 = document.getElementById("AddUser");

function popForm() {
    flag = false;
    const element = document.getElementById("addUserForm");
    element.style.display = "block";
    const description = document.getElementById("description");
    description.style.display = "none";
    display();
}

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById('username')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const password = document.getElementById('password')?.value.trim();
    if (!username || !email || !password) {
        alert('Username, email, and password are required!');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const isUsernamePresent = data.some(user => user.username === username);
        const isUseremailPresent = data.some(user => user.email === email);
        // Exit early if username or email is already present
        if (isUsernamePresent) {
            alert(`${username} is present in the array.`);
            return;
        }
        if (isUseremailPresent) {
            alert(`${email} is present in the array.`);
            return;
        }
       
        const form = document.getElementById('addUserForm');
        const formData = new FormData(form);
        const obj = {};

        for (const element of formData) {
            obj[element[0]] = element[1];
        }

        const postResponse = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const postData = await postResponse.json();
        console.log(postData);
        
        const fetchResponse = await fetch('http://localhost:3000/users');
        if (!fetchResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const fetchedData = await fetchResponse.json();
        const values = Object.values(fetchedData);
        const item = values[values.length - 1];
        const card = document.createElement('div');
        const buttonContainer = document.createElement('div');
        const root = document.getElementById('root');
        const del = document.createElement("button");
        const edit = document.createElement("button");
        card.id = `${item.id}`;
        del.textContent = "Delete";
        del.setAttribute("onclick", `del("${item.id}")`);
        edit.setAttribute("onclick", `edit("${item.id}")`);
        edit.textContent = "Edit";
        edit.style.marginLeft = "10px";
        edit.style.marginRight = "10px";
        card.className = 'card';
        card.style.marginLeft = "10px";
        card.style.marginRight = "10px";
        buttonContainer.className = "buttonContainer";
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = item.username;
        card.appendChild(title);
        card.appendChild(buttonContainer);
        buttonContainer.appendChild(del);
        buttonContainer.appendChild(edit);
        root.appendChild(card);
        form.reset();
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});

   
function Close() {
    const description = document.getElementById("description");
    description.style.display = "block";
    const element = document.getElementById("addUserForm");
    element.style.display = "none";
    element.reset();
    if (document.getElementById("Update")) {
        document.getElementById("Update").replaceWith(AddUser2);
    }

}


function del(id) {
    var arr={};
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            arr = JSON.parse(this.responseText);
        }
    };
    http.open("GET", `http://localhost:3000/users/${id}`, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    var userConfirmation = confirm(`Are you sure you want to delete ${arr["username"]} user?`);
    if (userConfirmation) {
        alert("User deleted!");
    } else {
        alert("Deletion canceled.");
        return;
    }
    var http = new XMLHttpRequest();
    http.open("DELETE", `http://localhost:3000/users/${id}`, true);
    http.setRequestHeader('Content-type', "application/json");
    http.send();
    const delElement = document.getElementById(id);
    root.removeChild(delElement);

}


function edit(id) {
    const formContainer = document.getElementById("addUserForm");
    const AddUser = document.getElementById("AddUser");
    const Updatebtn = document.createElement("button");
    Updatebtn.className = "btn";
    Updatebtn.textContent = "Update";
    Updatebtn.id = "Update";
    AddUser.replaceWith(Updatebtn);
    if (formContainer.style.display == "none") {
        popForm();
    }
    var arr = {};
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            arr = JSON.parse(this.responseText);
        }
    };
    http.open("GET", `http://localhost:3000/users/${id}`, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    username.value = arr["username"];
    email.value = arr["email"];
    password.value = arr["password"];
    Updatebtn.onclick = function () {
        arr["username"] = username.value
        arr["email"] = email.value
        arr["password"] = password.value
        Updatebtn.replaceWith(AddUser);
        form.reset();
        var http = new XMLHttpRequest();
        http.open("PUT", `http://localhost:3000/users/${id}`, false);
        http.setRequestHeader('Content-type', "application/json");
        http.send(JSON.stringify(arr));
        display();
        Close();
    }
}

function searchUsers() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const users = document.querySelectorAll('.card');
    users.forEach(user => {
        const title = user.querySelector('.title').innerText.toLowerCase();
        if (title.includes(query)) {
            user.style.display = "block";
        } else {
            user.style.display = "none";
        }
    });
}

function manage(){
    window.location.href = '/adminMovieManagement.html';
}
function manageRequests(){
    window.location.href = '/request.html';
}
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}