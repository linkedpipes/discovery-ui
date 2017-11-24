import React from 'react'
import Head from 'next/head'
import NavBar from '../components/navBar'

class Layout extends React.Component {

    componentWillMount() {
        document.body.style.margin = 0;
    }

    render () {
        return (
            <div>
                <Head>
                    <title>Discovery Runner</title>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    <link rel='stylesheet' href='/static/react-md.light_blue-amber.min.css' />
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
                    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons' />
                </Head>
                <div>
                    <NavBar />
                    <div style={{ width: '75%', margin: 'auto', paddingTop: '20px' }}>
                        { this.props.children }
                    </div>
                    <footer>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Layout