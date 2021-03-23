import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

/**
 * Allows user to filter the list of movies
 * @function MoviesList
 */

function MoviesList(props) {
  const { movies, visibilityFilter, user } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.includes(visibilityFilter));
  }

  if (!movies) return <div className="main-view"/>;

  return <div className="movies-list">
          <div className="search-bar">
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
          </div>
          <div className="profilLink">          
            <Link to={`/users/${user}`}>
                <Button variant="success">My Profile</Button>
            </Link>
          </div>
          {filteredMovies.map(m => <MovieCard key={m._id} movie={m}/>)}
        </div>;
}

export default connect(mapStateToProps)(MoviesList);