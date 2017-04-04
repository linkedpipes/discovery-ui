import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from '../components/navBar';

export default class MyDocument extends Document {
    static getInitialProps ({ renderPage }) {
        const {html, head} = renderPage()
        const styles = flush()
        return { html, head, styles }
    }

    render () {
        return (
            <html>
                <Head>
                    <style>{`body { padding: 0; margin: 0 } /* custom! */`}</style>
                </Head>
                <body>
                    <MuiThemeProvider>
                        <div>
                            <NavBar />
                            <div style={{ width: '75%', margin: 'auto', paddingTop: '20px' }}>
                                <Main />
                            </div>
                        </div>
                    </MuiThemeProvider>
                    <NextScript />
                </body>
            </html>
        )
    }
}