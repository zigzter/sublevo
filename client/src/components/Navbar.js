import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <nav className="Navbar">
        <NavLink to='/' activeClassName='active' exact={true}>Home</NavLink>
        <NavLink to='/users/shteaz' activeClassName='active' exact={true}>Profile</NavLink>
        <NavLink to='/settings' activeClassName='active' exact={true}>Settings</NavLink>
    </nav >
)

export default Navbar;
