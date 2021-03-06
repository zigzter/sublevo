import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner';
import EventPreview from './EventPreview';
import './index.scss';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            events: [],
            filteredEvents: [],
            types: [],
            venueFilter: undefined,
            typeFilter: undefined,
            venues: [],
        }
    }
    componentDidMount() {
        this.getEvents();
    }
    getEvents = async () => {
        const cachedEvents = JSON.parse(localStorage.getItem('events'));
        const cachedVenues = JSON.parse(localStorage.getItem('venues'));
        if (cachedEvents && cachedEvents.length !== 0) {
            const types = [...new Set(cachedEvents.map(event => event.type))];
            return this.setState({ events: cachedEvents, filteredEvents: cachedEvents, venues: cachedVenues, types, loading: false });
        }
        const { events, venues } = await fetch('/api/venues', { method: 'GET' }).then(res => res.json());
        const types = [...new Set(events.map(event => event.type))];
        localStorage.setItem('events', JSON.stringify(events));
        localStorage.setItem('venues', JSON.stringify(venues));
        this.setState({ events, filteredEvents: events, venues, types, loading: false });
    }
    filterVenues = (event) => {
        const venue = event.target.textContent;
        let filteredEvents;
        if (this.state.typeFilter) {
            filteredEvents = this.state.events.filter(event => event.venue.displayName === venue && event.type === this.state.typeFilter);
        } else {
            filteredEvents = this.state.events.filter(event => event.venue.displayName === venue);
        }
        this.setState({ filteredEvents, venueFilter: venue });
    }
    filterTypes = (event) => {
        const type = event.target.textContent;
        let filteredEvents;
        if (this.state.venueFilter) {
            filteredEvents = this.state.events.filter(event => event.venue.displayName === this.state.venueFilter && event.type === type);
        } else {
            filteredEvents = this.state.events.filter(event => event.type === type);
        }
        this.setState({ filteredEvents, typeFilter: type });
    }
    clearVenueFilter = () => {
        let filteredEvents
        if (this.state.typeFilter) {
            filteredEvents = this.state.events.filter(event => event.type === this.state.typeFilter);
        } else {
            filteredEvents = this.state.events;
        }
        this.setState({ filteredEvents, venueFilter: undefined });
    }
    clearTypeFilter = () => {
        let filteredEvents
        if (this.state.venueFilter) {
            filteredEvents = this.state.events.filter(event => event.venue.displayName === this.state.venueFilter);
        } else {
            filteredEvents = this.state.events;
        }
        this.setState({ filteredEvents, typeFilter: undefined })
    }
    render() {
        const { venues, filteredEvents, venueFilter, types, typeFilter, loading } = this.state;
        if (!loading) {
            return (
                <div className='HomePage'>
                    <div className="filter">
                        <div className="venueFilter">
                            <small className='text-muted'>Filter by venue</small>
                            <br />
                            <Button color='success' onClick={this.clearVenueFilter} block outline={!!venueFilter}>All Venues</Button>
                            {venues.map(venue => <Button color='success' key={venue} onClick={this.filterVenues} block outline={venueFilter !== venue}>{venue}</Button>)}
                        </div>
                        <div className='typeFilter'>
                            <small className='text-muted'>Filter by event type</small>
                            <br />
                            <Button color='success' onClick={this.clearTypeFilter} block outline={!!typeFilter}>All Types</Button>
                            {types.map(type => <Button color={(type === 'Festival') ? 'primary' : 'success'} key={type} onClick={this.filterTypes} block outline={typeFilter !== type}>{type}</Button>)}
                        </div>
                    </div>
                    <div className='events'>
                        {
                            filteredEvents.map((event) => (
                                <EventPreview key={event.id} {...event} />
                            ))
                        }
                        {filteredEvents.length < 1 && <h3>No events listed</h3>}
                    </div>
                </div>
            );
        }
        return (
            <div>
                <Loader type="Audio" color="#000" height={80} width={80} />
                <h4>Loading...</h4>
            </div>
        )
    }
}
