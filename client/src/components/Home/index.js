import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
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
                <Loader type="Audio" color="#000" height={80} width={80} />
                <h4>Loading...</h4>
            </div>
        )
    }
};
