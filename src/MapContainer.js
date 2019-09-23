import React, { Component } from 'react';
import Map from './Map.js'
import SearchBar from './SearchBar.js';
import { NavLink } from "react-router-dom";



class MapContainer extends Component {
    render() {
        return (
            <div>
                <Map 
                    artworks={this.props.artworks} 
                    handleNewTour={this.props.handleAddArtworkToTourInProgress}
                    addToTourBtn={this.props.addToTourBtn}
                />

                <SearchBar 
                    handleArtworkSearch={this.props.handleArtworkSearch} 
                    searchTerm={this.props.searchTerm}
                    showAllArtworks={this.props.showAllArtworks}
                />
                <button className="menu" onClick={() => this.props.showAddToTourBtnOnInfoWin()}>Create a tour</button>
                
                <button className="menu">
                    <NavLink to="/account" exact>
                        User Account
                    </NavLink>
                </button>

                <button className="menu">
                    <NavLink to="/tours" exact>
                        Tours
                    </NavLink>
                </button>

                <button className="menu" onClick={this.props.logOut}>Log out</button>
            </div>
        );
    }
}

export default MapContainer;