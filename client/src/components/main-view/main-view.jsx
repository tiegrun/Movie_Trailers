import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';

import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import {
  Button,
  Form,
  FormControl,
  Navbar,
  Nav,
  NavDropdown,
  Row,
  Col,
} from 'react-bootstrap';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null, 
      Director: null,
      Genre: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    };
  }

  // onMovieClick(movie) {
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

  // onBtnClick() {
  //   this.setState({
  //     selectedMovie: null,
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });

    
    window.open('/', '_self');
    // window.location.href='/' ;
  }

  getMovies(token) {
    axios.get('https://tiegrun-movie-trailers.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const { movies, selectedMovie, user } = this.state;

    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
         <div className="main-view">          
          <div className="profilLink">          
            <Link to={`/users/${user}`}>
                <Button variant="success">My Profile</Button>
            </Link>
          </div>
          <Route exact path="/" render={() => {if (!user) 
            return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
            return movies.map(m => <MovieCard key={m._id} movie={m}/>) ;
            }
          }
          />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

          <Route path="/directors/:name" render={({ match }) => {
            if (!movies) 
            return <div className="main-view" />;
            return (<DirectorView director={movies.find((m) => m.Director.Name === match.params.name).Director}
                                  id={movies.find((m) => m.Director.Name === match.params.name)._id}/>);
            }}
          />
          <Route path="/genres/:name" render={({ match }) => {if (!movies) 
            return <div className="main-view" />;
            return (<GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre}
                                  id={movies.find((m) => m.Genre.Name === match.params.name)._id}/>);
            }}
          />
          <Route path="/users/:username" render={() => <ProfileView />} 
          />
         </div>
      </Router>
    );
  }
}