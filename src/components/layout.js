import Link from 'next/link'
import Head from 'next/head'
import NavBar from '../components/navBar'

export default ({ children, title = 'Discovery UI' }) => (
    <div>
        <Head>
            <title>{ title }</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <link rel='stylesheet' href='/static/react-md.light_blue-yellow.min.css' />
            <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
            <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons' />
        </Head>
        <div>
            <NavBar>
                <header>
                    <nav>
                        <Link href='/'><a>Home</a></Link> |
                        <Link href='/about'><a>About</a></Link> |
                        <Link href='/contact'><a>Contact</a></Link>
                    </nav>
                </header>
            </NavBar>
            <div style={{ width: '75%', margin: 'auto', paddingTop: '20px' }}>
                { children }
            </div>
            <footer>
            </footer>
        </div>
    </div>
)