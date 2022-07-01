import React, {useEffect,useState} from 'react'
import './NowPlaying.scss'
import db from '../../services/db'
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { addStorage } from '../../services/addStorage';
import {removeStorage} from '../../services/removeStorage';
/** Display now playing caroussel on MoviePage
 */
export default function NowPlaying() {
    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    
    const [nowPlaying, setnowPlaying] = useState([]); 
    
    let storedData = window.localStorage.watchlist
    

    useEffect(() => {
          db.get("movies/now-playing/1", {headers: {
            "Authorization": `Bearer ${token}`
            }})
          .then(response => setnowPlaying(response.data.results))
          .catch(e=>setToken(''));
    }, [token]);


    //console.log(nowPlaying)

    return (
    <>
    
    <h2>Now Playing</h2>
    <div className='nowPlaying'>
        <Splide options={ {
                perPage: 6,
                breakpoints: {
                    1625: {
                        perPage:5,
                    },
                    1440: {
                        perPage:4,
                    },
                    1169: {
                        perPage:3,
                    },
                    540: {
                        perPage:2,
                    },
                },
                pagination:false,
                rewind : true,
                
            }}>
        {nowPlaying.map((movie,index) => {
            return  <SplideSlide key={index}>
                        <div className="nowPlayingCard"  >
                        {movie.poster_path === null 
                            ? <img src="/images/placeholder.jpg" alt={movie.title}/> 
                            : <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
                        }
                        <Link to={`/movies/${movie.id}`}><button>Watch Now</button></Link>

                        {!storedData.includes(movie.id.toString()) 
                        ?<button className='nowPlayingWatchlist addtowatch' onClick={() => {addStorage(movie)}}>+</button>
                        :<button className='nowPlayingWatchlist removetowatch' onClick={() => {removeStorage(movie)}}>-</button>}

                        </div>

                    </SplideSlide>
        })}

    </Splide>
    </div>
    </>
  )
}
