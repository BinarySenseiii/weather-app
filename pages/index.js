import Head from 'next/head'
import {SearchBox} from '../components'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App - Home</title>
      </Head>

      <div className="home">
        <div className="container">
          {/* Search Functionality  */}
          <SearchBox />
          {/*  */}
        </div>
      </div>
    </div>
  )
}
