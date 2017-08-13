import React from 'react'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'


const BackendStatus = () => (
    <div>
        <Card>
            <CardTitle
                title="Backend is offline"
            />
            <CardText>
                Please, start the discovery server.
            </CardText>
        </Card>
        <br />
    </div>
);

export default BackendStatus