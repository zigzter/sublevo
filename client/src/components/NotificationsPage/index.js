import React, { Component } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NotificationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendRequests: [],
        }
    }
    respond = async (response, userOne) => {
        fetch('/friends', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ response, userOne }),
        });
    }
    async componentDidMount() {
        const friendRequests = await fetch('/friends').then(res => res.json());
        this.setState({ friendRequests });
    }
    render() {
        const { friendRequests } = this.state;
        return (
            <div className="NotificationsPage">
                <h1>Notifications</h1>
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
            </div>
        )
    }
}
