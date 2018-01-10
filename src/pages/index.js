import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'
import PropTypes from 'prop-types'
import DiscoveryInput from '../components/discoveryInput'
import { initStore } from '../stores/discoveryStore'
import { fetchBackendStatus, toggleDiscoveryInputItem, handleComponentsSelection } from '../actions/actions'
import Layout from '../components/layout'
import BackendStatus from '../components/backendStatus'


class IndexPage extends React.Component {

    componentDidMount() {
        this.props.handleServerStatusPrompt()
    }

    render() {
        return (
            <Layout>
                {(this.props.backendStatus.isOnline === false) && <BackendStatus /> }

                {this.props.backendStatus.isOnline && ((Object.keys(this.props.components).length > 0) ?
                    <Card>
                        <CardTitle
                            title="Start discovery"
                            subtitle="Select components you want to take part in the discovery process"
                        />
                        <CardText>
                            <form>
                                <DiscoveryInput
                                    components={this.props.components}
                                    toggleDiscoveryInputItem={this.props.handleToggleDiscoveryInputItem}
                                />
                            </form>
                        </CardText>
                        <CardActions>
                            <Button raised primary onClick={() => this.props.handleComponentsSelection(this.props.components)}>
                                Discover
                            </Button>
                        </CardActions>
                    </Card> :
                    <div>
                        <CircularProgress key="progress" id="discovery_progress"/>
                    </div>
                )}
            </Layout>
        )
    }
}

IndexPage.propTypes = {
    backendStatus: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        components: state.inputData.components,
        backendStatus: state.backendStatus,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleServerStatusPrompt: () => dispatch(fetchBackendStatus()),
        handleToggleDiscoveryInputItem: (iri, active, count) => dispatch(toggleDiscoveryInputItem(iri, active, count)),
        handleComponentsSelection: (components) => dispatch(handleComponentsSelection(components)),
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(IndexPage)
