import React, { Component } from 'react';
import Map from './Map.js'
import SearchBar from './SearchBar.js';
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
              selectedTourID={this.props.selectedTourID}
            />
            { this.props.selectedTourID ? 
              null :
              <SearchBar
                handleArtworkSearch={this.props.handleArtworkSearch}
                searchTerm={this.props.searchTerm}
                showAllArtworks={this.props.showAllArtworks}
              />
            }
            {this.props.addToTourBtn ? (
              <>
                <p className="instructions">
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
                <p className="instructions2">Once you've finished your selection, add a Tour Name and Save.</p>
                <label>Tour Name: </label>
                <input
                  type="text"
                  value={this.state.tour_name}
                  placeholder="Add your tour name"
                  onChange={this.handleChange}
                  className="searchbar2"
                />
                <br/>

                {this.state.tour_name && this.props.tourInProgress.length ?
                  <>
                  <br/>
                <Button.Group style={{margin: '2px 0px 0px'}} widths="3" color='black'>
                  <Button onClick={() =>
                    this.props.createTour(
                      this.props.tourInProgress,
                      this.state.tour_name,
                      this.props.user
                    )
                  } as={Link} to="/account" exact ><Icon name="save" /></Button>
                  <Button onClick={this.props.cancelTour} ><Icon name="cancel" /></Button>
                  <Button onClick={this.props.logOut} ><Icon name="sign-out" /></Button>
                </Button.Group>
                  </>
                  : (
                  <>
                  <br/>
                <Button.Group style={{margin: '2px 0px 0px'}} widths="3" color='black'>
                  <Button onClick={this.props.cancelTour} ><Icon name="cancel" /></Button>
                  <Button onClick={() => this.props.showAllArtworks()} as={Link} to="/" exact="true" ><Icon name="home" /></Button>
                  <Button onClick={this.props.logOut} ><Icon name="sign-out" /></Button>
                </Button.Group>
                  </>
                  )
                }
              </>
            ) : ( <>
              { this.props.selectedTourID ? 
                (
                <>
                  <Button.Group widths="4" color='black'>
                    <Button as={Link} to="/account" exact="true" ><Icon name="user circle outline" /></Button>
                    <Button onClick={() => this.props.showAllArtworks()} as={Link} to="/" exact="true" ><Icon name="home" /></Button>
                    <Button as={Link} to="/tours" exact="true" ><Icon name="map" /></Button>
                    <Button onClick={this.props.logOut} ><Icon name="sign-out" /></Button>
                  </Button.Group>
                </>
              ) : (
                <>
                  <Button.Group widths="5" color='black'>
                    <Button onClick={() => this.props.showAddToTourBtnOnInfoWin()} ><Icon name="add circle" /></Button>
                    <Button as={Link} to="/account" exact="true" ><Icon name="user circle outline" /></Button>
                    <Button onClick={() => this.props.showAllArtworks()} as={Link} to="/" exact="true" ><Icon name="home" /></Button>
                    <Button as={Link} to="/tours" exact="true" ><Icon name="map" /></Button>
                    <Button onClick={this.props.logOut} ><Icon name="sign-out" /></Button>
                  </Button.Group>
                </>
              )
              }
              </>
            )}
          </div>
        );
    }
}

export default MapContainer;