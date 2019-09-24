import React from 'react';

const Artwork = (props) => {

    const artworkInTour = props.artworks.find(artwork => artwork.id === props.tour_artwork.artwork_id)

    return (
        <>
        <li>
            {artworkInTour.title} by {artworkInTour.artist} 
        </li>
        </>
    );
};

export default Artwork;