import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';

export default () => (
    <MuiThemeProvider>
        <Paper>
            <form>
                <Checkbox label="Simple" />
                <Checkbox label="Simple" />
                <Divider/>
                <Checkbox label="Simple" />
                <Checkbox label="Simple" />
                <Divider/>
                <Checkbox label="Simple" />
                <Checkbox label="Simple" />
                <Divider/>
                <Checkbox label="Simple" />
                <Checkbox label="Simple" />
                <Divider/>
                <RaisedButton label="Discover" primary={true} />
            </form>
        </Paper>
    </MuiThemeProvider>
)