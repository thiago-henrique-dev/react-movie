import React, { useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import MovieList from './components/MoviesList';

const App = () => {
  const [movies, setMovies] = useState([])

  const getMoviesRequest = async () =>{
    const url = 'http://omdbapi.com/?s=star wars&apikey=1ecc91b'
    const response = await fetch(url);
    const responseJson = await response.json()
    setMovies(responseJson.Search)
    console.log(responseJson)

  }

  useEffect(() => {
    getMoviesRequest()
  }, [])

  return (
  
   <div className="container-fluid movie-app">
    <div className="row">
       <MovieList movies={movies} />
    </div>
   </div>


    
    
    
  )
}

export default App;
