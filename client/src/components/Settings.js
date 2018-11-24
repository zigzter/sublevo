import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import AddArtistForm from './AddArtistForm';
import AddVenueForm from './AddVenueForm';
import ArtistsResults from './ArtistsResults';
import VenuesResults from './VenuesResults';
import EditSeenForm from './EditSeenForm';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            artists: [],
            venues: []
        }
    }
    searchArtists = async (e) => {
        e.preventDefault();
        this.setState({ loading: true, artists: [] });
        const artist = e.currentTarget.elements.artistName.value;
        const artistsResults = await fetch('/api/artists', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ artist })
        }).then(res => res.json());
        this.setState({
            artists: [...artistsResults],
            loading: false
        });
    }
    addArtist = async (addedArtistName, addedArtistId, artistImage) => {
        const btn = document.getElementById('addArtist');
        btn.disabled = true;
        btn.innerText = 'Adding artist...';
        const addResult = await fetch('/artists/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                addedArtistName,
                addedArtistId,
                artistImage
            })
        }).then(res => res.json());
        btn.innerText = (addResult.error) ? 'Arist added already!' : 'Artist added!';
    }
    searchVenues = async (e) => {
        e.preventDefault();
        this.setState({ loading: true, venues: [] })
        const venueSearch = e.currentTarget.elements.venueName.value;
        const venueResults = await fetch('/api/venue', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ venueSearch })
        }).then(res => res.json());
        await this.setState({
            venues: [...venueResults],
            loading: false
        });
        console.log(this.state.venues)
    }
    addVenue = async (venueId) => {
        fetch('/venues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ venueId })
        });
    }
    render() {
        return (
            <div>
                <EditSeenForm />
                <AddArtistForm searchArtists={this.searchArtists} />
                {this.state.loading && <Loader type="TailSpin" color="#000" height={200} width={200} />}
                {this.state.artists.length > 0 && <ArtistsResults addArtist={this.addArtist} artists={this.state.artists} />}
                <hr />
                <AddVenueForm searchVenues={this.searchVenues} />
                {this.state.venues.length > 0 && <VenuesResults addVenue={this.addVenue} venues={this.state.venues} />}
            </div>
        );
    }
};

