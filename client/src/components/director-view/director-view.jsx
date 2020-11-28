import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {Button, Form, Container, Row, Col, nav} from 'react-bootstrap';
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Route} from "react-router-dom";
import './director-view.scss';
import Card from 'react-bootstrap/Card';

export class DirectorView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {director, id } = this.props;

    if (!director) return null;

      return (
        <div className="director-view">
            <Card style={{ width: '25rem' }}>
              <Card.Body>
                <Card.Title><span className="cardLabel">Name: </span>{director.Name}</Card.Title>
                <Card.Text><span className="cardLabel">Director Bio: </span>{director.Bio}</Card.Text>
                <Card.Text><span className="cardLabel">Birth Year: </span>{director.Birth}</Card.Text>
                <Link to={`/movies/${id}`}>
                  <Button variant="link">Back</Button>
                </Link>
              </Card.Body>
            </Card>
        </div>
      );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired,
};