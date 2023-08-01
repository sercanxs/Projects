import Hero from "./Hero";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect, useState } from "react";

const MovieView = () => {
   const { id } = useParams();
   console.log(id);
   const fetch = require('node-fetch');
   const url = 'https://api.themoviedb.org/3/movie/'+id; 
   const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDRjNzNiNWYwOTVlZTlmYjliM2NhY2NmOWRmMTcwYyIsInN1YiI6IjY0Yzc0YzFlNjNlNmZiMDBjNDA5Y2I5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7eoPj1CmxXmfEIGj6mMOHA9ZTWJ4NpT0QwNH7I1fpZs'
      }
    };

   const [movieDetails, setMovieDetails] = useState({}); 
   const [isloading, setIsLoading] = useState(true); 
   useEffect(() => {
        console.log("make an api request", id);
        fetch(url, options)
         .then(res => res.json())
         .then(json => {
            console.log(json)
            setMovieDetails(json);
            setIsLoading(false); 
         
         
         })
         .catch(err => console.error('error:' + err));

   },[id] ) 

   function renderMovieDetails() {
      if(isloading){                           
           return(
            <Hero text="Loading..." />
           )
      }
      if(movieDetails){  
         const posterPath = "https://image.tmdb.org/t/p/w500"+ movieDetails.poster_path; 
         const backdropUrl = "https://image.tmdb.org/t/p/original"+movieDetails.backdrop_path;                   
        return <>          
        
        <Hero text={movieDetails.original_title} backdrop={backdropUrl} />
        <div className="container my-5">
           <div className="row">
             <div className="col-md-3">
               <img  src={posterPath} alt="..." className="img-fluid shadow rounded"/>
               
               </div>
             <div className="col-md-9">
               <h2>{movieDetails.original_title}</h2>
               <p className="lead">{movieDetails.overview}</p>
               </div>


           </div>
        </div>
             

          
        </>
       
      }
      
   }

     return renderMovieDetails(); 
}


export default MovieView;