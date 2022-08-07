import React, { useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import MovieList from './components/MoviesList';
import MoviesListHeading from './components/MoviesListHeading.';
import SearchBox from './components/SearchBox';
import AddFavourite from './components/AddFavorites';
import RemoveFavourites from './components/RemoveFavourites';



const App = () => {
  const [movies, setMovies] = useState([])
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMoviesRequest = async (searchValue) =>{
    const url = `http://omdbapi.com/?s=${searchValue}&apikey=1ecc91b`
    const response = await fetch(url);
    const responseJson = await response.json()
 
    if(responseJson.Search){
      setMovies(responseJson.Search)
    }

  }

  useEffect(() => {
    getMoviesRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(
        localStorage.getItem('react-movie-app-favourites')
        );
    setFavourites(movieFavourites)
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }


  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }


 const removeFavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter((favourites) =>
          favourites.imdbID !== movie.imdbID
    );
    
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
 }

  return (
  
   <div className="container-fluid movie-app">
    <div className="row d-flex align-items-center mt-4 mb-6">
      <MoviesListHeading heading='Movies'/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className="row">
       <MovieList movies={movies} 
                  handleFavouritesClick={addFavouriteMovie} 
                  favouriteComponent={AddFavourite}/>

    </div>
    <div className="row d-flex align-items-center mt-4 mb-6">
      <MoviesListHeading heading='Favourites'/>
    </div>
    <div className="row">
       <MovieList movies={favourites} 
                  handleFavouritesClick={removeFavouriteMovie} 
                  favouriteComponent={RemoveFavourites}/>
    </div>
    
   </div>


    
    
    
  )
}

export default App;
