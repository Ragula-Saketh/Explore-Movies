const tokencheck = localStorage.getItem("token");
if (!tokencheck) window.location.href = '/login.html';
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
                    const watchLater = document.createElement("button");
                    card.id = `${item.id}`;

                    watchLater.setAttribute("onclick", `watchLater("${item.id}")`);
                    watchLater.textContent = "Add to watch later";
                    watchLater.style.marginLeft = "10px";
                    watchLater.style.marginRight = "10px";
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

                    buttonContainer.appendChild(watchLater);
                    root.appendChild(card);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };
})();
display();
const token = localStorage.getItem('token');

if (token) {
    try {
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        const email = decodedToken.email.split("@")[0];
        fetch(`http://localhost:3000/user/${email}`)
            .then(response => response.json())
            .then(data => {
                const watchLaterDiv = document.getElementById('watchLaterdiv');
                watchLaterDiv.innerHTML = '<h1>Watch later</h1>';
                data.forEach(movie => {
                    const movieDiv = document.createElement('div');
                    movieDiv.className = 'movie-item';
                    const movieTitle = document.createElement('p');
                    movieTitle.textContent = movie.title;
                    const removeButton = document.createElement('button');
                    removeButton.textContent = 'Remove';
                    removeButton.className = 'btn btn-danger';
                    removeButton.onclick = () => removeMovie(movieDiv, movie.title);
                    movieDiv.appendChild(movieTitle);
                    movieDiv.appendChild(removeButton);
                    watchLaterDiv.appendChild(movieDiv);
                });
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });


    } catch (error) {
        console.error('Error decoding token:', error);
    }
} else {
    console.log('No token found');
}

function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    if (popup && overlay) {
        popup.remove();
        overlay.style.display = 'none';
    }
}


function watchLater(id) {
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

    var obj = { title: arr.title };

    if (token) {
        try {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);
            const email = decodedToken.email.split("@")[0];

            var http1 = new XMLHttpRequest();
            http1.open("POST", `http://localhost:3000/user/${email}`, false);
            http1.setRequestHeader('Content-type', "application/json");
            http1.send(JSON.stringify(obj));
            window.location.reload(true);


        } catch (error) {
            console.error('Error decoding token:', error);
        }
    } else {
        console.log('No token found');
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
    fetch('http://localhost:3000/requests')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            var flag = true;

            data.forEach(request => {
                console.log(request.permission === 1);
                if (request.movieId === id && request.permission === 1) {
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
                    } flag = false; return;

                } else if (request.movieId === id && request.permission === 0) {
                    alert("Admin did not accept your request ");
                    flag = false; return;
                }
            });
            if (flag) {
                if (token) {
                    try {
                        const decodedToken = jwt_decode(token);
                        console.log(decodedToken);

                        const email = decodedToken.email;

                        var http1 = new XMLHttpRequest();
                        http1.open("POST", `http://localhost:3000/user/${email}/${id}`, false);
                        http1.setRequestHeader('Content-type', "application/json");
                        http1.send();

                        alert("Request is sent to admin")

                    } catch (error) {
                        console.error('Error decoding token:', error);
                    }
                }
            }

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });



}

function removeMovie(movieDiv, title) {
    movieDiv.remove();

    if (token) {
        try {
            const decodedToken = jwt_decode(token);
            console.log(decodedToken);
            const email = decodedToken.email.split("@")[0];
            var http = new XMLHttpRequest();
            http.open("DELETE", `http://localhost:3000/user/${email}/${title}`, true);
            http.setRequestHeader('Content-type', "application/json");
            http.send();

        } catch (error) {
            console.error('Error decoding token:', error);
        }
    } else {
        console.log('No token found');
    }


}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}