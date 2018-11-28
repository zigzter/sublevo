import React, { Component } from 'react';

export default class ArtistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: {}
        }
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const cachedArtist = localStorage.getItem(id);
        if (cachedArtist) return this.setState({ artist: JSON.parse(cachedArtist) });
        const artist = await fetch(`/api/artists/${id}`, { method: 'GET' }).then(res => res.json());
        this.setState({ artist });
        localStorage.setItem(id, JSON.stringify(artist));
    }
    render() {
        const { artist } = this.state;
        console.log(artist);
        return (
            <div>
                <h1>{artist.name}</h1>
                <iframe src={`https://open.spotify.com/embed/artist/${artist.id}`} width="400" height="200" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        )
    }
};
