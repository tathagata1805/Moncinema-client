import React,{useEffect,useState} from 'react'
import ReactPaginate from 'react-paginate';
import NavBar from '../../components/NavBar/NavBar'
import './ListPage.scss'
import db from '../../services/db'
import { useParams } from 'react-router-dom'
import MovieItem from '../../components/MovieItem/MovieItem'

export default function ListPage() {

    // In first place i need to check if the JWT is inside the localStorage
    const userInfos = localStorage.getItem("userInfos");
    const [token,setToken] = useState(JSON.parse(userInfos).token)
    if(token === undefined){
        localStorage.removeItem("userInfos");
        setToken('')
        window.location.href = "/";
    }
    //page params 
    const {name} = useParams()
   

    //data state
    const[data,setData] = useState([])
    const [currentPage, setPage] = useState(1);

    useEffect(() => {
        db.get(`movies/${name}/${currentPage}`, {headers: {
            "Authorization": `Bearer ${token}`
            }})
          .then(response => setData(response.data))
          .catch(e=>setToken(''));
    }, [name,currentPage,token]);
    
    const handlePageChange = (page) => {
        setPage(page.selected + 1)
        document.querySelector('.movieList').scrollIntoView()
    };
    
    //transform title using params
    const modifyTitle = (name) => {
          switch (name) {
            case 'trending':
              return "Trending"
            case 'top-rated':
              return `Top Rated`
            case 'now-playing':
              return `Now Playing`
            case 'upcoming':
              return 'Upcoming'
            default:
              break;
          }
        return name
    };

    return (
        <div id="movie">
            <NavBar />

            <div className='movieList'>
                <h2 className='movieTitle'>{modifyTitle(name)}</h2>
                <MovieItem data={data.results} />

                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageChange}
                    pageCount={data.total_pages}
                    previousLabel="<"
                    breakLabel="..."
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />

            </div>
            
        </div>
    )
}
