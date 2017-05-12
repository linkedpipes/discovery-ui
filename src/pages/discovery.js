import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import { values, compose, map, filter } from 'ramda'
import Layout from '../components/layout'
import PipelineGroups from '../components/pipelineGroups'
import { initStore, onDiscoveryStartSuccess, onDiscoveryStatusUpdated, onDiscoveryFinished, onPipelineGroupsUpdated } from '../stores/discoveryStore'

class DiscoveryPage extends React.Component {

    componentDidMount() {
        const activeComponentUris = compose(
            map(c => c.uri),
            filter(c => c.isActive),
            values,
        )(this.props.components)

        fetch(`${BACKEND_URL}/discovery/start`, {
            method: 'POST',
            headers: new Headers({ 'content-type': 'application/json' }),
            body: JSON.stringify(activeComponentUris),
        }).then(
            (success) => {
                success.json().then(
                    json => this.props.dispatch(onDiscoveryStartSuccess(json)),
                    error => console.log(error),
                ).then(
                    _ => checkDiscoveryStatus(),
                )
            },
            error => console.log(error),
        )

        const checkDiscoveryStatus = () => {
            fetch(`${BACKEND_URL}/discovery/${this.props.discovery.id}`, {
                method: 'GET',
            }).then(
                (success) => {
                    success.json().then(
                        newStatus => this.props.dispatch(onDiscoveryStatusUpdated(newStatus)),
                        error => console.log(error),
                    )
                },
                error => console.log(error),
            ).then(
                _ => {
                    if (!this.props.discovery.status.isFinished) {
                        checkDiscoveryStatus()
                    } else {
                        this.props.dispatch(onDiscoveryFinished())
                    }
                    updatePipelineGroups()
                },
            )
        }

        const updatePipelineGroups = () => {
            fetch(`${BACKEND_URL}/discovery/${this.props.discovery.id}/pipeline-groups`, {
                method: 'GET',
            }).then(
                (success) => {
                    success.json().then(
                        ({ pipelineGroups }) => this.props.dispatch(onPipelineGroupsUpdated(pipelineGroups)),
                        error => console.log(error),
                    )
                },
                error => console.log(error),
            )
        }
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
                                    <CircularProgress key="progress" id={'discovery_progress'}/>
                                  </div>
                            }
                        </div>
                        <div>
                            Discovered {this.props.discovery.status.pipelineCount} pipelines in total.
                        </div>
                    </CardText>
                </Card>
                <PipelineGroups pipelineGroups={this.props.discovery.pipelineGroups} />
            </Layout>
        )
    }
}

DiscoveryPage.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
}

export default withRedux(initStore, state => ({ components: state.components, discovery: state.discovery }))(DiscoveryPage)
