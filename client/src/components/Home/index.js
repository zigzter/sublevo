import React, { Component } from 'react';
import EventPreview from './EventPreview';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            events: undefined
        }
    }
    getEvents = async () => {
        const events = await fetch('/venues', { method: 'GET' }).then(res => res.json());
        await this.setState({ events, loading: false });
        console.log(events);
    }
    componentDidMount() {
        this.getEvents();
    }
    render() {
        const { events } = this.state
        if (!this.state.loading) {
            return (
                <div>
                    <ul className='events'>
                        {
                            !!events[0] && events.map((event) => (
                                <EventPreview key={event.id} {...event} />
                            ))
                        }
                    </ul>
                </div>
            );
        }
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }
};
