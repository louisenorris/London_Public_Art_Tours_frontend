import React, { Component, useState } from 'react';
import { withScriptjs, GoogleMap, withGoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps';
import API from './adapters/API.js'

function GoogleMapRender(props) {
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    return (
    <GoogleMap 
        defaultCenter={{ lat: 51.4993233, lng: -0.1144514 }}
        defaultZoom={13}
    >
        {props.artworks && !props.selectedTour ? 
            (props.artworks.map(artwork =>
                <Marker
                    key={artwork.id}
                    position={{
                        lat: artwork.lat,
                        lng: artwork.lng
                    }}
                    onClick={() => setSelectedArtwork(artwork)}
                />
            )) : props.selectedTour ? 
            (props.selectedTour.artworks.map(artwork =>
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
                <p>{selectedArtwork.year}</p>
                <img className="ui bottom aligned tiny image" src={require(`../public/imgs/${selectedArtwork.title.toLowerCase().split(' ').join('_')}.jpg`)} alt="artwork"/>
                {
                    props.addToTourBtn ? 
                    <button onClick={() => props.handleNewTour(selectedArtwork)} >Add to tour</button>
                    : null
                }
                </>
            </InfoWindow>
        )}
        {props.directions && <DirectionsRenderer 
                                artworks={props.artworks}
                                directions={props.directions} 
                                selectedTourName={props.selectedTourName}
                                options={{
                                    polylineOptions: {
                                        storkeColor: props.storkeColor,
                                        strokeOpacity: 0.4,
                                        strokeWeight: 4
                                      },
                                      preserveViewport: true,
                                      suppressMarkers: true,
                                      icon: { scale: 3 }
                                }}/>}
    </GoogleMap>
    )
};

const MapWrapped = withScriptjs(withGoogleMap(GoogleMapRender))

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            directions: null,
            selectedTour: null
        };
        this.directionsPanel = React.createRef();
    }

    handleNewShowTourOnMap = (selectedTourID) => {
        API.getSelectedTour(selectedTourID)
        .then(data => this.setState({selectedTour: data.tour}, () => console.log("showing selected tour"))
    )}

    componentDidMount() {
        if (this.props.selectedTourID) this.handleNewShowTourOnMap(this.props.selectedTourID) 
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState !== this.state && this.state.selectedTour && this.props.selectedTourID) {
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            const wholeTour = this.state.selectedTour.artworks;
            const lastInTour = wholeTour[wholeTour.length-1];
            const origin = { lat: wholeTour[0].lat, lng: wholeTour[0].lng };
            const destination = { lat: lastInTour.lat, lng: lastInTour.lng };
            const middleArtworks = wholeTour.slice(1, -1);
            const waypointArtworks = middleArtworks.map(wp => { return { 
                location: new window.google.maps.LatLng(wp.lat, wp.lng),
                stopover: true }  
            })
        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.WALKING,
            waypoints: waypointArtworks,
            optimizeWaypoints: true
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result
              });
              directionsRenderer.setDirections(result);
              const route = result.routes[0];
              const summaryPanel = this.directionsPanel.current;
            
              summaryPanel.innerHTML = '';
              // for each route show summary information
              summaryPanel.innerHTML += '<br>';
              summaryPanel.innerHTML += '<h2 class="introlight" >' + this.state.selectedTour.name + '</h2><br>';
              summaryPanel.innerHTML += '<b>The Route:</b><br>';
              for (let i = 0; i < route.legs.length; i++) {
                  let routeSegment = i + 1;
                  summaryPanel.innerHTML += '<br><b>Artwork ' + routeSegment + ': ' + this.findArtworkForDirections(route.legs[i].start_address) + ' by ' + this.findArtistForDirections(route.legs[i].start_address) + '<br>';
                  summaryPanel.innerHTML += this.findArtworkYearForDirections(route.legs[i].start_address) + '<br>';
                  summaryPanel.innerHTML += `<img class="directionsimage" src="/imgs/${this.findArtworkForDirections(route.legs[i].start_address).toLowerCase().split(' ').join('_')}.jpg" alt="artwork"/><br>`;
                  summaryPanel.innerHTML += this.findArtworkDescForDirections(route.legs[i].start_address) + '<br>';
                  summaryPanel.innerHTML += '<br>';
                  summaryPanel.innerHTML += '<b>Step ' + routeSegment + ': ' + this.findArtworkForDirections(route.legs[i].start_address) +' to ' + this.findArtworkForDirections(route.legs[i].end_address) + '</b><br>';
                  summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                  summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                  summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                  summaryPanel.innerHTML += '<b>Directions:</b><br>';
                    for (let j = 0; j < route.legs[i].steps.length; j++) {
                        summaryPanel.innerHTML += '<li>' + route.legs[i].steps[j].instructions + '</li>';
                    }
              }
              let lastStep = route.legs[route.legs.length-1].end_address
                  summaryPanel.innerHTML += '<br><b>Artwork ' + (route.legs.length+1) + ': ' + this.findArtworkForDirections(lastStep) + ' by ' + this.findArtistForDirections(lastStep) + '<br>';
                  summaryPanel.innerHTML += this.findArtworkYearForDirections(lastStep) + '<br>';
                  summaryPanel.innerHTML += `<img class="directionsimage" src="/imgs/${this.findArtworkForDirections(lastStep).toLowerCase().split(' ').join('_')}.jpg" alt="artwork"/><br>`;
                  summaryPanel.innerHTML += this.findArtworkDescForDirections(lastStep) + '<br>';
                  summaryPanel.innerHTML += '<br>';
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
        }
    }

    findArtworkForDirections = (routeLegAddress) => {
        // console.log('artwork lookup', routeLegAddress)

        const artwork = this.state.selectedTour.artworks.find(artwork => artwork.address === routeLegAddress)
        // console.log('artwork found', artwork)
        return artwork.title
    }

    findArtistForDirections = (routeLegAddress) => {
        return this.state.selectedTour.artworks.find(artwork => artwork.address === routeLegAddress).artist
     }

     findArtworkYearForDirections = (routeLegAddress) => {
        return this.state.selectedTour.artworks.find(artwork => artwork.address === routeLegAddress).year
     }

     findArtworkDescForDirections = (routeLegAddress) => {
        return this.state.selectedTour.artworks.find(artwork => artwork.address === routeLegAddress).description
     }

    render() {
        return (
            <div>
                <MapWrapped
                artworks={this.props.artworks}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                loadingElement={<div style={{ height: '100%'}} />}
                containerElement={<div style={{ height: '600px' }} />}
                mapElement={<div style={{ height: '100%'}} />}
                addToTourBtn={this.props.addToTourBtn}
                handleNewTour={this.props.handleNewTour}
                selectedTour={this.state.selectedTour}
                directions={this.state.directions}
                selectedTourID={this.props.selectedTourID}
                />
                <div ref={this.directionsPanel}></div>
            </div>
        );
    }
}

export default Map;