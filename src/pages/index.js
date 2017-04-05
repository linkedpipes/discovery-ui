import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import DiscoveryInput from '../components/discoveryInput';
import { Provider } from 'react-redux'
import InputStore from '../stores/inputStore';

export default () => (
    <MuiThemeProvider>
        <Card>
            <CardHeader
                title="Start discovery"
                subtitle="Select components you want to take part in the discovery process"
                actAsExpander={true}
                showExpandableButton={true}
            />
            <CardText>
                <form>
                    <Provider store="InputStore">
                        <DiscoveryInput />
                    </Provider>
                </form>
            </CardText>
            <CardActions>
                <FlatButton label="Discover" primary />
            </CardActions>
        </Card>
    </MuiThemeProvider>
)