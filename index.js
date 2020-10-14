const express = require('express');
const morgan = require('morgan');
const uuid = require('uuid');
const app = express();

app.use(morgan('common'));

let topMovies = [
  {
    title: 'Fight Club',
    year: 1999,
    director: 'David Fincher',
    genre: 'thriller',
    imgUrl: '',
    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.'
  },
  {
    title: 'Interstellar',
    year: 2014,
    director: 'Christopher Nolan',
    genre: 'adventure',
    imgUrl: '',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
  },
  {
    title: 'Inception',
    year: 2010,
    director: 'Christopher Nolan',
    genre: 'action',
    imgUrl: '',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.'
  },
  {
    title: 'Leon: The Professional',
    year: 1994,
    director: 'Luc Besson',
    genre: 'crime',
    imgUrl: '',
    description: 'Mathilda, a 12-year-old girl, is reluctantly taken in by Léon, a professional assassin, after her family is murdered. An unusual relationship forms as she becomes his protégée and learns the assassin\'s trade.'
  },
  {
    title: 'The Girl with the Dragon Tattoo',
    year: 2011,
    director: 'David Fincher',
    genre: 'thriller',
    imgUrl: '',
    description: 'Journalist Mikael Blomkvist is aided in his search for a woman who has been missing for forty years by Lisbeth Salander, a young computer hacker.'
  },
  {
    title: 'The Platform',
    year: 2019,
    director: 'Galder Gaztelu Urrutia',
    genre: 'horror',
    imgUrl: '',
    description: 'A vertical prison with one cell per level. Two people per cell. Only one food platform and two minutes per day to feed. An endless nightmare trapped in The Hole.'
  },
  {
    title: 'Psycho',
    year: 1960,
    director: 'Alfred Hitchcock',
    genre: 'thriller',
    imgUrl: '',
    description: 'A Phoenix secretary embezzles $40,000 from her employer\'s client, goes on the run, and checks into a remote motel run by a young man under the domination of his mother.'
  },
  {
    title: "The Devil's Advocate",
    year: 1997,
    director: 'Taylor Hackford',
    genre: 'thriller',
    imgUrl: '',
    description: 'An exceptionally adept Florida lawyer is offered a job at a high-end New York City law firm with a high-end boss - the biggest opportunity of his career to date.'
  },
  {
    title: 'Glass',
    year: 2019,
    director: 'M. Night Shyamalan',
    genre: 'thriller',
    imgUrl: '',
    description: 'Security guard David Dunn uses his supernatural abilities to track Kevin Wendell Crumb, a disturbed man who has twenty-four personalities.'
  },
  {
    title: 'Split-24 identities',
    year: 2016,
    director: 'M. Night Shyamalan',
    genre: 'horror',
    imgUrl: '',
    description: 'Three girls are kidnapped by a man with a diagnosed 23 distinct personalities. They must try to escape before the apparent emergence of a frightful new 24th.'
  }
];

let topDirectors = [
  {
    name: 'David Fincher',
    bio: '',
    birthYear: '',
    deathYear: ''
  },
  {
    name: 'Christopher Nolan',
    bio: '',
    birthYear: '',
    deathYear: ''
  },
  {
    name: 'Luc Besson',
    bio: '',
    birthYear: '',
    deathYear: ''
  },
  {
    name: 'Galder Gaztelu Urrutia',
    bio: '',
    birthYear: '',
    deathYear: ''
  },
  {
    name: 'Alfred Hitchcock',
    bio: '',
    birthYear: '',
    deathYear: ''
  },
  {
    name: 'Taylor Hackford',
    bio: '',
    birthYear: '',
    deathYear: ''
  },
  {
    name: 'M. Night Shyamalan',
    bio: '',
    birthYear: '',
    deathYear: ''
  }
];

app.listen(8080, () => console.log('Your app is listening on port 8080.'));

app.get('/', (req, res) => {
  res.send(
    'View the latest movie trailers for many current and upcoming releases!'
  );
});

// app.get('/movies', (req, res) => {
//   res.json(topMovies);
// });

app.use('/doc', express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/movies', (req, res) => {
  res.send('Successful GET request returning data on all the movies');
});

// app.get('/movies/:title', (req, res) => {
//   res.send('Successful GET request returning data on this movie');
// });

app.get('/movies/directors', (req, res) => {
  res.send('Successful GET request returning data on all the directors');
});

app.get('/movies/directors/:name', (req, res) => {
  res.send('Successful GET request returning data on the director');
});

app.post('/users', (req, res) => {
  res.send('Successful POST request returning user registration');
});

app.put('/users/:name', (req, res) => {
  res.send('Successful PUT request returning user update');
});

app.post('/users/:name/favorites', (req, res) => {
  res.send('Successful POST request returning favorite update');
});

app.delete('/users/:name/favorites', (req, res) => {
  res.send('Successful DELETE request returning favorite delete');
});

app.delete('/users', (req, res) => {
  res.send('Successful DELETE request returning user deregistration');
});