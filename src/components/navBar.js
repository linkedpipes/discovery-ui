import React from 'react'
import Toolbar from 'react-md/lib/Toolbars'

const NavBar = ({ children }) => (
    <Toolbar
        colored
        title="Linked Pipes Discovery UI"
    >
        {children}
    </Toolbar>
);

export default NavBar