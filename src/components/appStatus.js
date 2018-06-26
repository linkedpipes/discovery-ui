import React from 'react'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import { Button } from 'react-md';


const AppStatus = ({ status }) => (
    <span>
        {(status.error !== null) && <Button icon tooltipLabel={status.error.message} style={{"color": "red", "font-size": "20px"}}>error</Button>}
        {(status.error === null && status.isLoading !== true) && <Button icon>check_circle</Button>}
        {(status.isLoading === true) && <CircularProgress id="app_progress" style={{'display': 'inline-block', 'margin-right': '10px'}} />}
    </span>
);

export default AppStatus