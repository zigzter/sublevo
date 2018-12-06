import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import Comments from '../Shared/Comments';
import GOOGLE_MAPS_KEY from '../../keys';
import Attendees from './Attendees';
import './index.scss';

export default class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: {},
            spotifyId: undefined,
            comments: [],
            attendees: [],
            currentUserStatus: undefined,
        }
    }
    addComment = async (e) => {
        e.persist();
        e.preventDefault();
        const { event } = this.state;
        const { currentUser } = this.props;
        const content = e.target.elements.body.value.trim();
        const targetId = event.id;
        const { id, createdAt } = await fetch('/comments', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content,
                targetId,
                targetType: 'event',
            }),
        }).then(res => res.json());
        const comment = [{ content, username: this.props.currentUser.username, avatar: currentUser.avatar, id, createdAt }];
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
    getComments = async () => {
        const comments = await fetch(`/comments/${ this.state.event.id }`).then(res => res.json());
        this.setState({ comments });
    }
    getAttendees = async () => {
        const attendees = await fetch(`/events/${ this.state.event.id }`).then(res => res.json());
        const [status] = attendees.filter(attendee => attendee.id === this.props.currentUser.id);
        const currentUserStatus = (status) ? status.status : undefined;
        this.setState({ attendees, currentUserStatus });
    }
    attend = (status) => {
        fetch(`/events/${ this.state.event.id }`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        this.setState({ currentUserStatus: status })
    }
    async componentDidMount() {
        await this.setState({ event: this.props.location.state.event });
        const spotifyId = await fetch(`/api/spotifyId/${ this.state.event.performance[0].displayName }`, { method: 'GET' }).then(res => res.json());
        this.setState({ spotifyId });
        this.getComments();
        this.getAttendees();
    }
    render() {
        const { event, attendees, currentUserStatus, mapOpen, spotifyId } = this.state;
        const { currentUser } = this.props;
        if (event.start) {
            return (
                <div className='EventPage'>
                    <h1>{event.performance.filter(a => a.billing === 'headline').map((artist) => artist.displayName).join(', ') || event.displayName}</h1>
                    <h2>{event.performance.filter(a => a.billing === 'support').map((artist) => artist.displayName).join(', ') || ''}</h2>
                    <h2>{event.start.time} - {event.start.date}</h2>
                    <div className="details">
                        <div className='location shadow-sm'>
                            <div className="venue">
                                <p>{event.venue.displayName}</p>
                                <p>{event.venue.street}</p>
                                <p>{(event.venue.city) ? event.venue.city.displayName : event.venue.metroArea.displayName}</p>
                            </div>
                            <iframe
                                title="googleMap"
                                frameBorder="0" style={{ border: 0 }}
                                src={`https://www.google.com/maps/embed/v1/search?key=${ GOOGLE_MAPS_KEY }&q=${ event.venue.displayName }`} allowFullScreen>
                            </iframe>
                        </div>
                        <div className="player">
                            <iframe src={`https://open.spotify.com/embed/artist/${ spotifyId }`} height='200px' title='spotifyPlayer' frameBorder="0" allow="encrypted-media"></iframe>
                        </div>
                    </div>
                    <Attendees attendees={attendees} />
                    <ButtonGroup>
                        <Button
                            onClick={() => this.attend('going')}
                            color={(currentUserStatus === 'going') ? 'info' : 'success'}
                            outline={currentUserStatus === 'interested'}
                        >
                            Going {(currentUserStatus === 'going') ? '✓' : ''}
                        </Button>
                        <Button
                            onClick={() => this.attend('interested')}
                            color={(currentUserStatus === 'interested') ? 'info' : 'primary'}
                            outline={currentUserStatus !== 'interested'}
                        >
                            Interested {(currentUserStatus === 'interested') ? '✓' : ''}
                        </Button>
                    </ButtonGroup>
                    <Comments addComment={this.addComment} deleteComment={this.deleteComment} comments={this.state.comments} currentUser={currentUser} />
                </div >
            )
        }
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}

EventPage.propTypes = {
    location: PropTypes.object,
    currentUser: PropTypes.object,
};
