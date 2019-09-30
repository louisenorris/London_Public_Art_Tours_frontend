import React, { Component } from 'react';
import Artwork from './Artwork.js'
import { NavLink } from "react-router-dom";


class TourCard extends Component {
    render() {
        return (
            <div>
              <h4 className="menu">{this.props.tour.name}</h4>
                {
                  this.props.tour.tour_artworks.map(tour_artwork => <Artwork 
                                                                        tour_artwork={tour_artwork} 
                                                                        artworks={this.props.artworks} 
                                                                    />)
                }
                <button onClick={() => this.props.handleShowTourOnMap(this.props.tour.id)} >
                    <NavLink to="/" exact>
                        Get directions
                    </NavLink>
                </button>
                <br/>
                <br/>
            </div>
        );
    }
}

export default TourCard;

