import React from 'react'
import Head from 'next/head'
import NavBar from '../components/navBar'

export default ({ appStatus, children, title = 'Discovery UI' }) => (
    <div>
        <Head>
            <title>{ title }</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <link rel='stylesheet' href='/static/react-md.light_blue-amber.min.css' />
            <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
            <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons' />
        </Head>
        <div>
            <NavBar appStatus={appStatus} />
            <div style={{ width: '75%', margin: 'auto', paddingTop: '80px' }}>
                { children }
            </div>
            <footer>
            </footer>
        </div>
    </div>
)