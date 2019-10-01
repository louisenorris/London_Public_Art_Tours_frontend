import React, { Component } from 'react';
import TourCard from './TourCard.js';

class TourList extends Component {
    render() {
        return (
            <div style={{overflow: 'scroll', height: '56em'}}>
                <h2 className="introlight">Available Tours</h2>
                
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