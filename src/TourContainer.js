import React, { Component } from 'react';
import TourList from './TourList.js';
import { Link } from "react-router-dom";
import { Button, Icon } from 'semantic-ui-react'


class TourContainer extends Component {
    render() {
        return (
            <>
            <TourList tours={this.props.tours} artworks={this.props.artworks} handleShowTourOnMap={this.props.handleShowTourOnMap}/>
            <Button.Group widths="3" color='black'>
                <Button as={Link} to="/account" exact="true" ><Icon name="user circle outline" /></Button>
                <Button onClick={() => this.props.showAllArtworks()} as={Link} to="/" exact="true" ><Icon name="home" /></Button>
                <Button onClick={this.props.logOut} ><Icon name="sign-out" /></Button>
            </Button.Group>
            </>
        );
    }
}

export default TourContainer;