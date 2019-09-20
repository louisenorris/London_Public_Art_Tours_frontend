import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, GoogleMap, withGoogleMap, Marker } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

const GoogleMapRender = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
        loadingElement: <div style={{ height: '100%'}} />,
        containerElement: <div style={{ height: '400px' }} />,
        mapElement: <div style={{ height: '100%'}} />
    }),    
    withScriptjs,
    withGoogleMap
    )((props) => (
    <GoogleMap 
        defaultCenter={{ lat: 51.523, lng: -0.191 }}
        defaultZoom={10}
    >
        {props.artworks ? 
            (<MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.artworks.map(artwork =>
                <Marker
                    key={artwork.id}
                    position={{
                        lat: artwork.lat,
                        lng: artwork.lng
                    }}
                />
                )}
            </MarkerClusterer> ) : (null) }
        
    </GoogleMap>
    ));

class Map extends Component {

    // displayMarkers = () => {
    //     return this.props.artworks.map((artwork, index) => {
    //         return <Marker key={index} id={index} position={{
    //             lat: artwork.lat,
    //             lng: artwork.lng
    //         }}
    //     onClick={() => console.log("marker clicked!!")} />
    //     })
    // }

    render() {
        return (
            <div>
                <GoogleMapRender
                artworks={this.props.artworks}
                />
            </div>
        );
    }
}

export default Map;