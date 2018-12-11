import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const Navbar = (props) => {
    const userPresent = !!Object.keys(props.currentUser).length;
    return (
        <nav className="Navbar">
            <div className="container">
                <div className='navSection'>
                    <NavLink to='/' activeClassName='active' exact={true}>Home</NavLink>
                    {userPresent && <NavLink to={`/users/${ props.currentUser.username }`} activeClassName='active' exact={true}>Profile</NavLink>}
                    {userPresent && <NavLink to='/settings' activeClassName='active' exact={true}>Settings</NavLink>}
                    {userPresent && <NavLink to='/notifications' activeClassName='active' exact={true}>Notifications <span className="badge badge-danger">{props.notifications}</span></NavLink>}
                </div>
                <div className='navSection'>
                    {userPresent && <Button color='link' onClick={props.destroySession}>Logout</Button>}
                    {userPresent || <NavLink to='/session/new' activeClassName='active' exact={true}>Sign In</NavLink>}
                    {userPresent || <NavLink to='/users/new' activeClassName='active' exact={true}>Sign Up</NavLink>}
                </div>
            </div>
        </nav >
    )
};

export default Navbar;

Navbar.propTypes = {
    currentUser: PropTypes.object,
    username: PropTypes.string,
    destroySession: PropTypes.func,
};
