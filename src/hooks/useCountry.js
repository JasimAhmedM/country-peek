import { useState, useEffect } from 'react'

function useCountry(code) {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code) {
      setCountry(null)
      setLoading(false)
      setError(null)
      return
    }

    let isActive = true
    setLoading(true)
    setError(null)

    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Country not found')
        }
        return res.json()
      })
      .then((data) => {
        if (!isActive) return
        setCountry(data[0])
      })
      .catch(() => {
        if (!isActive) return
        setCountry(null)
        setError('Unable to load country data. Please try again.')
      })
      .finally(() => {
        if (!isActive) return
        setLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [code])

  return { country, loading, error }
}

export default useCountry
