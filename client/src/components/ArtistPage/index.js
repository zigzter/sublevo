import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import ShowMore from 'react-show-more';
import Comments from '../Shared/Comments';
import './index.scss';

export default class ArtistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artist: {},
            events: [],
            comments: [],
            loading: true,
        }
    }
    addComment = async (e) => {
        e.persist();
        e.preventDefault();
        const { artist } = this.state;
        const content = e.target.elements.body.value.trim();
        const targetId = artist.id;
        const { id, createdAt } = await fetch('/comments', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content,
                targetId,
                targetType: 'artist',
            }),
        }).then(res => res.json());
        const comment = [{ content, username: this.props.currentUser.username, id, createdAt }];
        this.setState({
            comments: comment.concat(this.state.comments)
        });
        e.target.elements.body.value = '';
    }
    deleteComment = (id) => {
        fetch(`/comments/${ id }`, { method: 'delete' });
        this.setState({
            comments: this.state.comments.filter(comment => comment.id !== id)
        });
    }
    getArtist = async () => {
        const { id } = this.props.match.params;
        const cachedArtist = JSON.parse(localStorage.getItem(id));
        const cachedEvents = JSON.parse(localStorage.getItem(`${ id }-events`));
        if (cachedArtist && cachedEvents) return this.setState({ artist: cachedArtist, events: cachedEvents, loading: false });
        const { artist, events } = await fetch(`/api/artists/${ id }`, { method: 'GET' }).then(res => res.json());
        this.setState({ artist, events, loading: false });
        localStorage.setItem(id, JSON.stringify(artist));
        localStorage.setItem(`${ id }-events`, JSON.stringify(events));
    }
    getComments = async () => {
        const comments = await fetch(`/comments/${ this.state.artist.id }`).then(res => res.json());
        this.setState({ comments });
    }
    async componentDidMount() {
        await this.getArtist();
        this.getComments();
    }
    render() {
        const { artist, events, loading, comments } = this.state;
        const { currentUser } = this.props;
        if (loading) {
            return (
                <div>
                    <Loader type="Audio" color="#000" height={80} width={80} />
                    <h4>Loading...</h4>
                </div>
            )
        }
        return (
            <div className='ArtistPage'>
                <h1>{artist.name}</h1>
                <div className="bioPlayer">
                    <ShowMore lines={10} more='Show more' less='Show less' anchorClass=''>
                        {artist.bio}
                    </ShowMore>
                    <iframe src={`https://open.spotify.com/embed/artist/${ artist.id }`} title='spotifyPlayer' frameBorder="0" allow="encrypted-media"></iframe>
                </div>
                <hr />
                <div className="events">
                    {events.length > 0 && <h2>Upcoming events</h2>}
                    {
                        events.map((event) => (
                            <div key={event.id} >
                                <Link to={{ pathname: `/events/${ event.id }`, state: { event: { ...event } } }}>{event.displayName}</Link>
                            </div>
                        ))
                    }
                </div>
                <hr />
                <Comments addComment={this.addComment} deleteComment={this.deleteComment} comments={comments} currentUser={currentUser} />
            </div>
        )
    }
}
