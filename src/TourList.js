import React, { Component } from 'react';
import TourCard from './TourCard.js';

class TourList extends Component {
    render() {
        return (
            <div>
                <h2 className="intro">Available Tours</h2>
                
                { this.props.tours && this.props.artworks ?
                    this.props.tours.map(tour => <TourCard 
                                                    key={tour.id} 
                                                    tour={tour} 
                                                    artworks={this.props.artworks} 
                                                    handleShowTourOnMap={this.props.handleShowTourOnMap}
                                                />)
                    : null
                }
            </div>
        );
    }
}

export default TourList;