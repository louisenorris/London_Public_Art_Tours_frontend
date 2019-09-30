import React, { Component } from 'react';
import Map from './Map.js'
import SearchBar from './SearchBar.js';
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react'


class MapContainer extends Component {

    state = {
        tour_name: ""
    }

    handleChange = (event) => {
        this.setState({tour_name: event.target.value})
    }


    render() {
        return (
          <div>
            <Map
              artworks={this.props.artworks}
              addToTourBtn={this.props.addToTourBtn}
              handleNewTour={this.props.handleNewTour}
              selectedTour={this.props.selectedTour}
            />

            <SearchBar
              handleArtworkSearch={this.props.handleArtworkSearch}
              searchTerm={this.props.searchTerm}
              showAllArtworks={this.props.showAllArtworks}
            />

            {this.props.addToTourBtn ? (
              <>
                <p>
                  {`Start adding artworks to your tour (9 max) by selecting a marker and clicking
                  Add to tour.`}
                </p>

                {this.props.tourInProgress
                  ? this.props.tourInProgress.map(tourstop => (
                      <>
                      <img class="ui avatar image" src={require(`../public/imgs/${tourstop.title.toLowerCase().split(' ').join('_')}.jpg`)} alt="artwork"/>
                      <span>{tourstop.title} </span>
                          <Button circular icon="trash alternate"
                            onClick={() =>
                              this.props.handleCancelArtwork(tourstop)
                            }
                          />
                          <br/>
                      </>
                    ))
                  : null}
                <p>Once you've finished your selection, add a Tour name and Save.</p>
                <label>Tour name: </label>
                <input
                  type="text"
                  value={this.state.tour_name}
                  placeholder="add your tour name"
                  onChange={this.handleChange}
                />
                <br/>
                
                {/* <button
                  onClick={() =>
                    this.props.createTour(
                      this.props.tourInProgress,
                      this.state.tour_name,
                      this.props.user
                    )
                  }
                  className="menu"
                > */}
                  {/* <NavLink to="/tours" exact>
                    Confirm Tour
                  </NavLink>
                </button> */}

                {/* <button onClick={this.props.cancelTour}>Cancel tour</button>

                <button onClick={this.props.logOut}>Log out</button> */}
                <br/>
                <Button.Group widths="3" color='black'>
                  <Button onClick={() =>
                    this.props.createTour(
                      this.props.tourInProgress,
                      this.state.tour_name,
                      this.props.user
                    )
                  } as={Link} to="/tours" exact ><Icon name="save" /></Button>
                  <Button onClick={this.props.cancelTour} ><Icon name="cancel" /></Button>
                  <Button onClick={this.props.logOut} ><Icon name="sign-out" /></Button>
                </Button.Group>
              </>
            ) : (
              <>
                <Button.Group widths="4" color='black'>
                  <Button onClick={() => this.props.showAddToTourBtnOnInfoWin()} ><Icon name="add circle" /></Button>
                  <Button as={Link} to="/account" exact ><Icon name="user circle outline" /></Button>
                  <Button as={Link} to="/tours" exact ><Icon name="map" /></Button>
                  <Button onClick={this.props.logOut} ><Icon name="sign-out" /></Button>
                </Button.Group>

                
                {/* <button onClick={() => this.props.showAddToTourBtnOnInfoWin()}>
                  Create a tour
                </button>

                <button>
                  <NavLink to="/account" exact>
                    User Account
                  </NavLink>
                </button> */}

                {/* <button>
                  <NavLink to="/tours" exact>
                    Tours
                  </NavLink>
                </button>

                <Button animated="fade" onClick={this.props.logOut}>
                  <Button.Content>
                    Log out
                    <br />
                    <Icon name="sign-out" />
                  </Button.Content>
                </Button>

                <Button animated="fade">
                  <Button.Content visible>
                    Sign-up for a Pro account
                  </Button.Content>
                  <Button.Content hidden>$12.99 a month</Button.Content>
                </Button> */}
                {/* <button onClick={this.props.logOut}>Log out</button> */}
              </>
            )}
          </div>
        );
    }
}

export default MapContainer;