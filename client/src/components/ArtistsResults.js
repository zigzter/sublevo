import React from 'react';
import { Card, CardTitle, CardImg, CardImgOverlay, Button } from 'reactstrap';

const ArtistsResults = (props) => (
    <div>
        {
            props.artists.map((artist) => (
                <Card className='text-center' style={{ width: '250px' }} key={artist.id} inverse>
                    <CardImg width='100%' src={artist.images[2].url} />
                    <CardImgOverlay>
                        <CardTitle>
                            {artist.name}
                        </CardTitle>
                        <Button onClick={() => props.addArtist(artist.name, artist.id, artist.images[0].url)} size='lg' color='success' block outline>Add Artist</Button>
                    </CardImgOverlay>
                </Card>
            ))
        }
    </div>
);

export default ArtistsResults;


// external_urls: {spotify: "https://open.spotify.com/artist/5K4W6rqBFWDnAN6FQUkS6x" }
// followers: {href: null, total: 8724313 }
        // genres: (2)["pop rap", "rap"]
        // href: "https://api.spotify.com/v1/artists/5K4W6rqBFWDnAN6FQUkS6x"
        // id: "5K4W6rqBFWDnAN6FQUkS6x"
        // images: Array(3)
// 0: {height: 640, url: "https://i.scdn.co/image/a12d8543e28d71d9f1e7f5f363c1a6c73316f9e6", width: 640 }
// 1: {height: 320, url: "https://i.scdn.co/image/42119cbcb4d694e7f0fe4a6d684fbc63902a916d", width: 320 }
// 2: {height: 160, url: "https://i.scdn.co/image/e36258fefdac3bef70bbfa6eca6cb5ecf9f22cea", width: 160 }
        // length: 3
        // __proto__: Array(0)
        // name: "Kanye West"
        // popularity: 92
        // type: "artist"
// uri: "spotify:artist:5K4W6rqBFWDnAN6FQUkS6x"