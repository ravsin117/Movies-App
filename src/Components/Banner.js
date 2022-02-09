import React,{useEffect,useState} from 'react';
import Image from '../banner.jpg'
import axios from 'axios';
function Banner() {
   const [movies, setMovies] = useState({});
   useEffect(() => {
     axios
       .get(
         "https://api.themoviedb.org/3/trending/movie/week?api_key=0443b5cd22e858004bd293ad46f72042&page=1"
       )
       .then((res) => {
         // console.table(res.data.results);
         setMovies(res.data.results[0]); // results has array of objects representing 1 movie for 1 obj
       });
   },[]);


  return (
    <div
      className={`bg-[url(https://image.tmdb.org/t/p/original/${movies.backdrop_path})] h-[40vh] md:h-[60vh]
       bg-center bg-cover flex items-end 
      `}
    >
      <div className="text-xl md:text-3xl text-white p-4 bg-gray-900 w-full flex justify-center bg-opacity-50 font-bold">
        {movies.title}
      </div>
    </div>
  ); 
}

export default Banner;

