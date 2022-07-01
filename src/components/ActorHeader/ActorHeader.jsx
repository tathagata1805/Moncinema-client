import React from 'react'

/**Display infos from an actor on actorPage
 * @param  {array} {data}
 */
export default function ActorHeader({data}) {
  return (
    <div className='specific'>
            
    <div className="specificMovie">
         
         <div className='custombg'>
             <div className='specificMovieInfo'>
                 
                 {data.profile_path === undefined 
                 ? <img src="/images/placeholder.jpg" alt={data.name}/> 
                 : <img src={`https://image.tmdb.org/t/p/w500/${data.profile_path}`} alt={data.name}/>}
                 
                 <div className='specificMovieInfoDetails'>
                     <h2>{data.name}</h2>
                     <p>{data.birthday} <span>&#183;</span> {data.known_for_department} <span>&#183;</span> {data.place_of_birth}</p>
                     <p className='specificMovieInfoDetailsTagline'></p>
                     <h3>Biography</h3>
                     <p>{data.biography}</p>

                 </div>
             </div>
         </div>
     </div>
     
 </div>
  )
}
