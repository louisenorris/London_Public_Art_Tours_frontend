import React, { Component } from 'react';
import Map from './Map.js'
import SearchBar from './SearchBar.js';
import { NavLink } from "react-router-dom";

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
                />

                <SearchBar 
                    handleArtworkSearch={this.props.handleArtworkSearch} 
                    searchTerm={this.props.searchTerm}
                    showAllArtworks={this.props.showAllArtworks}
                />

                {
                    this.props.addToTourBtn ? (
                        <>
                        <p>Start adding artworks to your tour - select a marker and click Add to tour.</p>
                        <input type="text" value={this.state.tour_name} placeholder="Add tour name" onChange={this.handleChange}/>

                        {
                            this.props.tourInProgress ? (

                            this.props.tourInProgress.map(tourstop => 
                                <>
                                <li>{tourstop.title} <button onClick={() => this.props.handleCancelArtwork(tourstop)}>x</button></li>
                                </>
                                ) 
                           ) : (
                            null
                            )
                            
                        }

                        <button onClick={() => this.props.createTour(this.props.tourInProgress, this.state.tour_name, this.props.user)} className="menu">
                            <NavLink to="/tours" exact>
                                Confirm Tour
                            </NavLink>
                        </button>

                        <button onClick={this.props.cancelTour}>Cancel tour</button>

                        <button onClick={this.props.logOut}>Log out</button>
                        </>
                    ) : (
                        <>
                        <button onClick={() => this.props.showAddToTourBtnOnInfoWin()}>Create a tour</button>
                        
                        <button>
                            <NavLink to="/account" exact>
                                User Account
                            </NavLink>
                        </button>

                        <button>
                            <NavLink to="/tours" exact>
                                Tours
                            </NavLink>
                        </button>

                        <button onClick={this.props.logOut}>Log out</button>
                        </>
                    )

                }
                
            </div>
        );
    }
}

export default MapContainer;