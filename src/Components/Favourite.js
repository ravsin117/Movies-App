import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';


function Favourite() {

let genreids = {
    28: 'Action', 12: 'Adventure',
    88: 'Crime', 99: 'Documentary',
    16: 'Animation', 35: 'Comedy', 
    14: 'Fantasy', 36: 'History', 
    18: 'Drama', 10751: 'Family', 
    9648: 'Mystery', 10749: 'Romance',
    27: 'Horror', 10402: 'Music', 
    53: 'Thriller', 10752: 'War',
    878:'Sci-Fi', 10770: 'TV', 
    37: 'Western' ,80:'Horror'
  }
    const [curGenre,setCurGenre]=useState('All Genres');
    const[favourites,setFavourites] = useState([]);
    const[genres,setGenre] = useState([])
    const[rating,setRating] = useState(0)
    const[popularity,setPopularity] = useState(0)
    const[search,setSearch] = useState('')
    const[rows,setRows] = useState(5)
    const[page,setPage] = useState(1)
   
    // for getting fav mov from  local storage 
    useEffect(()=>{
          let oldfav =localStorage.getItem('imdb') || []
          oldfav =JSON.parse(oldfav)
          setFavourites(oldfav);
    },[])
    
    // for Genres buttons
    useEffect(()=>{
        let newArr = favourites?.map((m) => genreids[m.genre_ids[0]]);
        newArr= new Set(newArr)
        console.log(newArr)
        setGenre(['All Genres',...newArr])
    },[favourites])

    let delmovie = (movie) => {
      let newArr = favourites.filter((m) => m.id !== movie.id);
      setFavourites([...newArr]);
      localStorage.setItem("imdb", JSON.stringify([...newArr]));
    };
     // filtering movies acc to genres
    let filteredMovies=[];
    filteredMovies = curGenre ==='All Genres' ? favourites
    : favourites.filter((m)=> genreids[m.genre_ids[0]]===curGenre)
    
    
    //Rating filter
    if(rating==1){
      filteredMovies = filteredMovies.sort(function(obA,obB){
        return obA.vote_average - obB.vote_average;
      })
    }else if(rating==-1){
      filteredMovies = filteredMovies.sort(function(obA,obB){
        return obB.vote_average - obA.vote_average;
      })      
    }
    //popularity filter
    if(popularity==1){
      filteredMovies = filteredMovies.sort(function(obA,obB){
        return obA.popularity - obB.popularity;
      })
    }else if(popularity==-1){
      filteredMovies = filteredMovies.sort(function(obA,obB){
        return obB.popularity - obA.popularity;
      })      
    }

    //searching filter
     filteredMovies=filteredMovies.filter((movie)=>movie.title.toLowerCase().includes(search.toLocaleLowerCase())
    )
    // pagination 
    let maxPage = Math.ceil(filteredMovies.length/rows);
    let si = (page-1)*rows;
    let ei = Number(si) + Number(rows);

    function goAhead() {
      if(page<maxPage)
      setPage(page + 1);
    }
    function goBack() {
      if (page > 1) setPage(page - 1);
    }

    filteredMovies=filteredMovies.slice(si,ei);
  return (
    <>
      <div className="mt-4 px- 2 flex justify-center flex-wrap space-x-2 ">
        {genres?.map((genre) => (
          <button
            key={Math.random() + 1}
            className={
              curGenre == genre
                ? "m-2 text-xl p-2 px-2 hover:bg-blue-400  font-bold text-white rounded-xl bg-blue-400"
                : "m-2 text-xl p-2 px-2 hover:bg-blue-400  font-bold text-white rounded-xl bg-gray-400"
            }
            onClick={() => {
              setPage(1)
              setCurGenre(genre)
            }}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className="text-center ">
        <input
          type="text"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search"
          className="border border-3 text-center p-1 m-2"
        />
        <input
          type="number"
          placeholder="Rows"
          className="border border-3 text-center p-1 m-2"
        />
      </div>

      <div>
        <div className="flex flex-col m-4">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex  items-center">
                          <img
                            src="https://img.icons8.com/ios/24/000000/circled-chevron-up.png"
                            className="mr-2 cursor-pointer "
                            alt=""
                            onClick={() => {
                              setPopularity(0);
                              setRating(-1);
                            }}
                          />
                          Rating
                          <img
                            src="https://img.icons8.com/ios/24/000000/circled-chevron-down.png"
                            className="ml-2 cursor-pointer"
                            alt=""
                            onClick={() => {
                              setPopularity(0);
                              setRating(1);
                            }}
                            className="mr-2 cursor-pointer"
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex  items-center">
                          <img
                            src="https://img.icons8.com/ios/24/000000/circled-chevron-up.png"
                            alt=""
                            onClick={() => {
                              setRating(0);
                              setPopularity(-1);
                            }}
                            className="mr-2 cursor-pointer"
                          />
                          Popularity
                          <img
                            src="https://img.icons8.com/ios/24/000000/circled-chevron-down.png"
                            alt=""
                            onClick={() => {
                              setRating(0);
                              setPopularity(1);
                            }}
                            className="m-2 cursor-pointer"
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Genre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Remove
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMovies?.map((movie) => (
                      <tr key={movie.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {movie.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {movie.vote_average}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {movie.vote_average}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {movie.popularity}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {"genre"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            href="#"
                            className="text-red-600 hover:text-red-900"
                            onClick={() => delmovie(movie)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Pagination pageProp={page} goAhead={goAhead} goBack={goBack}/>
      </div>
    </>
  );
}

export default Favourite;
