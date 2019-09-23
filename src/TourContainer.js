import React, { Component } from 'react';
import TourList from './TourList.js';


class TourContainer extends Component {
    render() {
        return (
            <TourList tours={this.props.tours} artworks={this.props.artworks} handleShowTourOnMap={this.props.handleShowTourOnMap}/>
        );
    }
}

export default TourContainer;