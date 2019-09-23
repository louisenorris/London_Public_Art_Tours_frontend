import React from 'react';
import { Route, withRouter } from "react-router-dom";
import API from './adapters/API.js'
import Signup from './Signup.js';
import Login from './Login.js';
import MapContainer from './MapContainer.js';
import NavBar from './NavBar.js';
import UserContainer from './UserContainer.js';
import TourContainer from './TourContainer.js';

class App extends React.Component {

  state = {
    user: null,
    artworks: null,
    searchTerm: "",
    tourInProgress: [],
    addToTourBtn: false,
    tours: null,
    selectedTour: null
  }
  
  componentDidMount() {
    API.validateUser()
    .then(user => {
      this.setState({user})
    })

    API.getArtworks()
    .then(artworks => {
      this.setState({artworks})
    })

    API.getTours()
    .then(tours => {
      this.setState({tours})
    })
  }

  // /USER METHODS ///

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

  updateUser = (event, user) => {
    event.preventDefault()
    API.updateUser(user)
    .then(user => this.setState({user}))
    .then(this.props.history.push("/account"))
  }

  deleteUser = id => {
    API.deleteUser(id)
    .then(this.logOut())
  }


// /TOUR METHODS ///


  showAddToTourBtnOnInfoWin = () => {
    this.setState({addToTourBtn: true})
  }

  handleNewTour = (artwork) => {
    if (this.state.tourInProgress.includes(artwork)) return
    this.setState({tourInProgress: [...this.state.tourInProgress, artwork]})
  }

  cancelTour = () => {
    this.setState({
      addToTourBtn: false,
      tourInProgress: []
    })
  }

  // /ARTWORKS ON MAP METHODS ///

  handleShowTourOnMap = (tourId) => {
    const findArtworks = this.state.artworks.filter(artwork => artwork.tour_artworks.find(tour_artwork => tour_artwork.tour_id === tourId))
    this.setState({selectedTour: findArtworks})
  }

  handleArtworkSearch = (event) => {
    this.setState({searchTerm: event.target[0].value})
  }

  showAllArtworks = () => {
    this.setState({
      searchTerm: "",
      selectedTour: null
    })
  } 

  searchAndFilterArtworks = () => {
    if (this.state.searchTerm) {
      return this.state.artworks.filter(artwork => artwork.title.toLocaleLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()) || artwork.artist.toLocaleLowerCase().includes(this.state.searchTerm.toLocaleLowerCase()))
    } else if (this.state.selectedTour) {
      return this.state.selectedTour 
    } else {
      return this.state.artworks
    }
  }


  render() {
    return (
      <div>
        <h1 className="title">Public Art Tours</h1>   
        {
          this.state.user && !this.state.user.error ? (
            <Route exact path='/' component={() => <MapContainer 
                                                      user={this.state.user} 
                                                      artworks={this.searchAndFilterArtworks()} 
                                                      handleArtworkSearch={this.handleArtworkSearch} 
                                                      searchTerm={this.state.searchTerm} 
                                                      logOut={this.logOut}
                                                      showAddToTourBtnOnInfoWin={this.showAddToTourBtnOnInfoWin}
                                                      addToTourBtn={this.state.addToTourBtn}
                                                      showAllArtworks={this.showAllArtworks}
                                                      tours={this.state.tours}
                                                      handleNewTour={this.handleNewTour}
                                                      tourInProgress={this.state.tourInProgress}
                                                      cancelTour={this.cancelTour}
                                                    />
                                            } 
            />
          ) : (
            
            < NavBar user={this.state.user} signUp={this.signUp} logIn={this.logIn} />
          )
        }
        <Route exact path="/login" component={(props) => <Login {...props} handleSubmit={this.logIn} />}/>
        <Route exact path="/signup" component={(props) => <Signup {...props} handleSubmit={this.signUp} />}/> 
        <Route exact path="/account" component={(props) => <UserContainer {...props} user={this.state.user} updateUser={this.updateUser} deleteUser={this.deleteUser} />} />
        <Route exact path="/tours" component={(props) => <TourContainer {...props} tours={this.state.tours} artworks={this.state.artworks} handleShowTourOnMap={this.handleShowTourOnMap} />} />
      </div>

    )
  }
}

export default withRouter(App);