import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { getMovie, getMovieCredits, getMovieVideos, getMovieRecommendations,getMovieComments } from '../../services/db';
import './SpecificMovie.scss'
import NavBar from './../../components/NavBar/NavBar';
import MovieHeader from '../../components/MovieHeader/MovieHeader';
import MovieCasting from '../../components/MovieCasting/MovieCasting';
import MovieComments from '../../components/MovieComments/MovieComments';
import MovieRecommendations from '../../components/MoviesRecommendations/MovieRecommendations';

export default function SpecificMovie() {
    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    if(token === undefined){
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }

    //data states
    const [movie, setMovie] = useState([]);
    const [credits,setCredits] = useState([]);
    const [videos,setVideos] = useState(null);
    const [recommendations,setRecommendations] = useState([]);
    const [comments,setComments] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    const {id} = useParams();
    
    // get specific movie datas
    useEffect(() => {
        const fetchRecommendations = async () => {
            const request = await getMovieRecommendations(id,token);
            if (!request) return console.log('data error');
            setRecommendations(request.results);
        };
        const fetchMovie = async () => {
            const request = await getMovie(id,token);
            if (!request) return console.log('data error');
            setMovie(request);
        };
        const fetchCasting = async () => {
            const request = await getMovieCredits(id,token);
            if (!request) return console.log('data error');
            setCredits(request);
        };
        const fetchVideos = async () => {
            const request = await getMovieVideos(id,token);
            if (!request) return console.log('data error');
            const filteredVideos = request.results?.filter(video=> video.type === "Trailer");
            setVideos(filteredVideos[0]);
        };
        const fetchComments = async () => {
            const request = await getMovieComments(id,token);
            if (!request) return console.log('data error');
            setComments(request.data);
        };
        fetchComments();
        fetchRecommendations();
        fetchMovie();
        fetchCasting();
        fetchVideos();
        setIsLoading(false)
    }, [id,token]);

    //console.log(credits)
    //console.log(movie)
    //console.log(videos)
    //console.log(recommendations)

    if(isLoading){
        return <>Loading...</>
    }

    return (
        <div id="movie">

            <NavBar />

            <div id='movieInfos'>
                <MovieHeader movie={movie} videos={videos} bgImg={movie.backdrop_path}/>
                <div id="movieInfosWrapper">
                    <div id="movieInfosWrapperLeft">
                        <MovieCasting data={credits} />
                        <MovieComments data={comments} id={id}/>
                    </div>
                    <div id="movieInfosWrapperRight">
                        <MovieRecommendations data={recommendations}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
