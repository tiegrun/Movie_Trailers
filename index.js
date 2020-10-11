const express = require('express');
const morgan = require('morgan');
const app = express();


app.use(morgan('common'));

let topMovies = [
  {
    title: 'Fight Club (1999)',
    director: 'David Fincher',
  },
  {
    title: 'Interstellar (2014)',
    director: 'Christopher Nolan',
  },
  {
    title: 'Inception (2010)',
    director: 'Christopher Nolan',
  },
  {
    title: 'Leon: The Professional (1994)',
    director: 'Luc Besson',
  },
  {
    title: 'The Girl with the Dragon Tattoo (2011)',
    director: 'David Fincher',
  },
  {
    title: 'The Platform (2019)',
    director: 'Galder Gaztelu Urrutia',
  },
  {
    title: 'Psycho (1960)',
    director: 'Alfred Hitchcock',
  },
  {
    title: "The Devil's Advocate (1997)",
    director: 'Taylor Hackford',
  },
  {
    title: 'Glass (2019)',
    director: 'M. Night Shyamalan',
  },
  {
    title: 'Split (2016)',
    director: 'M. Night Shyamalan',
  },
];

app.listen(8080, () => console.log('Your app is listening on port 8080.'));

app.get('/', (req, res) => {
  res.send(
    'View the latest movie trailers for many current and upcoming releases!'
  );
});

app.get('/movies', (req, res) => {
  res.json(topMovies);
});

app.use('/toplist', express.static('public'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
