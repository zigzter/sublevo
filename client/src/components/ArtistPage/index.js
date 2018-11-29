import React, { Component } from 'react';

export default class ArtistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: {},
            events: [],
        }
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        const cachedArtist = localStorage.getItem(id);
        const cachedEvents = localStorage.getItem(`${id}-events`);
        if (cachedArtist && cachedEvents) return this.setState({ artist: JSON.parse(cachedArtist), events: JSON.parse(cachedEvents) });
        const { artist, events } = await fetch(`/api/artists/${id}`, { method: 'GET' }).then(res => res.json());
        this.setState({ artist, events });
        localStorage.setItem(id, JSON.stringify(artist));
        localStorage.setItem(`${id}-events`, JSON.stringify(events));
    }
    render() {
        const { artist, events } = this.state;
        return (
            <div>
                <h1>{artist.name}</h1>
                <iframe src={`https://open.spotify.com/embed/artist/${artist.id}`} width="400" height="200" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <h2>Upcoming events</h2>
                {
                    events && events.map((event) => (
                        <p>{event.displayName}</p>
                    ))
                }
            </div>
        )
    }
};
