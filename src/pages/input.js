import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields';
import initStore from '../stores/initStore'
import { setInputIri, setInput, setListIri, setList, discover } from '../actions/actions'
import Layout from '../components/layout'
import Link from 'next/link'
import PropTypes from 'prop-types'
import ApiStatus from '../components/apiStatus'

class InputPage extends React.Component {

    render() {

        const { apiStatus, appStatus, onInputIriChange, onInputChange, onListIriChange, onListChange, discover, inputData } = this.props;

        return (
            <Layout appStatus={appStatus}>
                <ApiStatus status={apiStatus} />

                <div>
                    <Card>
                        <CardTitle
                            title="Run single discovery"
                            subtitle="Provide discovery IRI or definition"
                        />
                        <CardText>
                            <form>
                                <TextField
                                    id="inputIri"
                                    label="Discovery IRI"
                                    lineDirection="center"
                                    placeholder=""
                                    onChange={onInputIriChange}
                                />

                                <TextField
                                    id="floating-multiline"
                                    label="Discovery definition"
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
                            title="Run multiple discoveries as an experiment"
                            subtitle="Provide experiment IRI or definition"
                        />
                        <CardText>
                            <form>
                                <TextField
                                    id="listIri"
                                    label="Experiment IRI"
                                    lineDirection="center"
                                    placeholder=""
                                    onChange={onListIriChange}
                                />

                                <TextField
                                    id="floating-multiline"
                                    label="Experiment definition"
                                    lineDirection="right"
                                    rows={10}
                                    onChange={onListChange}
                                />
                            </form>
                        </CardText>
                        <CardActions>
                            <Link href="/multirunner">
                                <Button raised primary>
                                    Run experiment
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                </div>
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
