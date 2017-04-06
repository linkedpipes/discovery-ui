import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FlatButton from "material-ui/FlatButton";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import DiscoveryInput from "../components/discoveryInput";
import {Provider} from "react-redux";
import {initStore, toggleItem} from '../stores/inputStore'
import withRedux from "next-redux-wrapper";

const IndexPage = ({components, dispatch}) => (
    <MuiThemeProvider>
        <Card>
            <CardHeader
                title="Start discovery"
                subtitle="Select components you want to take part in the discovery process"
                actAsExpander
                showExpandableButton
            />
            <CardText>
                <form>
                    <DiscoveryInput components={components} toggleItem={(uri, active) => dispatch(toggleItem(uri, active))}/>
                </form>
            </CardText>
            <CardActions>
                <FlatButton label="Discover" primary onClick={() => dispatch()}/>
            </CardActions>
        </Card>
    </MuiThemeProvider>
)

export default withRedux(initStore, (state) => ({ components: state.components, selected: () => {} }))(IndexPage)