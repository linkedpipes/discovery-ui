import React from 'react'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'


const BackendStatus = ({ status }) => (
    (status !== true) &&
    <div>
        <Card>
            <CardTitle
                title="Backend status"
            />
            <CardText>
                {status === null ? "Connecting to backend..." : "Please, start the backend server, it seems to be offline."}
            </CardText>
        </Card>
        <br />
    </div>
);

export default BackendStatus