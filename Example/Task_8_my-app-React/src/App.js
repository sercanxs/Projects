
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/HomePage';
import AboutView from './components/AboutPage';
import SearchView from './components/SearchView';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { useState, useEffect } from 'react';
import MovieView from './components/MovieView';



function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const fetch = require('node-fetch');


  const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}`; 
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDRjNzNiNWYwOTVlZTlmYjliM2NhY2NmOWRmMTcwYyIsInN1YiI6IjY0Yzc0YzFlNjNlNmZiMDBjNDA5Y2I5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7eoPj1CmxXmfEIGj6mMOHA9ZTWJ4NpT0QwNH7I1fpZs'
    }
  };

useEffect(()=>{
  if(searchText) {
   console.log(searchText,"is the searchText");
   fetch(url, options)
  .then(res => res.json())
  .then(json => {

    setSearchResults(json.results);
  
  })
  .catch(err => console.error('error:' + err));
   
    }
  },[searchText])           
  


  return (
   <div>
     <Navbar searchText={searchText} setSearchText={setSearchText} />
    <Switch>
      <Route path="/" exact>
       <Home />
      </Route>
      <Route path="/about" component={AboutView} />
      <Route path="/search">
        <SearchView keyword={searchText} searchResults={searchResults} />
      </Route>
      <Route path="/movies/:id" component={MovieView} />
    </Switch>
   </div>
   

  )
}

export default App;
