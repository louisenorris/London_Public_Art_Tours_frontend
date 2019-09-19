import React from 'react';
import { Route, withRouter } from "react-router-dom";
import API from './adapters/API.js'
import Signup from './Signup.js';
import Login from './Login.js';
import MapContainer from './MapContainer.js';
import NavBar from './NavBar.js'


class App extends React.Component {


  state = {
    user: null
  }
  
  componentDidMount() {
    API.validateUser()
    .then(user => {
      this.setState({user})
    })
  }

  signUp = user => {
    API.signUp(user)
    .then(user => this.setState({user}))
    this.props.history.push("/")
  }

  logIn = user => {
    API.logIn(user)
    .then(user => this.setState({user}))
    this.props.history.push("/")
  }

  logOut = () => {
    API.clearToken()
    this.setState({user: null})
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <h1>London Public Art Tours</h1>   
        {
          this.state.user && !this.state.user.error ? (
            <Route exact path='/' component={() => <MapContainer user={this.state.user} logOut={this.logOut}/>} />
          ) : (
            
            < NavBar user={this.state.user} signUp={this.signUp} logIn={this.logIn} />
          )
        }
        <Route exact path="/login" component={(props) => <Login {...props} handleSubmit={this.logIn} />}/>
        <Route exact path="/signup" component={(props) => <Signup {...props} handleSubmit={this.signUp} />}/> 
      </div>

    );
  }
}

export default withRouter(App);