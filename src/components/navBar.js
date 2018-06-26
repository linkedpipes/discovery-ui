import React from 'react'
import Toolbar from 'react-md/lib/Toolbars'
import Button from 'react-md/lib/Buttons'
import AppStatus from './appStatus';

const titleLink = <a href="/">LinkedPipes Discovery</a>

const NavBar = ({ appStatus, children }) => (
    <Toolbar
        fixed
        colored
        title={titleLink}
        actions={(
            <span>
                <AppStatus status={appStatus} style={{'display': 'inline-block', 'margin-right': '10px'}} />
                <a href="/input">
                    <Button raised secondary>
                        Advanced mode
                    </Button>
                </a>
            </span>
        )}
    />
);

export default NavBar