import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {Button, Form, Container, Row, Col, nav} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './genre-view.scss';
import Card from 'react-bootstrap/Card';

/**
 * Genre info
 * @function GenreView
 * @param {string} props  
 * @returns {Container} - genre info
 */

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {
      
    };
  }

  render() {
    const {movie} = this.props;
    
    if (!movie) return null;
     
      return (
        
        <div className="genre-view">
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title><span className="cardLabel">Genre: </span>{movie.Genre.Name}</Card.Title>
                <Card.Text><span className="cardLabel">Description: </span>{movie.Genre.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link">Back</Button>
                </Link>
              </Card.Body>
            </Card>
        </div>
      );
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};