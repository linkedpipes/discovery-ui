import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import TextField from 'react-md/lib/TextFields';
import { values, compose, map, filter, mergeAll } from 'ramda'
import Layout from '../components/layout'
import PipelineGroups from '../components/pipelineGroups'
import Button from 'react-md/lib/Buttons/Button'
import { initStore } from '../stores/discoveryStore'
import { handleDiscoveryStart, persistState, handleDiscoveryStartWithInput, handleDiscoveryStartWithInputIri } from '../actions/actions'


class MultiRunnerPage extends React.Component {

    componentDidMount() {
        this.props.getInputs(this.props.inputListIri)
    }

    render() {
        return (
            <Layout>
                <Card>
                    <CardTitle
                        title="Discoveries progress"
                        subtitle="Discoveries are running. Please, wait."
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
                        <br />
                            <Button raised primary label="Persist state" onClick={() => this.props.persistState(this.props.state)}/>

                        {this.props.persisted &&
                            <div>
                                <TextField value={`${BACKEND_URL}/result/${this.props.discovery.id}`} readonly />
                            </div>
                        }
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

MultiRunnerPage.propTypes = {
}

const mapStateToProps = state => ({
    inputListIri: state.inputListIri
})

const mapDispatchToProps = dispatch => {
    return {
        handleDiscoveryStart: (activeComponentUris) => dispatch(handleDiscoveryStart(activeComponentUris)),
        persistState: (state) => dispatch(persistState(state)),
        handleDiscoveryStartWithInput: (input) => dispatch(handleDiscoveryStartWithInput(input)),
        handleDiscoveryStartWithInputIri: (inputIri) => dispatch(handleDiscoveryStartWithInputIri(inputIri)),
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(MultiRunnerPage)
