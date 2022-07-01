import { toast } from "react-toastify";

export const removeStorage = (movie) => {
    let storedData = window.localStorage.watchlist.split(",");
    
    // eslint-disable-next-line
    let newData = storedData.filter((id) => id != movie.id);

    window.localStorage.watchlist = newData;
    toast.success('Movie removed from your watchlist !')
};