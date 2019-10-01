import React from 'react';


const Artwork = (props) => {

    const artworkInTour = props.artworks.find(artwork => artwork.id === props.tour_artwork.artwork_id)

    return (
        <>
            <img style={{margin: "3.0625px 3.0625px 0px 0px"}} className="ui avatar image" src={require(`../public/imgs/${artworkInTour.title.toLowerCase().split(' ').join('_')}.jpg`)} alt="artwork"/>
            <span>{artworkInTour.title} by {artworkInTour.artist}</span>
            <br/>
        </>
    );
};

export default Artwork;