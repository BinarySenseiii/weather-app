import Head from 'next/head'
import {SearchBox, FamousPlaces} from '../components'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App - Home</title>
      </Head>

      <div className="home">
        <div className="container">
          <SearchBox />
          <FamousPlaces />
        </div>
      </div>
    </div>
  )
}
