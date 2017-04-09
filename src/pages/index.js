
import DiscoveryInput from '../components/discoveryInput'
import {Provider} from 'react-redux'
import {initStore, toggleItem} from '../stores/inputStore'
import withRedux from 'next-redux-wrapper'
import Link from 'next/link'
import Layout from '../components/layout'
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons/Button';


const IndexPage = ({components, dispatch}) => (
    <Layout>
        <Card>
            <CardTitle
                title="Start discovery"
                subtitle="Select components you want to take part in the discovery process"
            />
            <CardText>
                <form>
                    <DiscoveryInput components={components} toggleItem={(uri, active) => dispatch(toggleItem(uri, active))}/>
                </form>
            </CardText>
            <CardActions>
                <Link href="/discovery">
                    <Button flat label="Discover" primary />
                </Link>
            </CardActions>
        </Card>
    </Layout>
)

export default withRedux(initStore, (state) => ({ components: state.components, selected: () => {} }))(IndexPage)