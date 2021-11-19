import React from 'react'
import cities from '../../data/city-list.json'

export async function getServerSideProps(context) {
  const city = getCity(context.params.city)

  if (!city) {
    return {
      notFound: true
    }
  }

  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely&appid=${process.env.API_KEY}&units=metric`)

  const data = await response.json()

  if (!data){
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      weatherResult: data
    },
  }
}


const getCity = (slug) => {
  const params = slug.trim();
  const paramArr = params.split('-');
  const id = paramArr[paramArr.length - 1]

  if (!id) {
    return null
  }

  return cities.find(city => city.id.toString() === id)
}

export default function City({ weatherResult }) {
  console.log(weatherResult)
  return (
    <div>
      <h1>City</h1>
    </div>
  )
}
