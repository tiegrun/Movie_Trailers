import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {Button, Form, Container, Row, Col, nav} from 'react-bootstrap';
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Route} from "react-router-dom";
import './genre-view.scss';
import Card from 'react-bootstrap/Card';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const {genre, id } = this.props;

    if (!genre) return null;

      return (
        <div className="genre-view">
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title><span className="cardLabel">Genre: </span>{genre.Name}</Card.Title>
                <Card.Text><span className="cardLabel">Description: </span>{genre.Description}</Card.Text>
                <Link to={`/movies/${id}`}>
                  <Button variant="link">Back</Button>
                </Link>
              </Card.Body>
            </Card>
        </div>
      );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};