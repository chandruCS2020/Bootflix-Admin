import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Analytics from "./pages/analytics/Analytics";
import Payment from "./pages/payment/Payment";
import User from "./pages/user/User";
import MovieList from "./pages/movieList/MovieList";
import SongList from "./pages/songList/SongList";
import Songs from "./pages/songs/Songs";
import Movie from "./pages/movie/Movie";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route  path="/analytics">
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
          <Route  path="/songslist">
            <SongList />
          </Route>
          <Route  path="/addsongs">
            <Songs />
          </Route>
          <Route  path="/addmovies">
            <Movie />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
