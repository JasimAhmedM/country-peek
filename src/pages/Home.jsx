import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import CountryCard from '../components/CountryCard'
import FilterBar from '../components/FilterBar'

function Home() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [region, setRegion] = useState('All')
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      setCountries([])
      setError(null)
      setLoading(false)
      setRegion('All')
      setSortBy('')
      return
    }

    let isActive = true
    const timer = setTimeout(() => {
      setLoading(true)
      fetch(`https://restcountries.com/v3.1/name/${trimmedQuery}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('No results')
          }
          return res.json()
        })
        .then((data) => {
          if (!isActive) return
          setCountries(data)
          setError(null)
        })
        .catch(() => {
          if (!isActive) return
          setCountries([])
          setError('No countries found. Please try another search.')
        })
        .finally(() => {
          if (!isActive) return
          setLoading(false)
        })
    }, 400)

    return () => {
      isActive = false
      clearTimeout(timer)
    }
  }, [query])

  const displayed = [...countries]
    .filter((country) => region === 'All' || country.region === region)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.common.localeCompare(b.name.common)
      }
      if (sortBy === 'population') {
        return b.population - a.population
      }
      return 0
    })

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={setQuery} />
      <FilterBar
        region={region}
        onRegionChange={setRegion}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading && <p className="home__status">Loading...</p>}
      {error && <p className="home__status home__status--error">{error}</p>}

      {!loading && !error && displayed.length > 0 && (
        <div className="cards-grid">
          {displayed.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}

      {!loading && !error && countries.length === 0 && !query && (
        <p className="home__status">Start searching to explore countries.</p>
      )}
    </div>
  )
}

export default Home
