import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
// import {Button} from 'react-bootstrap';

import './main-view.scss';

// #0
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

// import { MovieCard } from '../movie-card/movie-card';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';


export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
}

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

    window.open('/client', '_self');
    // window.location.href='/' ;
  }

  getMovies(token) {
    axios.get('https://tiegrun-movie-trailers.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // #1
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render() {
    // const { movies, selectedMovie, user } = this.state;
    
    // #2
    let { movies } = this.props;
    let { user } = this.state;

    // if (!movies) return <div className="main-view"/>;

    return (
      <Router basename="/client">
         <div className="main-view"> 
       
          <Route exact path="/" render={() => {if (!user) 
            return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
            return (<MoviesList movies={movies}
                                user={user}/>);
            }}
          />
          <Route path="/register" render={() => <RegistrationView />} />
          <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                                                                        user={user}
          />}/>

          <Route path="/directors/:name" render={({ match }) => { if (!movies) 
            return <div className="main-view" />;
            return <DirectorView movie={movies.find((m) => m.Director.Name === match.params.name)}/>;
            }}
          />

          <Route path="/genres/:name" render={({ match }) => {if (!movies) 
            return <div className="main-view" />;
            return <GenreView movie={movies.find((m) => m.Genre.Name === match.params.name)}/>;
            }}
          />

          <Route path="/users/:username" render={() => <ProfileView movies = {movies}/>}
          />
         </div>
      </Router>
    );
  }
}

// #3
let mapStateToProps = state => {
  return { movies: state.movies }
}

// #4
export default connect(mapStateToProps, { setMovies, setUser  } )(MainView);