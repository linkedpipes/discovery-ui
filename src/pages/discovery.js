import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {Provider} from 'react-redux'
import {initStore} from '../stores/inputStore'
import withRedux from 'next-redux-wrapper'
import Layout from '../components/layout'

const DiscoveryPage = ({components, dispatch}) => (
    <Layout>
        <Card>
            <CardHeader
                title="Discovery progress"
                subtitle="The discovery is running"
            />
            <CardText>
                {JSON.stringify(components)}
            </CardText>
            <CardActions>
            </CardActions>
        </Card>
    </Layout>
)

export default withRedux(initStore, (state) => ({ components: state.components, selected: () => {} }))(DiscoveryPage)