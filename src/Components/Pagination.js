import React ,{useState} from "react";

function Pagination(props) {
  
  return (
    <div
      className="w-full
       flex justify-center
       mb-8"
    >
      <button
        className="
        p-2 border-2
      border-indigo-500 
        rounded-l-xl
      text-indigo-500 border-r-0"
        onClick={props.goBack}
      >
        Previous
      </button>

      <button
        className="
        p-2 border-2 
      border-indigo-500
      text-indigo-500 
      bg-blue-100 "
      > {props.pageProp}
      </button>

      <button
        className="
         p-2 border-2
         rounded-r-xl
       border-indigo-500 border-l-0
       text-indigo-500"
       onClick={props.goAhead}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
