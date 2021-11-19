import React from 'react'
import cities from '../data/city-list.json'
import Link from 'next/link'

export default function SearchBox() {
  const [query, setQuery] = React.useState('')
  const [result, setResult] = React.useState([])

  const onChange = e => {
    const value = e.target.value.toLowerCase()

    setQuery(value)

    const matchingResults = []

    if (value.length > 3) {
      for (const city of cities) {
        if (matchingResults.length >= 5) {
          break
        }

        const matchResult = city.name.toLowerCase().startsWith(value)

        if (matchResult) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, '-')}-${city.id}`,
          }
          matchingResults.push(cityData)
        }
      }
    }

    return setResult(matchingResults)
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
          ) : (
            <li className="search__no-results">no results found</li>
          )}
        </ul>
      )}
    </div>
  )
}
