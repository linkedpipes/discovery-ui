import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields';
import { initStore } from '../stores/discoveryStore'
import { setInputIri, setInput, setListIri, setList, discover } from '../actions/actions'
import Layout from '../components/layout'
import Link from 'next/link'
import PropTypes from 'prop-types'
import ApiStatus from '../components/apiStatus'
import AppStatus from '../components/appStatus'
import CircularProgress from 'react-md/lib/Progress/CircularProgress'


class InputPage extends React.Component {

    render() {

        const { apiStatus, appStatus, onInputIriChange, onInputChange, onListIriChange, onListChange, discover, inputData, status } = this.props;

        return (
            <Layout>
                <ApiStatus status={apiStatus} />
                <AppStatus status={appStatus} />

                {apiStatus.isOnline && 
                    <div class="col-md-6">
                        <Card>
                            <CardTitle
                                title="Start discovery"
                                subtitle="Provide IRI defining a discovery input"
                            />
                            <CardText>
                                <form>
                                    <TextField
                                        id="inputIri"
                                        label="Discovery input IRI"
                                        lineDirection="center"
                                        placeholder=""
                                        onChange={onInputIriChange}
                                    />

                                    <TextField
                                        id="floating-multiline"
                                        label="Discovery input"
                                        lineDirection="right"
                                        rows={10}
                                        onChange={onInputChange}
                                    />
                                </form>
                            </CardText>
                            <CardActions>
                                <Button raised primary onClick={() => discover(inputData)}>
                                    Discover
                                </Button>
                            </CardActions>
                        </Card>

                        <br /><br />

                        <Card>
                            <CardTitle
                                title="Run multiple discoveries"
                                subtitle="Provide IRI defining a list of discovery inputs"
                            />
                            <CardText>
                                <form>
                                    <TextField
                                        id="listIri"
                                        label="Discovery list IRI"
                                        lineDirection="center"
                                        placeholder=""
                                        onChange={onListIriChange}
                                    />

                                    <TextField
                                        id="floating-multiline"
                                        label="Discovery list"
                                        lineDirection="right"
                                        rows={10}
                                        onChange={onListChange}
                                    />
                                </form>
                            </CardText>
                            <CardActions>
                                <Link href="/multirunner">
                                    <Button raised primary>
                                        Run multiple discoveries
                                    </Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </div>
                }
            </Layout>
        )
    }
}

InputPage.propTypes = {
    apiStatus: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        apiStatus: state.apiStatus,
        appStatus: state.appStatus,
        inputData: state.inputData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInputIriChange: (iri) => dispatch(setInputIri(iri)),
        onInputChange: (input) => dispatch(setInput(input)),
        onListIriChange: (iri) => dispatch(setListIri(iri)),
        onListChange: (list) => dispatch(setList(list)),
        discover: (inputData) => dispatch(discover(inputData))
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(InputPage)
