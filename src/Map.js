import React, { Component, useState } from 'react';
import { withScriptjs, GoogleMap, withGoogleMap, Marker, InfoWindow, DirectionsRenderer } from 'react-google-maps';

function GoogleMapRender(props) {
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    return (
    <GoogleMap 
        defaultCenter={{ lat: 51.4993233, lng: -0.1144514 }}
        defaultZoom={13}
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
                <p>{selectedArtwork.year}</p>
                <img class="ui bottom aligned tiny image" src={require(`../public/imgs/${selectedArtwork.title.toLowerCase().split(' ').join('_')}.jpg`)} alt="artwork"/>
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

    state = {
        directions: null
    }

    componentDidMount(){
        if (this.props.selectedTour) {
            const directionsService = new window.google.maps.DirectionsService();
            const directionsRenderer = new window.google.maps.DirectionsRenderer();
            const wholeTour = this.props.selectedTour
            const lastInTour = wholeTour[wholeTour.length-1]
            const origin = { lat: wholeTour[0].lat, lng: wholeTour[0].lng };
            const destination = { lat: lastInTour.lat, lng: lastInTour.lng };
            const middleArtworks = wholeTour.slice(1, -1)
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
            //   directionsRenderer.setPanel(document.getElementById('directionsPanel'))
              directionsRenderer.setDirections(result);
              const route = result.routes[0];
              const summaryPanel = document.getElementById('directionsPanel');
              summaryPanel.innerHTML = '';
              // for each route show summary information
              summaryPanel.innerHTML += '<br>';
              summaryPanel.innerHTML += '<b>Tour: ' + this.props.selectedTourName + '</b><br><br>';
              summaryPanel.innerHTML += '<b>The Route:</b><br>';
              for (let i = 0; i < route.legs.length; i++) {
                  let routeSegment = i + 1;
                  summaryPanel.innerHTML += '<br><b>Artwork ' + routeSegment + ': ' + this.findArtworkForDirections(route.legs[i].start_address) + ' by ' + this.findArtistForDirections(route.legs[i].start_address) + '<br>';
                  summaryPanel.innerHTML += this.findArtworkYearForDirections(route.legs[i].start_address) + '<br>';
                  summaryPanel.innerHTML += `<img class="image" src="/imgs/${this.findArtworkForDirections(route.legs[i].start_address).toLowerCase().split(' ').join('_')}.jpg" alt="artwork"/><br>`;
                  summaryPanel.innerHTML += this.findArtworkDescForDirections(route.legs[i].start_address) + '<br>';
                  summaryPanel.innerHTML += '<br>';
                  summaryPanel.innerHTML += '<b>Step ' + routeSegment + ': ' + this.findArtworkForDirections(route.legs[i].start_address) +' to ' + this.findArtworkForDirections(route.legs[i].end_address) + '</b><br>';
                //   summaryPanel.innerHTML += this.findArtworkForDirections(route.legs[i].start_address)
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
                  summaryPanel.innerHTML += `<img class="image" src="/imgs/${this.findArtworkForDirections(lastStep).toLowerCase().split(' ').join('_')}.jpg" alt="artwork"/><br>`;
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
       return this.props.artworks.find(artwork => artwork.address === routeLegAddress).title
    }

    findArtistForDirections = (routeLegAddress) => {
        return this.props.artworks.find(artwork => artwork.address === routeLegAddress).artist
     }

     findArtworkYearForDirections = (routeLegAddress) => {
        return this.props.artworks.find(artwork => artwork.address === routeLegAddress).year
     }

     findArtworkDescForDirections = (routeLegAddress) => {
        return this.props.artworks.find(artwork => artwork.address === routeLegAddress).description
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
                selectedTour={this.props.selectedTour}
                selectedTourName={this.props.selectedTourName}
                directions={this.state.directions}
                />
                <div id='directionsPanel'></div> 
            </div>
        );
    }
}

export default Map;