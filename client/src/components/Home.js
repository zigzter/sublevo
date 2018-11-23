import React, { Component } from 'react';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            events: []
        }
    }
    getEvents = async () => {
        const events = await fetch('/venues', { method: 'GET' }).then(res => res.json());
        await this.setState({ events, loading: false });
        console.log(this.state.events)
    }
    componentDidMount() {
        this.getEvents();
    }
    render() {
        if (!this.state.loading) {
            return (
                <div>
                    <h1>Events Feed</h1>
                    <ul>
                        {
                            this.state.events[1].map((event) => (
                                <li key={event.id}>
                                    {event.displayName}
                                </li>
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
