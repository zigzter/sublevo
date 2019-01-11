import React, { Component } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './index.scss';

export default class NotificationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendRequests: [],
        }
    }
    async componentDidMount() {
        const friendRequests = await fetch('/api/friends').then(res => res.json());
        this.setState({ friendRequests });
    }
    componentDidUpdate() {
        this.props.notifications.length > 0 && this.markAllRead();
    }
    respond = async (response, userOne) => {
        fetch('/api/friends', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ response, userOne }),
        });
    }
    markAllRead = async () => {
        const notificationIds = this.props.notifications.filter(n => !n.isRead).map(n => n.id);
        fetch('/api/notifications/mark', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ notificationIds })
        }).then(console.log);
    }
    render() {
        const { friendRequests } = this.state;
        const { currentUser, notifications } = this.props;
        return (
            <div className="NotificationsPage">
                <h2>Notifications</h2>
                {
                    notifications.filter(n => n.type === 'comment').map(n => (
                        <HashLink
                            className={(n.isRead) ? 'notification read shadow-sm' : 'notification shadow-sm'}
                            key={n.commentId}
                            to={`/users/${ currentUser.username }#c${ n.commentId }`}
                        >
                            <img width='50px' height='50px' src={`/img/${ n.avatar }`} alt="" />
                            <strong>{n.username}</strong> left a comment on your profile
                        </HashLink>
                    ))
                }
                {
                    friendRequests && friendRequests.map((req) => (
                        <Card className='shadow-sm mb-2' key={req.username}>
                            <CardBody>
                                <p><Link to={`/users/${ req.username }`}>{req.username}</Link>sent you a friends request.</p>
                                <Button onClick={() => this.respond('accepted', req.id)} color='primary' outline>Accept</Button>
                                <Button onClick={() => this.respond('rejected', req.id)} color='danger' outline>Reject</Button>
                            </CardBody>
                        </Card>
                    ))
                }
            </div >
        )
    }
}
