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
    getEvents = async () => {
        const cachedEvents = JSON.parse(localStorage.getItem('events'));
        if (cachedEvents && cachedEvents.length !== 0) {
            const venues = [...new Set(cachedEvents.map(event => event.venue.displayName))];
            const types = [...new Set(cachedEvents.map(event => event.type))];
            return this.setState({ events: cachedEvents, filteredEvents: cachedEvents, venues, types, loading: false });
        }
        const events = await fetch('/venues', { method: 'GET' }).then(res => res.json());
        const venues = [...new Set(events.map(event => event.venue.displayName))];
        const types = [...new Set(events.map(event => event.type))];
        localStorage.setItem('events', JSON.stringify(events));
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
            filteredEvents = this.state.filteredEvents.filter(event => event.type === this.state.typeFilter);
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
    componentDidMount() {
        this.getEvents();
    }
    render() {
        const { events, venues, filteredEvents, venueFilter, types, typeFilter } = this.state
        if (!this.state.loading) {
            return (
                <div className='HomePage'>
                    <div className="filter">
                        <div className="venueFilter">
                            <small className='text-muted'>Filter by venue</small>
                            <br />
                            <Button color='success' onClick={this.clearVenueFilter} block outline={venueFilter}>All Venues</Button>
                            {venues.map(venue => <Button color='success' key={venue} onClick={this.filterVenues} block outline={venueFilter !== venue}>{venue}</Button>)}
                        </div>
                        <div className='typeFilter'>
                            <small className='text-muted'>Filter by event type</small>
                            <br />
                            <Button color='success' onClick={this.clearTypeFilter} block outline={typeFilter}>All Types</Button>
                            {types.map(type => <Button color='success' key={type} onClick={this.filterTypes} block outline={typeFilter !== type}>{type}</Button>)}
                        </div>
                    </div>
                    <div className='events'>
                        {
                            filteredEvents.map((event) => (
                                <EventPreview key={event.id} {...event} />
                            ))
                        }
                        {/* {
                            !!filteredEvents.length && filteredEvents.map((event) => (
                                <EventPreview key={event.id} {...event} />
                            ))
                        } */}
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
