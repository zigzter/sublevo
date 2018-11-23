import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = (props) => (
    <nav className="Navbar">
        <div className="container">
            <NavLink to='/' activeClassName='active' exact={true}>Home</NavLink>
            {props.userPresent && <NavLink to='/users/shteaz' activeClassName='active' exact={true}>Profile</NavLink>}
            {props.userPresent && <NavLink to='/settings' activeClassName='active' exact={true}>Settings</NavLink>}
            {props.userPresent || <NavLink to='/session/new' activeClassName='active' exact={true}>Sign In</NavLink>}
        </div>
    </nav >
);

export default Navbar;
