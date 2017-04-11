import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import Layout from '../components/layout'
import { initStore, onDiscoveryStartSuccess } from '../stores/discoveryStore'
import { assocPath, values, compose, map, filter } from 'ramda';

class DiscoveryPage extends React.Component {

    componentDidMount() {
        const activeComponentUris = compose(
            map(c => c.uri),
            filter(c => c.isActive),
            values,
        )(this.props.components)

        fetch(this.props.configuration.apiEndpoint + '/discovery/start', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(activeComponentUris)
        }).then(
            success => this.props.dispatch(onDiscoveryStartSuccess(success)),
            error => console.log(error),
        )
    }

    render() {
        return (
            <Layout>
                <Card>
                    <CardTitle
                        title="Discovery in progress"
                        subtitle="Discovery is running. Results will be offered on demand."
                    />
                    <CardText>
                        <CircularProgress key="progress" id={'discovery_progress'}/>
                    </CardText>
                </Card>
            </Layout>
        )
    }
}

DiscoveryPage.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
}

export default withRedux(initStore, state => ({ components: state.components, configuration: state.configuration }))(DiscoveryPage)
