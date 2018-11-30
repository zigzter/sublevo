import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Loader from 'react-loader-spinner';
import SeenLive from './SeenLive';
import Comments from './Comments';
import './index.scss';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            comments: [],
            seen: [],
            loading: true
        }
    }
    async fetchUserData() {
        const { user, comments, seen } = await fetch(`/users/${ this.props.match.params.username }`).then(res => res.json());
        this.setState({
            user,
            comments,
            seen,
            loading: false
        });
    }
    addComment = async (e) => {
        e.persist();
        e.preventDefault();
        const { user } = this.state;
        const content = e.target.elements.body.value.trim();
        const profileId = user.id;
        const { id, createdAt } = await fetch(`/users/${ user.username }/comments`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content,
                profileId,
            }),
        }).then(res => res.json());
        const comment = [{ content, username: this.props.currentUser.username, id, createdAt }];
        this.setState({
            comments: comment.concat(this.state.comments)
        });
        e.target.elements.body.value = '';
    }
    deleteComment = (id) => {
        fetch(`/users/${ this.state.user.username }/comments/${ id }`, { method: 'delete' });
        this.setState({
            comments: this.state.comments.filter(comment => comment.id !== id)
        });
    }
    addFriend = () => {
        const { username } = this.props.match.params;
        fetch(`/users/${ username }/addfriend`, { method: 'POST' });
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
        const { user, comments, seen } = this.state;
        const { currentUser } = this.props;
        return (
            <div className="Profile">
                {this.state.loading && <Loader type="Audio" color="#000" height={120} width={120} />}
                <div className='profileHeader'>
                    <h1 className='username'>{user.username}</h1>
                    {user.id !== currentUser.id && currentUser.id && <Button onClick={this.addFriend} color='success' outline>Add friend</Button>}
                </div>
                <h4>{user.name}, {user.location}</h4>
                <SeenLive seen={seen} />
                <h3>About Me</h3>
                <p>{user.about}</p>
                <hr />
                <Comments currentUser={currentUser} comments={comments} addComment={this.addComment} deleteComment={this.deleteComment} />
            </div>
        )
    }
}
