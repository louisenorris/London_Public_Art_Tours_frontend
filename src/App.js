import React from 'react';
import { Route, withRouter } from "react-router-dom";
import API from './adapters/API.js'
import Signup from './Signup.js';
import Login from './Login.js';
import MapContainer from './MapContainer.js';
import NavBar from './NavBar.js';
import UserContainer from './UserContainer.js';
import TourContainer from './TourContainer.js';
import Container from '@material-ui/core/Container';
// import CssBaseline from '@material-ui/core/CssBaseline'; 
import backgroundImg from './London_Map4.png'


class App extends React.Component {

  state = {
    user: null,
    artworks: null,
    searchTerm: "",
    tourInProgress: [],
    addToTourBtn: false,
    tours: null,
    loginSignupClicked: false,
    selectedTourID: null
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
    this.setState({
      user: null,
      loginSignupClicked: false})
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

  handleLoginSignupClicked = () => {
    this.setState({loginSignupClicked: true})
  }


// /TOUR METHODS ///


  showAddToTourBtnOnInfoWin = () => {
    this.setState({addToTourBtn: true})
  }

  handleNewTour = (artwork) => {
    if (this.state.tourInProgress.includes(artwork)) return
    if (this.state.tourInProgress.length > 8) return
    this.setState({tourInProgress: [...this.state.tourInProgress, artwork]})
  }

  handleCancelArtwork = (artwork) => {
    const withoutCancelledArtwork = this.state.tourInProgress.filter(tourArtwork => tourArtwork !== artwork)
    this.setState({tourInProgress: withoutCancelledArtwork})
  }

  cancelTour = () => {
    this.setState({
      addToTourBtn: false,
      tourInProgress: []
    })
  }

  createTour = (artworks, tourName) => {
    API.createTour(artworks, tourName) 
    .then(data => this.setState({ 
      addToTourBtn: false,
      tourInProgress: [],
      user: {...this.state.user, tours: [...this.state.user.tours, data.tour]}
    }))
    // .then(this.props.history.push("/account"))
  }

  // /ARTWORKS ON MAP METHODS ///

  handleShowTourOnMap = (tourId) => {
    this.setState({selectedTourID: tourId})
  }

  handleArtworkSearch = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  showAllArtworks = () => {
    this.setState({
      searchTerm: "",
      selectedTourID: null
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

  componentWillUnmount() {
    this.setState({ loginSignupClicked: false})
  }

  renderContent = () => {
    if (this.state.user && !this.state.user.error) {
      return  <Route exact path='/' component={() => <MapContainer 
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
                                                  handleCancelArtwork={this.handleCancelArtwork}
                                                  createTour={this.createTour}
                                                  // selectedTour={this.state.selectedTour}
                                                  // selectedTourName={this.state.selectedTourName}
                                                  selectedTourID={this.state.selectedTourID}
                                                />
                                              } 
              />
    } else if (this.state.loginSignupClicked) {
      return (
        <div style={{
          backgroundImage: "url(" + backgroundImg + ")",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundOpacity: 0.5
        }}>
      < NavBar user={this.state.user} signUp={this.signUp} logIn={this.logIn} handleLoginSignupClicked={this.handleLoginSignupClicked}/>
      </div>
      )
    } else {
      return (
        <>
          <div style={{
          backgroundImage: "url(" + backgroundImg + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: '100%'
          }}>
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          < NavBar user={this.state.user} signUp={this.signUp} logIn={this.logIn} handleLoginSignupClicked={this.handleLoginSignupClicked}/>
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <h1 className="introlight">Mapping app to aid navigation around London's public art. Discover ready-made tours or create your own experience.</h1>
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          <br/> 
          {/* <img style={{position: 'relative', width: '100%', bottom: "2.5%"}} className="center" src={require("./london-skyline-isolated-big-hi.png")} alt="london"/> */}
          </div>
          </>
      )
    }
  }

  render() {
    return (
      <>
      {/* <CssBaseline /> */}
      <Container maxWidth="sm" style={{height: '100%', marginTop: '5px' }}>
        <h1 className="title">Public Art London</h1>   
        {this.renderContent()}

        <Route exact path="/login" component={(props) => <Login {...props} handleSubmit={this.logIn} />}/>
        <Route exact path="/signup" component={(props) => <Signup {...props} handleSubmit={this.signUp} />}/> 
        <Route exact path="/account" component={(props) => <UserContainer {...props} user={this.state.user} updateUser={this.updateUser} deleteUser={this.deleteUser} handleShowTourOnMap={this.handleShowTourOnMap} artworks={this.state.artworks} showAllArtworks={this.showAllArtworks} logOut={this.logOut}/>} />
        <Route exact path="/tours" component={(props) => <TourContainer {...props} tours={this.state.tours} artworks={this.state.artworks} handleShowTourOnMap={this.handleShowTourOnMap} logOut={this.logOut} showAllArtworks={this.showAllArtworks}/>} />
      </Container>
    </>
    )
  }
}

export default withRouter(App);