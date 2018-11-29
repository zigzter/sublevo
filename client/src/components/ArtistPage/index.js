import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

export default class ArtistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: {},
            events: [],
            loading: true,
        }
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const cachedArtist = localStorage.getItem(id);
        const cachedEvents = localStorage.getItem(`${id}-events`);
        if (cachedArtist && cachedEvents) return this.setState({ artist: JSON.parse(cachedArtist), events: JSON.parse(cachedEvents), loading: false });
        const { artist, events } = await fetch(`/api/artists/${id}`, { method: 'GET' }).then(res => res.json());
        this.setState({ artist, events, loading: false });
        localStorage.setItem(id, JSON.stringify(artist));
        localStorage.setItem(`${id}-events`, JSON.stringify(events));
    }
    render() {
        const { artist, events, loading } = this.state;
        if (loading) {
            return (
                <div>
                    <Loader type="Audio" color="#000" height={80} width={80} />
                    <h4>Loading...</h4>
                </div>
            )
        }
        return (
            <div>
                <h1>{artist.name}</h1>
                <iframe src={`https://open.spotify.com/embed/artist/${artist.id}`} title='spotifyPlayer' width="400" height="200" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                {events.length > 0 && <h2>Upcoming events</h2>}
                {
                    events.map((event) => (
                        <p>{event.displayName}</p>
                    ))
                }
            </div>
        )
    }
};
