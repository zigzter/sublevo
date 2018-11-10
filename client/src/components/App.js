import React, { Component } from 'react';
import Navbar from './Navbar';
import Profile from './Profile';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }
    componentDidMount() {
        // Get user
    }
    render() {
        return (
            <div className="App">
                <Navbar />
                <Profile username="shteaz" />
            </div>
        )
    }
};
