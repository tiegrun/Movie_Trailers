import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {
     
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios
      .get(`https://tiegrun-movie-trailers.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      .then((res) => {
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    const { movie, onClick, user  } = this.props;

    const handlesubmit = ((e) => {
          const username = localStorage.getItem('user');
          const token = localStorage.getItem('token');
          const FavoriteMovieList = this.state.FavoriteMovies;

          //object values of FavoriteMovies
          const ValueFavoriteMovieList = Object.values(FavoriteMovieList);
      
        if(ValueFavoriteMovieList.includes(movie._id)){

          if(e.target.innerText === "Remove from favorites"){

            axios
              .delete(`https://tiegrun-movie-trailers.herokuapp.com/users/${username}/favorites/${movie._id}`, 
              {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((data ) => {
                // console.log(data)
                window.open(`/client/movies/${movie._id}`, '_self');
              })
              .catch(function (err) {
              console.log(err);
              });

            console.log("removed");

            alert('Successfully removed');

            e.target.innerText = "Add to favorites" ;
          }
          else{
            alert('Already exists');

            e.target.innerText = "Remove from favorites" ;
          }
        }
        else{

          axios
             .post(`https://tiegrun-movie-trailers.herokuapp.com/users/${username}/favorites/${movie._id}`, 
            {
              Username: this.state.Username,
              Password: this.state.Password,
              Email: this.state.Email,
              Birthday: this.state.Birthday,
              FavoriteMovies: [movie._id]
            },
            {
              headers: { Authorization: `Bearer ${token}` }
            }
            )
             .then((data ) => {
                console.log(data)
                window.open(`/client/movies/${movie._id}`, '_self');
            })
            .catch(function (err) {
              console.log(err);
            });
           
          alert('Successfully Added');

          e.target.innerText = "Remove from favorites";

          console.log(FavoriteMovieList)
         }
        }
    )
    
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
          <Button variant="warning" size="sm" type="submit" onClick={handlesubmit}>Add to favorites</Button>
          <Link to={`/`}>
            <Button variant="info" size="sm">Home</Button>
          </Link>
          <Link to={`/users/${user}`}>
                <Button variant="success">My Profile</Button>
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