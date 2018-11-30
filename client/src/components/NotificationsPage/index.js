import React, { Component } from 'react';
import { Button, Card, CardBody } from 'reactstrap';

export default class NotificationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            friendRequests: [],
        }
    }
    accept = async () => {
        console.log('accepted');
    }
    reject = async () => {
        console.log('rejected');
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
                                <Button onClick={this.accept} color='primary' outline>Accept</Button>
                                <Button onClick={this.reject} color='danger' outline>Reject</Button>
                            </CardBody>
                        </Card>
                    ))
                }
            </div>
        )
    }
}
