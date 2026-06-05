import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import CountryCard from '../components/CountryCard'

function Favourites() {
  const { favourites } = useFavourites()

  if (favourites.length === 0) {
    return (
      <div className="not-found">
        <h2>No saved countries yet</h2>
        <p>Save countries on the Home page and they will appear here.</p>
        <Link to="/">Browse countries</Link>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="cards-grid">
        {favourites.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  )
}

export default Favourites
