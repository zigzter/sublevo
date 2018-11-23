import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';

const Navbar = (props) => (
    <nav className="Navbar">
        <div className="container">
            <NavLink to='/' activeClassName='active' exact={true}>Home</NavLink>
            {!!props.currentUser && <NavLink to={`/users/${props.currentUser.username}`} activeClassName='active' exact={true}>Profile</NavLink>}
            {!!props.currentUser && <NavLink to='/settings' activeClassName='active' exact={true}>Settings</NavLink>}
            {!!props.currentUser && <Button color='link' onClick={props.destroySession}>Logout</Button>}
            {!!props.currentUser || <NavLink to='/session/new' activeClassName='active' exact={true}>Sign In</NavLink>}
        </div>
    </nav >
);

export default Navbar;
