import React from 'react'
import cities from '../data/city-list.json'
import Link from 'next/link'

export default function SearchBox() {
  const [query, setQuery] = React.useState('')
  const [result, setResult] = React.useState([])

  const onChange = (e) => {
    const { value } = e.target

    setQuery(value)

    const matchingCities = []

    if (value.length > 3) {
      for (const city of cities) {
        if (matchingCities.length >= 5) {
          break;
        }

        const match = city.name.toLowerCase().startsWith(value.toLowerCase())

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`
          }
          matchingCities.push(cityData)
        }
      }
    }

    return setResult(matchingCities)

  }

  return (
    <div className="search">
      <input type="text" value={query} onChange={onChange} />

      {query.length > 3 && (
        <ul>
          {result.length > 0 ? (
            result.map(city => (
              <li key={city.id}>
                <Link passhref href={`location/${city.slug}`}>
                  <a> 
                    {city.name}
                    {city.state ? `, ${city.state}` : ''}
                    <span>{city.country}</span>
                  </a>
                </Link>
              </li>
            ))
          ): (
            <li className="search__no-results">no results found</li>
          )}
        </ul>
      )}
    </div>
  )
}
