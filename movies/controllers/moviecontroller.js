const Movie = require('../models/movie');

exports.createMovie = (req, res) => {
    const newMovie = req.body;
    Movie.createMovie(newMovie, (err, result) => {
        if (err) {
            console.error('Error in creating movie', err);
            res.status(500).send('Error in creating movie');
            return;
        }
        res.status(201).send({ message: 'movie added successfully', movie: { id: result.insertId, ...newMovie } });
    });
};

exports.createUser = (req, res) => {
    const newUser = req.body;
    Movie.createUser(newUser, (err, result) => {
        if (err) {
            console.error('Error in creating user', err);
            res.status(500).send('Error in creating user');
            return;
        }
        res.status(201).send({ message: 'user added successfully', user: { id: result.insertId, ...newUser } });
    });
};

exports.addTitles = (req, res) => {
    const newTitle = req.body;
    const email = req.params.email;
    Movie.addTitles(newTitle, email, (err, result) => {
        if (err) {
            console.error('Error in creating title', err);
            res.status(500).send('Error in creating title');
            return;
        }
        res.status(201).send({ message: 'title added successfully', user: { id: result.insertId, ...newTitle } });
    });
};

exports.addRequest = (req, res) => {
    const id = req.params.id;
    const email = req.params.email;
    Movie.addRequest(id, email, (err, result) => {
        if (err) {
            console.error('Error in creating request', err);
            res.status(500).send('Error in creating request');
            return;
        }
        res.status(201).send({ message: 'request added successfully' });
    });
};

exports.getAllMovies = (req, res) => {
    Movie.getAll((err, result) => {
        if (err) {
            console.error('Error in getting movies', err);
            res.status(500).send("Error getting movies");
            return;

        }
        res.status(200).json(result);
    });
};

exports.getTitles = (req, res) => {
    const email = req.params.email;
    Movie.getTitles(email, (err, result) => {
        if (err) {
            console.error('Error in getting movies', err);
            res.status(500).send("Error getting movies");
            return;
        }
        res.status(200).json(result);
    });
};

exports.getRequests = (req, res) => {
    Movie.getRequests((err, result) => {
        if (err) {
            console.error('Error in getting requests', err);
            res.status(500).send("Error getting requests");
            return;
        }
        res.status(200).json(result);
    });
};

exports.getMovieById = (req, res) => {
    const movie_id = req.params.id;
    Movie.getMovieById(movie_id, (err, result) => {
        if (err) {
            console.error('Error in getting movie', err);
            res.status(500).send(err.message);
            return;
        }
        if (result.length === 0) return res.status(404).send('Movie not found!');
        res.status(200).send(result[0]);
    });
};

exports.getUserById = (req, res) => {
    const user_id = req.params.id;
    Movie.getUserById(user_id, (err, result) => {
        if (err) {
            console.error('Error in getting User', err);
            res.status(500).send(err.message);
            return;
        }
        if (result.length === 0) return res.status(404).send('User not found!');
        res.status(200).send(result[0]);
    });
};
exports.getUsername = (req, res) => {
    const email = req.params.email;

    Movie.getUsername(email, (err, result) => {
        if (err) {
            console.error('Error in getting Username', err);
            res.status(500).send(err.message);
            return;
        }
        if (result.length === 0) return res.status(404).send('User not found!');
        res.status(200).send(result[0]);
    });
};

exports.updateMovie = (req, res) => {
    const movie_id = req.params.id;
    const updatedMovie = req.body;

    Movie.updateMovie(movie_id, updatedMovie, (err, result) => {
        if (err) {
            console.error('Error in updating movie', err);

            res.status(500).send({ error: err.message });
            return;
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Movie not found');
        }

        res.status(200).send('Movie updated successfully');
    });
};

exports.updateUser = (req, res) => {
    const user_id = req.params.id;
    const updatedUser = req.body;

    Movie.updateUser(user_id, updatedUser, (err, result) => {
        if (err) {
            console.error('Error in updating user', err);

            res.status(500).send({ error: err.message });
            return;
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('user not found');
        }

        res.status(200).send('user updated successfully');
    });
};

exports.updateRequests = (req, res) => {
    const movie_id = req.params.id;
    Movie.updateRequests(movie_id, (err, result) => {
        if (err) {
            console.error('Error in updating request', err);

            res.status(500).send({ error: err.message });
            return;
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('request not found');
        }

        res.status(200).send('request updated successfully');
    });
};

exports.deleteMovie = (req, res) => {
    const movie_id = req.params.id;
    Movie.deleteMovie(movie_id, (err, result) => {
        if (err) {
            console.error('Error in deleting movie', err);
            res.status(500).send(err.message);
            return;
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Movie not found');
        }
        res.status(200).send('Movie deleted successfully');
    });
};

exports.deleteUser = (req, res) => {
    const user_id = req.params.id;
    Movie.deleteUser(user_id, (err, result) => {
        if (err) {
            console.error('Error in deleting user', err);
            res.status(500).send(err.message);
            return;
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    });
};

exports.deleteRequest = (req, res) => {
    const movie_id = req.params.id;
    Movie.deleteRequest(movie_id, (err, result) => {
        if (err) {
            console.error('Error in deleting request', err);
            res.status(500).send(err.message);
            return;
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('request not found');
        }
        res.status(200).send('request deleted successfully');
    });
};

exports.deleteTitle = (req, res) => {
    const email = req.params.email;
    const title = req.params.title;
    Movie.deleteTitle(email, title, (err, result) => {
        if (err) {
            console.error('Error in deleting movie', err);
            res.status(500).send(err.message);
            return;
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Movie not found');
        }
        res.status(200).send('Movie deleted successfully');
    });
};

exports.getAllUsers = (req, res) => {
    Movie.getAllUsers((err, result) => {
        if (err) {
            console.error('Error in getting users', err);
            res.status(500).send("Error getting users");
            return;
        }
        res.status(200).json(result);
    });
};