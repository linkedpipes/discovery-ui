import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import Layout from '../components/layout'
import { initStore } from '../stores/discoveryStore'

class DiscoveryPage extends React.Component {

    componentDidMount() {
        this.props.dispatch({ type: 'DISCOVERY_START' })
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

export default withRedux(initStore, () => ({}))(DiscoveryPage)
