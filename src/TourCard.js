import React, { Component } from 'react';
import Artwork from './Artwork.js'
import API from './adapters/API.js'
import { Link } from "react-router-dom";
import { Button } from 'semantic-ui-react'


class TourCard extends Component {

    state = {
        tourCreator: null
    }

    getTourCreatingUser = (userId) =>{
        API.getTourCreatingUser(userId)
        .then(data => { 
            this.setState({tourCreator: data.user.username})})
      }

    componentDidMount() {
        this.getTourCreatingUser(this.props.tour.user_id)
    }

    render() {
        return (
            <div>
              <h3 className="menulighter">{this.props.tour.name}</h3>
                {
                  this.props.tour.tour_artworks.map(tour_artwork => <Artwork 
                                                                        key={tour_artwork.id}
                                                                        tour_artwork={tour_artwork} 
                                                                        artworks={this.props.artworks} 
                                                                    />)
                }
                {this.state.tourCreator ? (`Created by: ${this.state.tourCreator}`) : null}
                <br/>
                <Button color='black' style={{maxHeight: '30px', padding: '5px'}} onClick={() => this.props.handleShowTourOnMap(this.props.tour.id)} as={Link} to="/" exact="true" >Get directions</Button>
                <br/>
                <br/>
            </div>
        );
    }
}

export default TourCard;

