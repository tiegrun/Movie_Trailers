import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import {Button, Form, Container, Row, Col, nav} from 'react-bootstrap';
import { Link } from "react-router-dom";
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  /**
   * login username and password
   * @function handleSubmit
   * @param {event}
   * @return {object} User info
   */

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://tiegrun-movie-trailers.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      alert("Username or Password is incorrect")
      console.log('no such user')
    });
  };
    
  return (
          <Container className="loginContainer">
            <Form>
              <Form.Group className='login'>
                <Row className='row'>
                <Col>
              <Form.Label className='Label'>Username:</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='Control'
                type='text'
                placeholder='Enter Username'
              />
                </Col>
                <Col>
              <Form.Label className='Label'>Password:</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='Control2'
                type='password'
                placeholder='Enter Password'
              />
                </Col>
                </Row>
                <Row className='row text-center'>
                <Col className='Button'>
              <Button type='button' variant='info' size="lg" onClick={handleSubmit} selected>Log in</Button>
              <Link to={`/register`}>
                <Button variant="secondary" size="lg" className="registerBtn" type="submit">
                   Sign Up
                </Button>
              </Link>
            </Col>
            </Row>
          </Form.Group>
          </Form>
          </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired
};