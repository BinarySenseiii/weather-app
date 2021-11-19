import React from 'react'
import Head from 'next/head'
import cities from '../../data/city-list.json'

// components
import {TodaysWeather} from '../../components'

export async function getServerSideProps(context) {
  const city = getCity(context.params.city)

  if (!city) {
    return {
      notFound: true,
    }
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely&appid=${process.env.API_KEY}&units=metric`,
  )

  const data = await response.json()

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      city,
      currentWeather: data.current,
      dailyWeather: data.daily,
      hourlyWeather: data.hourly,
    },
  }
}

const getCity = slug => {
  const params = slug.trim()
  const paramArr = params.split('-')
  const id = paramArr[paramArr.length - 1]

  if (!id) {
    return null
  }

  return cities.find(city => city.id.toString() === id)
}

export default function City({
  city,
  currentWeather,
  dailyWeather,
  hourlyWeather,
}) {
  console.log(hourlyWeather)
  return (
    <div>
      <Head>
        <title>{city.name} Weather - Next Weather App</title>
      </Head>

      <div className="page-wrapper">
        <div className="container">
          <TodaysWeather city={city} weather={dailyWeather[0]} />
        </div>
      </div>
    </div>
  )
}
