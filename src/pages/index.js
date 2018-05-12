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
import initStore from '../stores/initStore'
import { toggleDiscoveryInputItem, handleComponentsSelection, getComponents } from '../actions/actions'
import Layout from '../components/layout'
import ApiStatus from '../components/apiStatus'
import AppStatus from '../components/appStatus'


class IndexPage extends React.Component {

    componentDidMount() {
        this.props.getComponents()
    }

    render() {

        const { apiStatus, appStatus, components, handleToggleDiscoveryInputItem, handleComponentsSelection } = this.props;

        return (
            <Layout>
                <ApiStatus status={apiStatus} />
                <AppStatus status={appStatus} />

                {((Object.keys(components).length > 0) &&
                    <Card>
                        <CardTitle
                            title="Start discovery"
                            subtitle="Select components you want to take part in the discovery process"
                        />
                        <CardText>
                            <form>
                                <DiscoveryInput
                                    components={components}
                                    toggleDiscoveryInputItem={handleToggleDiscoveryInputItem}
                                />
                            </form>
                        </CardText>
                        <CardActions>
                            <Button raised primary onClick={() => handleComponentsSelection(components)}>
                                Discover
                            </Button>
                        </CardActions>
                    </Card>
                )}
            </Layout>
        )
    }
}

IndexPage.propTypes = {
    apiStatus: PropTypes.object.isRequired,
    components: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        components: state.inputData.components,
        apiStatus: state.apiStatus,
        appStatus: state.appStatus,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getComponents: () => dispatch(getComponents()),
        handleToggleDiscoveryInputItem: (iri, active, count) => dispatch(toggleDiscoveryInputItem(iri, active, count)),
        handleComponentsSelection: (components) => dispatch(handleComponentsSelection(components)),
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(IndexPage)
