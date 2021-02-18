import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import '../styles/globals.css'
import Head from 'next/head'
import Navbar from '../components/Navbar'
// import { v4 as uuidv4 } from 'uuid'

function MyApp({ Component, pageProps }) {
  // console.log(uuidv4())
  const menu = [
    {name: "Home", link: "/"},
    {name: "Contribute", link: "/contribute"},
    {name: "File An Issue", link: "https://github.com/TheCoolBlackCat/computing-resources/issues/new"}
  ]
  return (
    <div>
      <Head>
        <title>School Computing Resources</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        brandText="Computing Resources"
        items={menu} />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
