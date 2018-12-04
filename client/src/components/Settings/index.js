import React, { Component } from 'react';
import { Nav, NavItem, TabPane, NavLink, TabContent } from 'reactstrap';
import Loader from 'react-loader-spinner';
import AddArtistForm from './AddArtistForm';
import AddVenueForm from './AddVenueForm';
import ArtistsResults from './ArtistsResults';
import VenuesResults from './VenuesResults';
import EditSeenForm from './EditSeenForm';
import PersonalInfo from './PersonalInfo';
import EditVenueForm from './EditVenueForm';
import PropTypes from 'prop-types';
import './index.scss';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            artists: [],
            venues: [],
            seen: [],
            userInfo: {},
            activeTab: '1',
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
    }
    addVenue = async (venueId, name) => {
        fetch('/venues', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ venueId, name })
        });
        localStorage.removeItem('events');
    }
    updateSeen = async (event) => {
        event.preventDefault();
        const { id: { value: id }, seenCount: { value: seenCount } } = event.currentTarget.elements;
        fetch('/artists/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, seenCount })
        });
        document.getElementById(`${ id }`).innerText = 'Updated!';
        document.getElementById(`${ id }`).disabled = true;
    }
    removeSeen = async (artistId) => {
        fetch('/artists', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ artistId })
        })
        const filteredSeen = this.state.seen.filter(seen => seen.artistId !== artistId);
        this.setState({ seen: filteredSeen })
    }
    removeSub = async (targetId) => {
        fetch('/venues', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ targetId }) });
        localStorage.removeItem('events');
        document.getElementById(`${ targetId }`).disabled = true;
        document.getElementById(`${ targetId }`).innerText = 'Deleted!';
    }
    updateInfo = async (event) => {
        event.preventDefault();
        const form = document.getElementById("infoUpdateForm");
        const formData = new FormData(form);
        fetch('/settings', {
            method: 'PATCH',
            body: formData,
        });
        document.getElementById('personalInfo').innerText = 'Updated!';
        document.getElementById('personalInfo').disabled = true;
    }
    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }
    async componentDidMount() {
        const { about, name, location, subs } = await fetch('/currentuser/info').then(res => res.json());
        const { seen } = await fetch('/artists/fetch').then(res => res.json());
        await this.setState({ seen, userInfo: { about, name, location }, subs });
    }
    render() {
        const { activeTab, userInfo, loading, artists, venues, subs, seen } = this.state;
        return (
            <div className="settings">
                <Nav tabs>
                    <NavItem>
                        <NavLink onClick={() => { this.toggle('1'); }} className={{ active: activeTab === '1' }}>
                            Personal
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => { this.toggle('2'); }} className={{ active: activeTab === '2' }}>
                            Update Seen
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => { this.toggle('3'); }} className={{ active: activeTab === '3' }}>
                            Venues
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <PersonalInfo {...userInfo} updateInfo={this.updateInfo} />
                    </TabPane>
                    <TabPane tabId="2">
                        <AddArtistForm searchArtists={this.searchArtists} />
                        {loading && <Loader type="Audio" color="#000" height={150} width={150} />}
                        {artists.length > 0 && <ArtistsResults addArtist={this.addArtist} artists={artists} />}
                        <EditSeenForm removeSeen={this.removeSeen} updateSeen={this.updateSeen} seen={seen} />
                    </TabPane>
                    <TabPane tabId="3">
                        <AddVenueForm searchVenues={this.searchVenues} />
                        {loading && <Loader type="Audio" color="#000" height={150} width={150} />}
                        {venues.length > 0 && <VenuesResults addVenue={this.addVenue} venues={venues} />}
                        <EditVenueForm subscriptions={subs} removeSub={this.removeSub} />
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

Settings.propTypes = {
    className: PropTypes.object,
};
