import React, { useEffect, useState } from "react";
import Image from '../banner.jpg'
import axios from 'axios'
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";

function Movies() {
   const [movies, setMovies] = useState([]);
   const [page, setPage] = useState(1);
   const[hover,setHover]=useState('');
   const[favourites,setFav]=useState([])
   function goAhead() {
     setPage(page + 1);
   }
   function goBack() {
     if (page > 1) setPage(page - 1);
   }

    useEffect(()=>{
      axios
        .get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=0443b5cd22e858004bd293ad46f72042&page=${page}`
        )
        .then((res) => {
          // console.table(res.data.results);
          setMovies(res.data.results);// rsults has array of objects representing 1 movie for 1 obj
        });
        
     
    },[page])
    
    let addToFav =(movie)=>{
      setFav(prev=>(
         [...favourites,movie]
      ))
    }
    
  return (
    <>
      <div className="mb-8">
        <div className=" mt-8 mb-8 font-bold text-2xl text-center ">
          Trending Movies
        </div>
        {movies.length == 0 ? (
          <div className="flex justify-center">
            <Oval
              className="flex justify-center"
              heigth="100"
              width="100"
              color="grey"
              ariaLabel="loading"
              secondaryColor="grey"
            />
          </div>
        ) : (
          <div className="flex flex-wrap justify-center ">
            {
              movies.map((movie)=>{
                  return (
                    <div
                      key={movie.id}
                      className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] 
                      md:h-[30vh] md:w-[250px]
                      h-[25vh] w-[150px]
                      bg-center bg-cover
                      rounded-xl flex items-end 
                      m-4 hover:scale-110 ease-out 
                      duration-300 relative
                      `}
                      onMouseEnter={() => {
                        setHover(movie.id);
                      }}
                      onMouseLeave={() => {
                        setHover("");
                      }}
                    >
                      {hover == movie.id && (
                        <>
                          {favourites.find((m) => m.id == movie.id) ? (
                            <div
                              className="absolute top-2 right-2 p-1 bg-gray-700 rounded-lg cursor-pointer"
                              // onClick={() => addToFav(movie)}
                            >
                              ❌
                            </div>
                          ) : (
                            <div
                              className="absolute top-2 right-2 p-1 bg-gray-700 rounded-lg cursor-pointer"
                              onClick={() => addToFav(movie)}
                            >
                              🧡
                            </div>
                          )}
                        </>
                      )}
                      <div
                        className="bg-gray-900
                        w-full text-white py-2
                        text-center rounded-b-xl
                        font-bold "
                      >
                        {movie.title}
                      </div>
                    </div>
                  );
              })
            }
            

          </div>
        )}
      </div>
      <Pagination pageProp={page} goAhead={goAhead} goBack={goBack}/>
    </>
  );
}

export default Movies;
