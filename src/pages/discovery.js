import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import Layout from '../components/layout'
import { initStore } from '../stores/discoveryStore'
import { assocPath, values, compose, map, filter } from 'ramda';

const onDiscoveryStartSuccess = (x) => console.log(x)
const onDiscoveryStartFail = (x) => console.log(x)

class DiscoveryPage extends React.Component {

    componentDidMount() {
        const activeComponentUris = compose(
            map(c => c.uri),
            filter(c => c.isActive),
            values,
        )(this.props.components)

        fetch(this.props.configuration.apiEndpoint + '/discovery/start', {
            method: 'POST',
            mode: 'no-cors',
            body: activeComponentUris
        }).then(
            success => this.props.dispatch(onDiscoveryStartSuccess(success)),
            error => this.props.dispatch(onDiscoveryStartFail(error)),
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
