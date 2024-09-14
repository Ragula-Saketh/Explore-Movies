const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviecontroller');

router.get('/movies', movieController.getAllMovies);
router.get('/movies/:id',movieController.getMovieById);
router.post('/movies', movieController.createMovie);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);
router.post('/users',movieController.createUser);
router.get('/users',movieController.getAllUsers);
router.get('/users/:id',movieController.getUserById);
router.delete('/users/:id', movieController.deleteUser);
router.put('/users/:id', movieController.updateUser);
router.get('/user/:email',movieController.getTitles);
router.post('/user/:email',movieController.addTitles);
router.delete('/user/:email/:title', movieController.deleteTitle);
router.post('/user/:email/:id', movieController.addRequest);
router.get('/requests',movieController.getRequests);
 router.get('/username/:email',movieController.getUsername);
 router.put('/requests/:id', movieController.updateRequests);
 router.delete('/requests/:id', movieController.deleteRequest);

module.exports = router;
