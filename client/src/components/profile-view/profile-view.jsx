import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile-view.scss';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {Form, Row, Col, nav} from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: [],
      movies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
    this.getMovies(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      username: null,
    });

    window.open('/', '_self');
  }

  getMovies(token) {
    axios.get('https://tiegrun-movie-trailers.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((res) => {
      // Assign the result to the state
      this.setState({
        movies: res.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
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

  deleteUser(){
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
      
    axios
    .delete(`https://tiegrun-movie-trailers.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      alert('Your account has been successfully deleted!');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open('/', '_self');
    })
    .catch(() => {
      console.log('It is impossible to delete');
    });
  }

  updateUsername(){
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const newUser = prompt("Please enter new Username", this.state.Username);
    console.log(newUser)

    if(newUser == null || newUser == this.state.Username){
    console.log("There is no change")
    }
    else{
      axios
        .put(`https://tiegrun-movie-trailers.herokuapp.com/users/${username}`, 
          {
          // Username: this.state.Username,
            Username: newUser,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday,
            FavoriteMovies: this.state.FavoriteMovies,
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then((data) => {
          console.log(data);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.open('/', '_self');    
        })
        .catch(function (err) {
          console.log('It is impossible to update');
        })
     }
  };

  updatePassword(){
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const newPassword = prompt("Please enter new Password", this.state.Password);
    console.log(newPassword)

    if(newPassword == null || newPassword == this.state.Password){
      console.log("There is no change")
    }
    else{
      axios
        .put(`https://tiegrun-movie-trailers.herokuapp.com/users/${username}`, 
          {
          // Username: this.state.Username,
            Username: this.state.Username,
            Password: newPassword,
            Email: this.state.Email,
            Birthday: this.state.Birthday,
            FavoriteMovies: this.state.FavoriteMovies,
          },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then((data) => {
          console.log(data);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.open('/', '_self');    
        })
        .catch(function (err) {
          console.log('It is impossible to update');
        })
     }
  };

  render() {
    const {filteredMovie} = this.props;
    const favoriteMovieList = this.state.FavoriteMovies;
    const allMovies = this.state.movies;
    
    return (
      
        <div className="profile-view">
          <Card>
            <Card.Body>
            <Card.Title>My Profile</Card.Title>
              <Card.Text><span className="cardLabel">Username: </span>{this.state.Username}</Card.Text>
              <Card.Text><span className="cardLabel">Email: </span>{this.state.Email}</Card.Text>
              <Card.Text><span className="cardLabel">Favorite Movies: </span>
                            {favoriteMovieList.filter(movie => movie.includes("")).map(filteredMovie => (
                              <li key={filteredMovie}>
                                <Link to={`/movies/${filteredMovie}`}>
                                 {allMovies.Genre}{filteredMovie}
                                </Link>
                             </li>
                            ))}
              </Card.Text>
              <div className="btns">
                <DropdownButton id="dropdown-item-button" title="Settings">
                  <Dropdown.Item as="button" onClick={() => this.updateUsername()}>Change Username</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => this.updatePassword()}>Change Password</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => this.onLoggedOut()}>Log out</Dropdown.Item>
                  <Dropdown.Item as="button" onClick={() => this.deleteUser()}>Delete a User</Dropdown.Item>
                </DropdownButton>
                <Link to={'/'}>
                  <Button variant="link">Home Page</Button>
                </Link>
              </div>  
            </Card.Body>  
          </Card>  
        </div>
    );
  }
}