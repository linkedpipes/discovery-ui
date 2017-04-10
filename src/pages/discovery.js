import {initStore} from '../stores/discoveryStore'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/layout'
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardText from 'react-md/lib/Cards/CardText';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

const DiscoveryPage = ({components, dispatch}) => (
    <Layout>
        <Card>
            <CardTitle
                title="Discovery in progress"
                subtitle="Discovery is running. Results will be offered on demand."
            />
            <CardText>
                <CircularProgress key="progress" id={'discovery_progress'} />
            </CardText>
        </Card>
    </Layout>
)

export default withRedux(initStore, (state) => ({ components: state.components }))(DiscoveryPage)