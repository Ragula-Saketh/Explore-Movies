const tokencheck=localStorage.getItem("token");
if(!tokencheck) window.location.href = '/login.html';

var flag = false;
const display = (function () {
    return function () {
        let arr;
        fetch('http://localhost:3000/movies')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                arr = data;
                console.log(data);
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

                    const img = document.createElement('img');
                    img.src = item.poster_image;
                    img.alt = 'Image not found';
                    img.addEventListener('click', function (event) {
                        handleClick(event, item.id);
                    });
                    const title = document.createElement('div');
                    title.className = 'title';
                    title.textContent = item.title;
                    card.appendChild(img);
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
const AddMovie2 = document.getElementById("AddMovie");

function popForm() {
    flag = false;
    const element = document.getElementById("addMovieForm");
    element.style.display = "block";
    const description = document.getElementById("description");
    description.style.display = "none";
    display();
}

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById('title')?.value.trim();
    const director = document.getElementById('director')?.value.trim();
    const rating = document.getElementById('rating')?.value.trim();
    if (!title || !director) {
        alert('Title and director are required!');
        return;
    }
    if(rating&&(rating>9.9||rating<1)){
        alert('Rating should be between 1 to 9.9');
        return;
    }
    const form = document.getElementById('addMovieForm');
    var formData = new FormData(form);
    var obj = {};
    
    for (element of formData) {
        obj[element[0]] = element[1];
    }
    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    fetch('http://localhost:3000/movies')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const arr = data;
            const values = Object.values(arr);
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
            const img = document.createElement('img');
            img.src = item.poster_image;
            img.alt = 'Image not found';
            img.addEventListener('click', function (event) {
                handleClick(event, item.id);
            });
            const title = document.createElement('div');
            title.className = 'title';
            title.textContent = item.title;
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(buttonContainer);
            buttonContainer.appendChild(del);
            buttonContainer.appendChild(edit);
            root.appendChild(card);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

    form.reset();
});
   
function Close() {
    const description = document.getElementById("description");
    description.style.display = "block";
    const element = document.getElementById("addMovieForm");
    element.style.display = "none";
    element.reset();
    if (document.getElementById("Update")) {
        document.getElementById("Update").replaceWith(AddMovie2);
    }

}

function del(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            arr = JSON.parse(this.responseText);
        }
    };
    http.open("GET", `http://localhost:3000/movies/${id}`, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    var userConfirmation = confirm(`Are you sure you want to delete ${arr["title"]} movie?`);
    if (userConfirmation) {
        alert("Movie deleted!");
    } else {
        alert("Deletion canceled.");
        return;
    }
    var http = new XMLHttpRequest();
    http.open("DELETE", `http://localhost:3000/movies/${id}`, true);
    http.setRequestHeader('Content-type', "application/json");
    http.send();
    const delElement = document.getElementById(id);
    root.removeChild(delElement);

}

function edit(id) {
    const formContainer = document.getElementById("addMovieForm");
    const AddMovie = document.getElementById("AddMovie");
    const Updatebtn = document.createElement("button");
    Updatebtn.className = "btn";
    Updatebtn.textContent = "Update";
    Updatebtn.id = "Update";
    AddMovie.replaceWith(Updatebtn);
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
    http.open("GET", `http://localhost:3000/movies/${id}`, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    const title = document.getElementById("title");
    const director = document.getElementById("director");
    const genre = document.getElementById("genre");
    const release_year = document.getElementById("release_year");
    const duration_minutes = document.getElementById("duration_minutes");
    const rating = document.getElementById("rating");
    const poster_image = document.getElementById("poster_image");
    const box_office_total = document.getElementById("box_office_total");
    title.value = arr["title"];
    director.value = arr["director"];
    genre.value = arr["genre"];
    release_year.value = arr["release_year"];
    duration_minutes.value = arr["duration_minutes"];
    rating.value = arr["rating"];
    poster_image.value = arr["poster_image"];
    box_office_total.value = arr["box_office_total"];
    Updatebtn.onclick = function () {
        console.log(id);
        arr["title"] = title.value
        arr["director"] = director.value
        arr["release_year"] = release_year.value
        arr["duration_minutes"] = duration_minutes.value
        arr["rating"] = rating.value
        arr["genre"] = genre.value
        arr["poster_image"] = poster_image.value
        arr["box_office_total"] = box_office_total.value
        Updatebtn.replaceWith(AddMovie);
        form.reset();
        var http = new XMLHttpRequest();
        http.open("PUT", `http://localhost:3000/movies/${id}`, false);
        http.setRequestHeader('Content-type', "application/json");
        http.send(JSON.stringify(arr));
        display();
        Close();
    }
}

function searchMovies() {
    console.log("hi");
    const query = document.getElementById('searchInput').value.toLowerCase();
    const movies = document.querySelectorAll('.card');
    movies.forEach(movie => {
        const title = movie.querySelector('.title').innerText.toLowerCase();
        if (title.includes(query)) {
            movie.style.display = "block";
        } else {
            movie.style.display = "none";
        }
    });
}

function handleClick(event, id) {
    const popup = document.createElement('div');
    popup.id = 'popup';
    const imgElement = document.createElement('img');
    imgElement.src = event.target.src;
    imgElement.style.width = '100%';
    imgElement.alt = "Image not found";
    var arr = {};
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            arr = JSON.parse(this.responseText);
        }
    };
    http.open("GET", `http://localhost:3000/movies/${id}`, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    const storeDetails1 = document.createElement('h6');
    storeDetails1.textContent = `Title : ${arr["title"]}`;
    const storeDetails2 = document.createElement('h6');
    storeDetails2.textContent = `Director : ${arr["director"]}`;
    const storeDetails3 = document.createElement('h6');
    storeDetails3.textContent = `Genre :  ${arr["genre"]}`;
    const storeDetails4 = document.createElement('h6');
    storeDetails4.textContent = `Release_year : ${arr["release_year"]}`;
    const storeDetails5 = document.createElement('h6');
    storeDetails5.textContent = `Duration in minutes : ${arr["duration_minutes"]}`;
    const storeDetails6 = document.createElement('h6');
    storeDetails6.textContent = `Rating : ${arr["rating"]}`;
    const storeDetails7 = document.createElement('h6');
    storeDetails7.textContent = ` Box office total : ${arr["box_office_total"]}`;
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', closePopup);
    popup.appendChild(imgElement);
    popup.appendChild(storeDetails1);
    popup.appendChild(storeDetails2);
    popup.appendChild(storeDetails3);
    popup.appendChild(storeDetails4);
    popup.appendChild(storeDetails5);
    popup.appendChild(storeDetails6);
    popup.appendChild(storeDetails7);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
    const overlay = document.getElementById('overlay');
    if (popup && overlay) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
    }
}

function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    if (popup && overlay) {
        popup.remove();
        overlay.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}

function manage(){
    window.location.href = '/adminUserManagement.html';
}