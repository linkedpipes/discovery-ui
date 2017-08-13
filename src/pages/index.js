import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import DiscoveryInput from '../components/discoveryInput'
import { initStore, toggleDiscoveryInputItem, onComponentsFetched, onBackendStatusFetched } from '../stores/discoveryStore'
import Layout from '../components/layout'
import BackendStatus from '../components/backendStatus'


class IndexPage extends React.Component {

    componentDidMount() {

        const checkBackendStatus = () => {
            fetch(`${BACKEND_URL}/status`).then(
                _ => {

                    fetch(`${BACKEND_URL}/discovery/components`).then(
                        (success) => {
                            success.json().then(
                                json => this.props.dispatch(onComponentsFetched(json)),
                                error => console.log(error),
                            )
                        },
                        error => console.log(error),
                    )

                    this.props.dispatch(onBackendStatusFetched(true))
                },
                _ => {
                    this.props.dispatch(onBackendStatusFetched(false))
                    window.setTimeout(checkBackendStatus, 1000)
                }
            )
        }

        checkBackendStatus()
    }

    render() {
        return (
            <Layout>
                {(this.props.backendStatus.isOnline === false) && <BackendStatus /> }

                {Object.keys(this.props.components).length > 0 &&
                    <Card>
                        <CardTitle
                            title="Start discovery"
                            subtitle="Select components you want to take part in the discovery process"
                        />
                        <CardText>
                            <form>
                                <DiscoveryInput
                                    components={this.props.components}
                                    toggleDiscoveryInputItem={(uri, active, count) => this.props.dispatch(toggleDiscoveryInputItem(uri, active, count))}
                                />
                            </form>
                        </CardText>
                        <CardActions>
                            <Link href="/discovery">
                                <Button flat primary label="Discover"/>
                            </Link>
                        </CardActions>
                    </Card>
                }
            </Layout>
        )
    }
}

IndexPage.propTypes = {
    backendStatus: React.PropTypes.object.isRequired,
    components: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
}

export default withRedux(initStore, state => ({ components: state.components, backendStatus: state.backendStatus }))(IndexPage)
