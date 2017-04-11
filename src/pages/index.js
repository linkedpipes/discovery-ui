import React from 'react'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import Card from 'react-md/lib/Cards/Card'
import CardTitle from 'react-md/lib/Cards/CardTitle'
import CardText from 'react-md/lib/Cards/CardText'
import CardActions from 'react-md/lib/Cards/CardActions'
import Button from 'react-md/lib/Buttons/Button'
import DiscoveryInput from '../components/discoveryInput'
import { initStore, toggleDiscoveryInputItem } from '../stores/discoveryStore'
import Layout from '../components/layout'

const IndexPage = ({ components, dispatch }) => (
    <Layout>
        <Card>
            <CardTitle
                title="Start discovery"
                subtitle="Select components you want to take part in the discovery process"
            />
            <CardText>
                <form>
                    <DiscoveryInput components={components} toggleDiscoveryInputItem={(uri, active, count) => dispatch(toggleDiscoveryInputItem(uri, active, count))} />
                </form>
            </CardText>
            <CardActions>
                <Link href="/discovery">
                    <Button flat primary label="Discover" />
                </Link>
            </CardActions>
        </Card>
    </Layout>
)

IndexPage.propTypes = {
    components: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired,
}

export default withRedux(initStore, state => ({ components: state.components }))(IndexPage)
