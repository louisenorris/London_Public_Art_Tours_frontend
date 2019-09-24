import React, { Component, useState } from 'react';
import { withScriptjs, GoogleMap, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

function GoogleMapRender(props) {
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    return (
    <GoogleMap 
        defaultCenter={{ lat: 51.523, lng: -0.191 }}
        defaultZoom={10}
    >
        {props.artworks ? 
            (props.artworks.map(artwork =>
                <Marker
                    key={artwork.id}
                    position={{
                        lat: artwork.lat,
                        lng: artwork.lng
                    }}
                    onClick={() => setSelectedArtwork(artwork)}

                />
            )) : (null) }
        {selectedArtwork && (
            <InfoWindow
            onCloseClick={() => setSelectedArtwork(null)}
            position={{
                lat: selectedArtwork.lat,
                lng: selectedArtwork.lng
            }}
            addToTourBtn={props.addToTourBtn}
            handleNewTour={props.handleNewTour}
            >
                <>
                <h3>{selectedArtwork.title}</h3>
                <p>{selectedArtwork.artist}</p>
                {
                    props.addToTourBtn ? 
                    <button onClick={() => props.handleNewTour(selectedArtwork)} >Add to tour</button>
                    : null
                }
                </>
            </InfoWindow>
        )}
    </GoogleMap>
    )
};

const MapWrapped = withScriptjs(withGoogleMap(GoogleMapRender))

class Map extends Component {


    render() {
        return (
            <div>
                <MapWrapped
                artworks={this.props.artworks}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                loadingElement={<div style={{ height: '100%'}} />}
                containerElement={<div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: '100%'}} />}
                addToTourBtn={this.props.addToTourBtn}
                handleNewTour={this.props.handleNewTour}
                />
            </div>
        );
    }
}

export default Map;