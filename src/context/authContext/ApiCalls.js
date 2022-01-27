import axios from "axios";
import { loginFailure, loginStart, loginSuccess ,logout} from "./AuthAction";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://apibootflix.herokuapp.com/adminLogoutAll", user,{withCredentials:true});
        dispatch(loginSuccess(res.data));
        // console.log(res.data)
    } catch (err) {
        dispatch(loginFailure());
    }
};
export const me = async (dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("https://apibootflix.herokuapp.com/me",{withCredentials:true});
        dispatch(loginSuccess(res.data));
        // console.log(res.data)
    } catch (err) {
        dispatch(loginFailure());
    }
};
export const logouts = async (dispatch) => {
    try {
        const res = await axios.get("https://apibootflix.herokuapp.com/Logout", {withCredentials:true});
        dispatch(logout());
        // localStorage.removeItem('admin');
    } catch (err) {
        console.log(err)
    }
};