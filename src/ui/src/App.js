import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';


class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <AppBar
                title="LinkedPipes discovery UI"></AppBar>
        </MuiThemeProvider>
    );
  }
}

export default App;