import React from 'react'
import Toolbar from 'react-md/lib/Toolbars'
import Button from 'react-md/lib/Buttons'

const titleLink = <a href="/">LinkedPipes Discovery</a>

const NavBar = ({ children }) => (
    <Toolbar
        fixed
        colored
        title={titleLink}
        actions={(
            <a href="/input">
                <Button raised secondary>
                    Advanced mode
                </Button>
            </a>
        )}
    />
);

export default NavBar