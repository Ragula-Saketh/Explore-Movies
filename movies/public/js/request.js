const tokencheck=localStorage.getItem("token");
if(!tokencheck) window.location.href = '/login.html';
fetch('http://localhost:3000/requests')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const root = document.getElementById('root'); 
        root.innerHTML = '';

        data.forEach(request => {
            var movieName;
            var username;


            if (request.permission != 1) {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.margin = '10px';
                card.style.padding = '10px';
                card.style.border = '1px solid #ccc';

                const movieId = document.createElement('h5');
                fetch(`http://localhost:3000/movies/${request.movieId}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        movieName = data.title;
                        movieId.textContent = `Movie: ${movieName}`;
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });

                card.appendChild(movieId);

              
                const requestBy = document.createElement('p');
                fetch(`http://localhost:3000/username/${request.requestBy}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json(); 
                    })
                    .then(data => {
                        username = data.username;
                        requestBy.textContent = `Requested by: ${username}`;

                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });

                card.appendChild(requestBy);

          
                const acceptButton = document.createElement('button');
                acceptButton.textContent = 'Accept';
                acceptButton.style.marginRight = '10px';
                acceptButton.addEventListener('click', () => handleAccept(request.movieId, card));
                card.appendChild(acceptButton);

          
                const rejectButton = document.createElement('button');
                rejectButton.textContent = 'Reject';
                rejectButton.style.marginRight = '10px';
                rejectButton.addEventListener('click', () => handleReject(card,request.movieId));
                card.appendChild(rejectButton);

                root.appendChild(card);}
            });
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function handleAccept(id, element) {
    var http = new XMLHttpRequest();
    http.open("PUT", `http://localhost:3000/requests/${id}`, false);
    http.setRequestHeader('Content-type', "application/json");
    http.send();
    alert(`Accepted user request`);
    element.remove();
}
function handleReject(element,id){
    element.remove();
    var http = new XMLHttpRequest();
    http.open("DELETE", `http://localhost:3000/requests/${id}`, false);
    http.setRequestHeader('Content-type', "application/json");
    http.send();
    alert(`Rejected user request`);
}
function manageMovies(){
    window.location.href = '/adminMovieManagement.html';

}
function manageUsers(){
    window.location.href = '/adminUserManagement.html';

}
function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
}