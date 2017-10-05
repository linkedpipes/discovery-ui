import React from 'react'
import Toolbar from 'react-md/lib/Toolbars'

const titleLink = <a href="/">LinkedPipes Discovery</a>

const NavBar = ({ children }) => (
    <Toolbar
        colored
        title={titleLink}
    >
        {children}
    </Toolbar>
);

export default NavBar