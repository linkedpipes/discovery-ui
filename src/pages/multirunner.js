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
import ApiStatus from '../components/apiStatus'
import AppStatus from '../components/appStatus'
import { handleMultirunnerStart, getInputsFromIri, getInputs, goToDetail, requestStats } from '../actions/actions'


class MultiRunnerPage extends React.Component {

    componentDidMount() {
        const { multirunnerStatus, inputData, getInputsFromIri, getInputs } = this.props;
        if(!multirunnerStatus.current || multirunnerStatus.current+1 < multirunnerStatus.inputIris.length) {
            if (inputData.listIri) {
                getInputsFromIri(inputData.listIri)
            } else if (inputData.list) {
                getInputs(inputData.list)
            }
        }
    }

    getDiscoveryStatusMessage(discoveryId, discoveries) {
        if (!discoveryId){
            return "The discovery is pending. Please, wait.";
        }

        if (!discoveries[discoveryId].status.isFinished) {
            return `The discovery is currently running and has found ${discoveries[discoveryId].status.pipelineCount} pipelines so far.`;
        }

        if (discoveries[discoveryId].status.isFinished) {
            return `The discovery has finished and found ${discoveries[discoveryId].status.pipelineCount} pipelines.`;
        }
    }

    getDiscoveryAction(discoveryId, discoveries){
        if (discoveryId && discoveries[discoveryId].status.isFinished) {
            return (
                <Button raised onClick={() => this.props.goToDetail(discoveryId)}>
                    See details
                </Button>
            );
        }

        return <CircularProgress/>;
    }

    renderDiscoveryCard(i, discoveries) {
        return (
            <Card key={i}>
                <CardTitle
                    title={i}
                    subtitle=""
                />
                <CardText>
                    <div>
                        <table width="100%">
                            <tr>
                                <td>{this.getDiscoveryStatusMessage(discoveries[i], discoveries)}</td>
                                <td>{this.getDiscoveryAction(discoveries[i], discoveries)}</td>
                            </tr>
                        </table>
                    </div>
                </CardText>
            </Card>
        );
    }

    render() {
        const { multirunnerStatus, inputData, discoveries, csv, appStatus, apiStatus } = this.props;
        const isRunning = discoveries.inputIris;
        const subtitle = multirunnerStatus.inputIris ?
            `Discoveries are running: ${multirunnerStatus.current+1} out of ${multirunnerStatus.inputIris.length}. Please, wait.` :
            'Discoveries are running. Please, wait.';
        const hasIris = inputData.iris;
        return (
            <Layout>
                <ApiStatus status={apiStatus} />
                <AppStatus status={appStatus} />
                <Card>
                    <CardTitle
                        title="Discoveries in progress"
                        subtitle={subtitle}
                    />
                    <CardText>
                        <Button primary raised onClick={() => this.props.requestStats(discoveries)}>
                            Download stats
                        </Button>
                    </CardText>
                </Card>
                {hasIris && inputData.iris.map(i => this.renderDiscoveryCard(i, discoveries))}
            </Layout>
        )
    }
}

MultiRunnerPage.propTypes = {
}

const mapStateToProps = state => ({
    inputData: state.inputData,
    discoveries: state.discoveries,
    multirunnerStatus: state.multirunnerStatus,
    csv: state.csv,
    apiStatus: state.apiStatus,
    appStatus: state.appStatus,
})

const mapDispatchToProps = (dispatch) => {
    return {
        getInputsFromIri: iri => dispatch(getInputsFromIri(iri)),
        getInputs: list => dispatch(getInputs(list)),
        goToDetail: id => dispatch(goToDetail(id)),
        requestStats: discoveries => dispatch(requestStats(discoveries)),
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(MultiRunnerPage)
