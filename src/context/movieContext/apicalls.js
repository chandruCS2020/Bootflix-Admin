import axios from "axios";
import {
createMovieFailure,
createMovieStart,
createMovieSuccess,
deleteMovieFailure,
deleteMovieStart,
deleteMovieSuccess,
getMoviesFailure,
getMoviesStart,
getMoviesSuccess,
} from "./MovieAction";

export const getMovies = async (dispatch) => {
dispatch(getMoviesStart());
try {
    const response = await axios.get('https://apibootflix.herokuapp.com/list-movies');
    dispatch(getMoviesSuccess(response.data.result));
} catch (err) {
    dispatch(getMoviesFailure());
}
};

//create
export const updateMovie = async (movie,id , dispatch) => {
dispatch(createMovieStart());
try {
    const res = await axios.put('https://apibootflix.herokuapp.com/movie/'+id,movie);
    dispatch(createMovieSuccess());
} catch (err) {
    dispatch(createMovieFailure());
}
};

//delete
export const deleteMovie = async (id, dispatch) => {
dispatch(deleteMovieStart());
try {
    await axios.delete('https://apibootflix.herokuapp.com/movie/'+id);
    dispatch(deleteMovieSuccess(id));
} catch (err) {
    dispatch(deleteMovieFailure());
}
};