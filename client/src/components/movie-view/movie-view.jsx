import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick  } = this.props;

    // for example, it's not right :))

    const favs = Array();

    const addFav = ((e) => {

        if(favs.includes(movie.Title)){

          if(e.target.innerText === "Remove from favorites"){
            favs.pop();
            console.log(favs);
            alert('Successfully removed');
            e.target.innerText = "Add to favorites" ;
          }
          else{
            favs.push(movie.Title);
            alert('Already exists');
            favs.pop();
            console.log(favs);
            e.target.innerText = "Remove from favorites" ;
          }
        }
        else{
          // const username = localStorage.getItem('user');
          // const token = localStorage.getItem('token');
        

          // axios
          // .post(`https://tiegrun-movie-trailers.herokuapp.com/users/${username}`, {
          //    headers: { Authorization: `Bearer ${token}` },
          //    FavoriteMovies: movie._id,
          //    })
             
          console.log("Successfully Added");
          favs.push(movie.Title);
          console.log(favs);
          alert('Successfully Added');
          e.target.innerText = "Remove from favorites"
         }
    })
    
    if (!movie) return null;

    return (
      <div className="movie-view">
        <img className="movie-poster" src={movie.ImagePath} />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </div>
        <div className="backBtn">
         
          <Button variant="warning" size="sm" type="submit" onClick={addFav}>Add to favorites</Button>
          <Link to={`/`}>
            <Button variant="info" size="sm">Back</Button>
          </Link>
        </div>   
       </div>     
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};