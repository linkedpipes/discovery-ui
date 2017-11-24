import React from 'react'
import withRedux from 'next-redux-wrapper'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import TextField from 'react-md/lib/TextFields';
import { initStore } from '../stores/discoveryStore'
import { fetchBackendStatus, setInputIri, setInput } from '../actions/actions'
import Layout from '../components/layout'
import Link from 'next/link'
import BackendStatus from '../components/backendStatus'


class InputPage extends React.Component {

    componentDidMount() {
        this.props.handleServerStatusPrompt()
    }

    render() {
        return (
            <Layout>
                {(this.props.backendStatus.isOnline === false) && <BackendStatus /> }

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
                                onChange={this.props.handleInputIriChange}
                            />

                            <TextField
                                id="floating-multiline"
                                label="Discovery input"
                                lineDirection="right"
                                rows={10}
                                onChange={this.props.handleInputChange}
                            />
                        </form>
                    </CardText>
                    <CardActions>
                        <Link href="/discovery">
                            <Button raised primary label="Discover" />
                        </Link>
                    </CardActions>
                </Card>
            </Layout>
        )
    }
}

InputPage.propTypes = {
    backendStatus: React.PropTypes.object.isRequired,
}

const mapStateToProps = state => {
    return {
        backendStatus: state.backendStatus,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleServerStatusPrompt: () => dispatch(fetchBackendStatus()),
        handleInputIriChange: (iri) => dispatch(setInputIri(iri)),
        handleInputChange: (input) => dispatch(setInput(input)),
    }
}

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(InputPage)
