import React, { useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import MovieList from './components/MoviesList';
import MoviesListHeading from './components/MoviesListHeading.';
import SearchBox from './components/SearchBox';


const App = () => {
  const [movies, setMovies] = useState([])
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

  return (
  
   <div className="container-fluid movie-app">
    <div className="row d-flex align-items-center mt-4 mb-4">
      <MoviesListHeading heading='Movies'/>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
    </div>
    <div className="row">
       <MovieList movies={movies} />
    </div>
   </div>


    
    
    
  )
}

export default App;
