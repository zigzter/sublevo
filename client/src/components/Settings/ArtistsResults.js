import React from 'react';
import { Card, CardTitle, CardImg, CardImgOverlay, Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ArtistsResults = (props) => (
    <div>
        {
            props.artists.map((artist) => (
                <Card className='text-center' style={{ width: '250px' }} key={artist.id} inverse>
                    <CardImg width='100%' src={(artist.images[2]) ? artist.images[2].url : 'https://via.placeholder.com/248'} />
                    <CardImgOverlay>
                        <CardTitle>
                            {artist.name}
                        </CardTitle>
                        <Button id='addArtist' onClick={() => props.addArtist(artist.name, artist.id, artist.images[0].url)} size='lg' color='success' block outline>Add Artist</Button>
                    </CardImgOverlay>
                </Card>
            ))
        }
    </div>
);

export default ArtistsResults;

ArtistsResults.propTypes = {
    artists: PropTypes.array,
    addArtist: PropTypes.func,
};
