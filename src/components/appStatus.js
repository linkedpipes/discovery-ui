import React from 'react'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'


const AppStatus = ({ status }) => (
    <div>
        {(status.error !== null) &&
        <div>
            <Card>
                <CardTitle
                    title="App status"
                />
                <CardText>
                    The last action has failed: `{status.error.message}`.
                </CardText>
            </Card>
            <br />
        </div>}

        {(status.isLoading === true) && <CircularProgress id="progress" />}
    </div>
);

export default AppStatus