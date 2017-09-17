import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import { values, compose, map, filter, mergeAll } from 'ramda'
import Layout from '../components/layout'
import PipelineGroups from '../components/pipelineGroups'
import { initStore } from '../stores/discoveryStore'
import { handleDiscoveryStart } from '../actions/actions'


class DiscoveryPage extends React.Component {

    componentDidMount() {
        const activeComponentUris = compose(
            map(c => c.uri),
            filter(c => c.isActive),
            values,
            mergeAll,
            values,
        )(this.props.components)

        this.props.handleDiscoveryStart(activeComponentUris)
    }

    render() {
        return (
            <Layout>
                <Card>
                    <CardTitle
                        title="Discovery details"
                        subtitle="Discovery is running. Results will be displayed on demand."
                    />
                    <CardText style={{textAlign: 'center'}}>
                        <div>
                            {
                                this.props.discovery.status.isFinished
                                ? <span>Done!</span>
                                : <div>
                                    Waiting for the discovery to complete.
                                    <CircularProgress key="progress" id="discovery_progress" />
                                  </div>
                            }
                        </div>
                        <div>
                            Discovered {this.props.discovery.status.pipelineCount} pipeline(s) in total.
                        </div>
                    </CardText>
                </Card>
                <PipelineGroups
                    pipelineGroups={this.props.discovery.pipelineGroups}
                    discoveryId={this.props.discovery.id}
                />
            </Layout>
        )
    }
}

DiscoveryPage.propTypes = {
}

const mapStateToProps = state => ({
    components: state.components,
    discovery: state.discovery
})

const mapDispatchToProps = dispatch => {
    return {
        handleDiscoveryStart: (activeComponentUris) => dispatch(handleDiscoveryStart(activeComponentUris)),
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(DiscoveryPage)
