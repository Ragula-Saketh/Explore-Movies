use mydb;

CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    genre VARCHAR(100),
    release_year INT DEFAULT NULL,
    duration_minutes INT DEFAULT NULL,
    rating DECIMAL(2, 1) DEFAULT NULL,  
    poster_image VARCHAR(255) ,
    box_office_total DECIMAL(15, 2) DEFAULT NULL  
);

INSERT INTO movies (title, director, genre, release_year, duration_minutes, rating, poster_image, box_office_total)
VALUES 
('Inception', 'Christopher Nolan', 'Sci-Fi', 2010, 148, 8.8, 'https://images2.alphacoders.com/851/thumbbig-85182.webp', 829895144),
('The Dark Knight', 'Christopher Nolan', 'Action', 2008, 152, 9.0, 'https://wallpapers.com/images/hd/the-dark-knight-poster-cover-oszgt4tii2hxuamf.webp', 1004558444),
('Pulp Fiction', 'Quentin Tarantino', 'Crime', 1994, 154, 8.9, 'https://wiki.tarantino.info/images/thumb/PF02.jpg/406px-PF02.jpg', 213928762),
('Forrest Gump', 'Robert Zemeckis', 'Drama', 1994, 142, 8.8, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsLhkX1GPDu0AdP0saH_iHSoekc0kGiVsepw&s', 678222284),
('The Godfather', 'Francis Ford Coppola', 'Crime', 1972, 175, 9.2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSkabU2Glnr3xi-VhQNho8RZprG_qqCJpW_YF7mQX2ZNjB-Uoe5itY&s', 246120986);

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE UNIQUE,
    password VARCHAR(255) NOT NULL  
);

CREATE TABLE admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL UNIQUE UNIQUE,
    password VARCHAR(255) NOT NULL  
);

INSERT INTO admins (username, email, password)
VALUES ('Saketh', 'saketh@gmail.com', '1234'), ('Rahul', 'rahul@gmail.com', '5678');
