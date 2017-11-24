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


class DiscoveryPage extends React.Component {

    componentDidMount() {

        const activeComponentIris = compose(
            map(c => c.iri),
            filter(c => c.isActive),
            values,
            mergeAll,
            values,
        )(this.props.components)

        if (activeComponentIris.length !== 0) {
            this.props.handleDiscoveryStart(activeComponentIris)
        } else if (this.props.inputIri) {
            this.props.handleDiscoveryStartWithInputIri(this.props.inputIri)
        } else if (this.props.input) {
            this.props.handleDiscoveryStartWithInput(this.props.input)
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
                                    <CircularProgress key="progress" id="discovery_progress" />
                                  </div>
                            }
                        </div>
                        <div>
                            Discovered {this.props.discovery.status.pipelineCount} pipeline(s) in total.
                        </div>
                        <br />
                        {this.props.persisted === false ?
                            <Button raised primary label="Persist state" onClick={() => this.props.persistState(this.props.state)}/>
                            :
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

DiscoveryPage.propTypes = {
}

const mapStateToProps = state => ({
    components: state.components,
    discovery: state.discovery,
    inputIri: state.inputIri,
    input: state.input,
    state: state,
    persisted: state.persisted,
})

const mapDispatchToProps = dispatch => {
    return {
        handleDiscoveryStart: (activeComponentUris) => dispatch(handleDiscoveryStart(activeComponentUris)),
        persistState: (state) => dispatch(persistState(state)),
        handleDiscoveryStartWithInput: (input) => dispatch(handleDiscoveryStartWithInput(input)),
        handleDiscoveryStartWithInputIri: (inputIri) => dispatch(handleDiscoveryStartWithInputIri(inputIri)),
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(DiscoveryPage)
