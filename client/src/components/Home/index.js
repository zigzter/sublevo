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
            filter: undefined,
            venues: [],
        }
    }
    getEvents = async () => {
        const cachedEvents = JSON.parse(localStorage.getItem('events'));
        if (cachedEvents && cachedEvents.length !== 0) {
            const venues = [...new Set(cachedEvents.map(event => event.venue.displayName))];
            return this.setState({ events: cachedEvents, venues, loading: false });
        }
        const events = await fetch('/venues', { method: 'GET' }).then(res => res.json());
        const venues = [...new Set(events.map(event => event.venue.displayName))];
        localStorage.setItem('events', JSON.stringify(events));
        this.setState({ events, venues, loading: false });
    }
    filterVenues = (event) => {
        const venue = event.target.textContent;
        const filteredEvents = this.state.events.filter(event => event.venue.displayName === venue);
        this.setState({ filteredEvents, filter: venue });
    }
    clearFilter = () => {
        this.setState({ filteredEvents: [], filter: undefined });
    }
    componentDidMount() {
        this.getEvents();
    }
    render() {
        const { events, venues, filteredEvents, filter } = this.state
        if (!this.state.loading) {
            return (
                <div className='HomePage'>
                    <div className="venueFilter">
                        <small className='text-muted'>Filter by venue</small>
                        <br />
                        <Button color='success' onClick={this.clearFilter} outline={filter}>All Venues</Button>
                        {venues.map(venue => <Button color='success' key={venue} onClick={this.filterVenues} outline={filter !== venue}>{venue}</Button>)}
                    </div>
                    <div className='events'>
                        {
                            !!filteredEvents.length || events.map((event) => (
                                <EventPreview key={event.id} {...event} />
                            ))
                        }
                        {
                            !!filteredEvents.length && filteredEvents.map((event) => (
                                <EventPreview key={event.id} {...event} />
                            ))
                        }
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
