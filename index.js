const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

app.use(morgan('common'));

app.listen(8080, () => console.log('Your app is listening on port 8080.'));

mongoose.connect('mongodb://localhost:27017/moviedb', { useNewUrlParser: true, useUnifiedTopology: true });

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


//Not working
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
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


//Not working 
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

