import React, { Component } from 'react';
import Map from './Map.js'


class MapContainer extends Component {
    render() {
        return (
            <div>
                <Map artworks={this.props.artworks}/>

                <button onClick={this.props.logOut}>Log out</button>
            </div>
        );
    }
}

export default MapContainer;