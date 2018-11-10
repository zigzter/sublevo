import React, { Component } from 'react';
import SeenLive from './SeenLive';
import Comments from './Comments';

const seen = ['Kanye West', 'Kendrick Lamar', 'ScHoolboy Q', 'Run The Jewels', 'Travis Scott', 'Portugal, the Man']

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seen: []
        }
    }
    render () {
        return (
            <div className="Profile">
                <h2>{this.props.username}</h2>
                <SeenLive seen={seen} />
                <hr />
                <Comments />
            </div>
        )
    }
};
