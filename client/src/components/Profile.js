import React, { Component } from 'react';
import SeenLive from './SeenLive';
import Comments from './Comments';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            comments: [],
            seen: []
        }
    }
    async fetchUserData() {
        const [user, comments, seen] = await Promise.all([
            fetch(`/users/${this.props.match.params.username}`).then(res => res.json()),
            fetch(`/users/${this.props.match.params.username}/comments`).then(res => res.json()),
            fetch(`/artists/${this.props.match.params.username}`).then(res => res.json())

        ]);
        this.setState({
            user,
            comments,
            seen
        });
    }
    componentDidMount() {
        this.fetchUserData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            this.fetchUserData();
        }
    }
    render() {
        return (
            <div className="Profile">
                <h2>{this.state.user.username}</h2>
                <SeenLive seen={this.state.seen} />
                <hr />
                <Comments comments={this.state.comments} />
            </div>
        )
    }
};
