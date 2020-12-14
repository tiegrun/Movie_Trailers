import React from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Container, Row, Col, nav} from 'react-bootstrap';
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Route} from "react-router-dom";
import './director-view.scss';
import Card from 'react-bootstrap/Card';

export class DirectorView extends React.Component {
  constructor() {
    super();
    
    this.state = {
     
    };
  }

  render() {
    const {movie} = this.props;
   
    if (!movie) return null;

      return (
        <div className="director-view">
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title><span className="cardLabel">Name: </span>{movie.Director.Name}</Card.Title>
                <Card.Text><span className="cardLabel">Director Bio: </span>{movie.Director.Bio}</Card.Text>
                <Card.Text><span className="cardLabel">Birth Year: </span>{movie.Director.Birth}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link">Back</Button>
                </Link>
              </Card.Body>
            </Card>
        </div>
      );
  }
}

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired,
};