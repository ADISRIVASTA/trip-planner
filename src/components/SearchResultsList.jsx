import React from 'react'

const SearchResultsList=({results})=>{
  return (
    <div className="results-list">
       {
        results.map((result,id)=>{
          return <div key={id}> {result.name}</div>
        })
       }
    </div>
  );
};
export default SearchResultsList;

