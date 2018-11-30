import React, { Component } from 'react';
import { Button, Card, CardBody } from 'reactstrap';

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
            <div>
                <h1>Notifications</h1>
                {
                    friendRequests && friendRequests.map((req) => (
                        <Card key={req.username}>
                            <CardBody>
                                <p>{req.username} sent you a friends request.</p>
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
