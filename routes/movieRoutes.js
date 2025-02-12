const express=require('express');

const routes=express.Router();

const moviecontroller=require('../controller/movieController');
const Movie = require('../models/movieModel');

routes.get('/',moviecontroller.addmovie);

routes.post('/movie/insertdata', Movie.uploadaImageFile, moviecontroller.insertdata);

routes.get('/view_movie',moviecontroller.view_movie);

routes.get('/view',moviecontroller.view);

routes.get('/movie/viewdata/:id',moviecontroller.viewdata);

routes.post('/insertcomment',moviecontroller.insertcomment);

module.exports=routes;