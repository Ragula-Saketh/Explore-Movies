const mysql = require('mysql2');
const Config = require('../config/config');

const db = mysql.createConnection({
    host: Config.host,
    user: Config.user,
    password: Config.password,
    database: Config.database
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});


 exports.getAll = (callback) => {
    db.query('SELECT * FROM movies', callback);
};

exports.getRequests = (callback) => {
    db.query('SELECT * FROM movie_requests', callback);
};

 exports.getMovieById = (movieId, callback) => {
    db.query('SELECT * FROM movies WHERE id = ?', [movieId], callback);
};

exports.getUserById = (userId, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], callback);
};
exports.getUsername = (email, callback) => {
    
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

 exports.createMovie = (movieData, callback) => {
    let {title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total } = movieData;
    if(release_year==="")release_year=null;
    if(duration_minutes==="")duration_minutes=null;
    if(rating==="")rating=null;
    if(box_office_total==="")box_office_total=null;
    const query = 'INSERT INTO movies (title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total) VALUES (?, ?, ?, ?, ?, ?,?,?)';
    db.query(query, [title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total], callback);
};

exports.addTitles = (titleData,email, callback) => {
    let {title } = titleData;
    const query = `INSERT INTO ${email} (title) VALUES (?)`;
    db.query(query, [title], callback);
};

exports.addRequest = (id,email, callback) => {
    
    const query = `INSERT INTO movie_requests (movieId, requestBy) 
VALUES (?,?);`;
    db.query(query, [id,email], callback);
};


exports.createUser = (userData, callback) => {
    let { username, email, password } = userData;
let emailname=email.split("@")[0];
    const createTableQuery = `
       CREATE TABLE ${emailname} (
title VARCHAR(255) NOT NULL
);
    `;
    db.query(createTableQuery, (err, result) => {
        if (err) {
            return callback(err); 
        }
        const insertUserQuery = `
            INSERT INTO users (username, email, password) VALUES (?, ?, ?);
        `;
        db.query(insertUserQuery, [username, email, password], (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result); 
        });
    });
};


 exports.accessHome = (accessDetails, callback) => {
    const { email, password } = accessDetails;
    if (!email || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};
 exports.updateMovie = (movieId, movieData, callback) => {
    const { title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total } = movieData;
    const query = 'UPDATE movies SET title = ?, director = ?, genre = ?, release_year = ?,duration_minutes=?, rating = ?, poster_image = ?,box_office_total=? WHERE id = ?';
    db.query(query, [title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total,movieId], callback);
};
exports.updateUser = (userId, userData, callback) => {
    const { username,email,password} = userData;
    const query = 'UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [username,email,password,userId], callback);
};
exports.updateRequests = (movieId, callback) => {
    
    const query = 'UPDATE movie_requests SET permission = ? WHERE movieId = ?';
    db.query(query, [1,movieId], callback);
};

exports.deleteMovie = (movieId, callback) => {
    const query = 'DELETE FROM movies WHERE id = ?';
    db.query(query, [movieId], callback);
};
exports.deleteRequest = (movieId, callback) => {
    const query = 'DELETE FROM movie_requests WHERE movieId = ?';
    db.query(query, [movieId], callback);
};
exports.deleteTitle = (email,title, callback) => {
    const query = `DELETE FROM ${email} WHERE title = ?`;
    db.query(query, [title], callback);
};
exports.deleteUser = (userId, callback) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [userId], callback);
};
exports.getAllUsers = (callback) => {
    db.query('SELECT * FROM users', callback);
};
exports.getTitles = (email,callback) => {
    db.query(`SELECT * FROM ${email}`, callback);
};
