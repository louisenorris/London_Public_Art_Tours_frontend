import React, { Component } from 'react';


class MapContainer extends Component {
    render() {
        return (
            <div>
                Map container

                <button onClick={this.props.logOut}>Log out</button>
            </div>
        );
    }
}

export default MapContainer;