import React from 'react'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'


const ApiStatus = ({ status }) => (
    (status.isOnline !== true) &&
    <div>
        <Card>
            <CardTitle
                title="API status"
            />
            <CardText>
                The last API call has been rejected, please, check that the API is online.
            </CardText>
        </Card>
        <br />
    </div>
);

export default ApiStatus