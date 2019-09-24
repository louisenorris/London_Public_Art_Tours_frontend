import React, { Component } from 'react';
import Artwork from './Artwork.js'
import { NavLink } from "react-router-dom";


class TourCard extends Component {
    render() {
        return (
            <div>
              <h2>{this.props.tour.name}</h2>
                {
                  this.props.tour.tour_artworks.map(tour_artwork => <Artwork 
                                                                        tour_artwork={tour_artwork} 
                                                                        artworks={this.props.artworks} 
                                                                    />)
                }
                {/* <button onClick={() => this.props.handleShowTourOnMap(this.props.tour.id)}>Show on map</button> */}
                <button onClick={() => this.props.handleShowTourOnMap(this.props.tour.id)} >
                    <NavLink to="/" exact>
                        Show on map
                    </NavLink>
                </button>
            </div>
        );
    }
}

export default TourCard;

