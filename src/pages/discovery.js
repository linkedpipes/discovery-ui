import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import TextField from 'react-md/lib/TextFields';
import Layout from '../components/layout'
import PipelineGroups from '../components/pipelineGroups'
import Button from 'react-md/lib/Buttons/Button'
import initStore from '../stores/initStore'
import ApiStatus from '../components/apiStatus'
import { persistState, checkDiscoveryStatus } from '../actions/actions'


class DiscoveryPage extends React.Component {

    componentDidMount() {
        this.props.getDiscoveryStatus(this.props.url.query.id)
    }

    getStatusMessage(isFinished) {
        return isFinished ?
            <span>Done!</span> :
            <div>
                Waiting for the discovery to complete.
                <CircularProgress key="progress" id="discovery_progress"/>
            </div>
    }

    render() {
        const { url, discoveries, state, persistState, persisted, apiStatus, appStatus } = this.props;
        const discoveryId = url.query.id

        return (
            <Layout appStatus={appStatus}>
                <ApiStatus status={apiStatus} />
                
                {discoveries[discoveryId] &&
                    <div>
                        <Card>
                            <CardTitle
                                title="Discovery details"
                                subtitle="Discovery is running. Results will be displayed on demand."
                            />
                            <CardText style={{textAlign: 'center'}}>
                                <div>
                                    { this.getStatusMessage(discoveries[discoveryId].status.isFinished) }
                                </div>
                                <div>
                                    Discovered {discoveries[discoveryId].status.pipelineCount} pipeline(s) in total.
                                </div>
                                <br/>
                                <Button raised primary onClick={() => persistState(state)}>
                                    Persist state
                                </Button>

                                {persisted &&
                                    <div>
                                        <TextField value={`${BACKEND_URL}/result/${discoveryId}`} readonly/>
                                    </div>
                                }
                            </CardText>
                        </Card>
                        <PipelineGroups
                            pipelineGroups={discoveries[discoveryId].pipelineGroups}
                            discoveryId={discoveryId}
                        />
                    </div>
                }
            </Layout>
        )
    }
}

DiscoveryPage.propTypes = {
}

const mapStateToProps = state => ({
    inputData: state.inputData,
    discoveries: state.discoveries,
    persisted: state.persisted,
    apiStatus: state.apiStatus,
    appStatus: state.appStatus,
    state: state
})

const mapDispatchToProps = dispatch => {
    return {
        persistState: (state) => dispatch(persistState(state)),
        getDiscoveryStatus: (id) => dispatch(checkDiscoveryStatus(id))
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(DiscoveryPage)
