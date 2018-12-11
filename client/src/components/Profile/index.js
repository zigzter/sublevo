import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import SeenLive from './SeenLive';
import Comments from '../Shared/Comments';
import './index.scss';
import FriendsList from './FriendsList';
import FullSeen from './FullSeen';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            comments: [],
            seen: [],
            friends: [],
            friend: false,
            loading: true,
            dropdownOpen: false,
            tab: 1,
        }
    }
    async fetchUserData() {
        const { user, comments, seen, friends } = await fetch(`/users/${ this.props.match.params.username }`).then(res => res.json());
        const friend = !!friends.filter(friend => friend.id === this.props.currentUser.id).length;
        const avatarCheck = user.avatar.slice(0, 5);
        this.avatar = (avatarCheck === 'https') ? user.avatar : `/img/${ user.avatar }`;
        this.setState({
            user,
            comments,
            seen,
            friends,
            friend,
            loading: false,
        });
    }
    addComment = async (e) => {
        e.persist();
        e.preventDefault();
        const { currentUser } = this.props;
        const { user } = this.state;
        const content = e.target.elements.body.value.trim();
        const targetId = user.id;
        const { id, createdAt } = await fetch('/comments', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content,
                targetId,
                targetType: 'user',
            }),
        }).then(res => res.json());
        const comment = [{ content, username: currentUser.username, avatar: currentUser.avatar, id, createdAt }];
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
    addFriend = () => {
        const { username } = this.props.match.params;
        fetch(`/users/${ username }/addfriend`, { method: 'POST' });
    }
    blockUser = () => {
        console.log('blocked');
    }
    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    toggleNav = (tab) => {
        this.setState({ tab });
    }
    componentDidMount() {
        this.fetchUserData();
    }
    async componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            this.setState({ tab: 1 });
            await this.fetchUserData();
        }
        const hash = this.props.location.hash.replace('#', '');
        if (hash) {
            const comment = document.getElementById(hash);
            comment && comment.classList.add('hashLink');
        }
    }
    render() {
        const { user, comments, seen, tab, friends, dropdownOpen, loading, friend } = this.state;
        const { currentUser } = this.props;
        return (
            <div className="Profile">
                {loading && <Loader type="Audio" color="#000" height={120} width={120} />}
                <div className='profileHeader'>
                    <div className="userInfo">
                        <img className='shadow-sm' src={this.avatar} alt="avatar" width='80px' height='80px' />
                        <h1 className='username'>{user.username}</h1>
                        <h4>{user.name}, {user.location}</h4>
                    </div>
                    {
                        user.id !== currentUser.id && currentUser.id &&
                        <ButtonGroup>
                            <Button onClick={this.addFriend} color='success' outline disabled={friend}>{(friend) ? 'Friends' : 'Add Friend'}</Button>
                            <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle color='success' outline caret></DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.blockUser}>Block user</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </ButtonGroup>
                    }
                </div>
                <div className='profileNav'>
                    <Button color='link' className={(tab === 1 ? 'active' : '')} onClick={() => this.toggleNav(1)}>Seen Grid</Button>
                    <Button color='link' className={(tab === 2 ? 'active' : '')} onClick={() => this.toggleNav(2)}>Full Seen List</Button>
                    <Button color='link' className={(tab === 3 ? 'active' : '')} onClick={() => this.toggleNav(3)}>{user.username}'s Friends</Button>
                </div>
                <hr />
                {tab === 1 && <SeenLive username={user.username} seen={seen} />}
                {tab === 2 && <FullSeen seen={seen} />}
                {tab === 3 && <FriendsList friends={friends} />}
                <h3>About Me</h3>
                <p>{user.about}</p>
                <hr />
                <Comments currentUser={currentUser} comments={comments} addComment={this.addComment} deleteComment={this.deleteComment} />
            </div>
        )
    }
}

Profile.propTypes = {
    match: PropTypes.object,
    currentUser: PropTypes.object,
};
