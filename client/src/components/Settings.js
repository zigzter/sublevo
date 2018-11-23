import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import AddArtistForm from './AddArtistForm';
import AddVenueForm from './AddVenueForm';
import ArtistsResults from './ArtistsResults';
import VenuesResults from './VenuesResults';

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
        console.log(artistsResults);
    }
    addArtist = async (addedArtistName, addedArtistId, artistImage) => {
        fetch('/artists/add', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                addedArtistName,
                addedArtistId,
                artistImage
            })
        }).then(console.log)
    }
    searchVenues = (e) => {
        e.preventDefault();
        console.log('searching venues')
    }
    render() {
        return (
            <div>
                <AddArtistForm searchArtists={this.searchArtists} />
                {this.state.loading && <Loader type="TailSpin" color="#000" height={200} width={200} />}
                {this.state.artists.length > 0 && <ArtistsResults addArtist={this.addArtist} artists={this.state.artists} />}
                <hr />
                <AddVenueForm searchVenues={this.searchVenues} />
                {this.state.venues.length > 0 && <VenuesResults />}
            </div>
        );
    }
};

