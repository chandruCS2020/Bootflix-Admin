import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import Analytics from "./pages/analytics/Analytics";
import Payment from "./pages/payment/Payment";
import User from "./pages/user/User";
import MovieList from "./pages/movieList/MovieList";
import SongList from "./pages/songList/SongList";
import Songs from "./pages/songs/Songs";
import Movie from "./pages/movie/Movie";
import UserList from './pages/userList/UserList';
import Login from "./pages/login/Login";
import {useContext} from 'react';
import { AuthContext } from "./context/authContext/AuthContext";
import Movieview from "./pages/MovieView/Movieview";
import Movieedit from "./components/Movieedit/Movieedit";

function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <Router>
      <Switch>
      <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
      {user ? (
        <>
        <Topbar />
        <div className="container">
          <Sidebar />
          
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/analytics">
              <Analytics/>
            </Route>
            <Route  path="/payment">
              <Payment />
            </Route>
            <Route  path="/user">
              <User />
            </Route>
            <Route  path="/movielist">
              <MovieList />
            </Route>
            <Route  path="/userlist">
              <UserList />
            </Route>
            <Route  path="/songslist">
              <SongList />
            </Route>
            <Route  path="/addsongs">
              <Songs />
            </Route>
            <Route  path="/addmovies">
              <Movie />
            </Route>
            <Route  path="/movie/:movieId">
              <Movieview />
            </Route>
            <Route  path="/movies/edit/:movieId">
              <Movieedit />
            </Route>
        </div>
      </>
      ):<Redirect to='/login' />}
      </Switch>
    </Router>
  );
}

export default App;
