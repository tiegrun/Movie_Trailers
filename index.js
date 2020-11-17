const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');
const passport = require('passport');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
require('./passport');

const Movies = Models.Movie;
const Users = Models.User;

app.use(bodyParser.json());
app.use(morgan('common'));
app.use(cors());

let auth = require('./auth')(app);

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

// mongoose.connect('mongodb://localhost:27017/moviedb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send(
    'View the latest movie trailers for many current and upcoming releases!'
  );
});

app.use('/doc', express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/movies', (req, res) => {
  // res.send('Successful GET request returning data on all the movies');
  Movies.find()
    .then((movies)=>{
      res.status(201).json(movies);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).send("Error:" + err);
    })
});

app.get('/movies/:title', (req, res) => {
  // res.send('Successful GET request returning data on this movie');
  Movies.findOne({Title: req.params.title})
    .then((movie)=>{
      res.json(movie);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).send("Error:" + err);
    })
});

app.get('/movies/genres/:Name', (req, res) =>{
  Movies.findOne({'Genre.Name': req.params.Name})
  .then((movie)=>{
    res.status(201).json(movie.Genre)
    })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error:" + err);
  });
});

app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({'Director.Name': req.params.Name})
    .then((movies)=>{
      res.status(201).json(movies.Director);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).send("Error:" + err);
    })
});

app.get('/users', (req, res) => {
  // res.send('Successful POST request returning user registration');
  Users.find()
    .then((users)=>{
      res.status(201).json(users);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).send("Error:" + err);
    })
});

app.get('/users/:Name', (req, res) => {
  Users.findOne({Username: req.params.Name})
    .then((users)=>{
      res.status(201).json(users);
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).send("Error:" + err);
    })
});

app.post('/users', 
  [
    check('Username', 'Username is required').isLength({min: 4}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ],
  (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
});

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});


// passport.authenticate('jwt', {session: false}),

//working ok
app.post("/users/:Username/favorites/:MovieId", (req, res) => {
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      { $push: { FavoriteMovies: req.params.MovieId } },
      { new: true }, 
      (error, updatedUser) => {
        if (error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        } else {
          res.json(updatedUser);
        }
      }
    );
  }
);


//working ok
app.delete("/users/:Username/favorites/:MovieId", (req,res)=>{
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: { FavoriteMovies: req.params.MovieId } },
    { new: true }, 
    (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      } else {
        res.json(updatedUser);
      }
    }
  );
}
);


//working ok
app.delete('/users/:Username', (req, res) => {
  // res.send('Successful DELETE request returning user deregistration');
  Users.findOneAndRemove({Username: req.params.Username})
    .then((user)=>{
      if(!user){
        res.status(400).send(req.params.Username + " was not found ");
      }
      else{
        res.status(200).send(req.params.Username + " was Deleted");
      }
    })
    .catch((err)=>{
      console.error(err);
      res.status(500).send("Error:" + err);
    });
});

