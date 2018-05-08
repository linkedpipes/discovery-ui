import React from 'react'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'


const ApiStatus = ({ status }) => (
    (status.error !== null) &&
    <div>
        <Card>
            <CardTitle
                title="API status"
            />
            <CardText>
                The last API call has failed: `{status.error.message}`.
            </CardText>
        </Card>
        <br />
    </div>
);

export default ApiStatus