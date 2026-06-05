import { createContext, useContext, useEffect, useReducer } from 'react'

const FavouritesContext = createContext()

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVOURITE': {
      if (state.some((country) => country.cca3 === action.payload.cca3)) {
        return state
      }
      return [...state, action.payload]
    }
    case 'REMOVE_FAVOURITE':
      return state.filter((country) => country.cca3 !== action.payload)
    default:
      return state
  }
}

function loadInitialFavourites() {
  try {
    return JSON.parse(localStorage.getItem('favourites') || '[]')
  } catch (error) {
    return []
  }
}

export function FavouritesProvider({ children }) {
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    loadInitialFavourites,
  )

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  return (
    <FavouritesContext.Provider value={{ favourites, dispatch }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  const context = useContext(FavouritesContext)
  if (!context) {
    throw new Error('useFavourites must be used within FavouritesProvider')
  }
  return context
}
