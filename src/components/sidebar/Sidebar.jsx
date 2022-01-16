import "./sidebar.css";
import HomeIcon from '@mui/icons-material/Home';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { NavLink } from "react-router-dom";

export default function Sidebar() {
return (
    <div className="sidebar">
    <div className="sidebarWrapper">
        <div className="sidebarMenu">
        <h3 className="sidebarTitle">Dashboard</h3>
        <ul className="sidebarList">
            <NavLink to="/" className="link">
            <li className="sidebarListItem">
            <HomeIcon className="sidebarIcon" />
            Home
            </li>
            </NavLink>
            <NavLink to='/analytics' className='link'>
                <li className="sidebarListItem">
                <AnalyticsIcon className="sidebarIcon" />
                Analytics
                </li>
            </NavLink>
            <NavLink to='/payment' className='link'>
                <li className="sidebarListItem">
                <AttachMoneyIcon className="sidebarIcon" />
                Payment
                </li>
            </NavLink>
        </ul>
        </div>
        <div className="sidebarMenu">
        <h3 className="sidebarTitle">Quick Menu</h3>
        <ul className="sidebarList">
            <NavLink to="/userlist" className="link">
            <li className="sidebarListItem">
                <PersonOutlineIcon className="sidebarIcon" />
                UserList
            </li>
            </NavLink>
            <NavLink to="/movielist" className="link">
                <li className="sidebarListItem">
                    <MovieCreationIcon className="sidebarIcon" />
                    MovieList
                </li>
            </NavLink>
            <NavLink to='/songslist' className='link'>
                <li className="sidebarListItem">
                <LibraryMusicIcon className="sidebarIcon" />
                SongsList
                </li>
            </NavLink>
        </ul>
        </div>
        <div className="sidebarMenu">
        <h3 className="sidebarTitle">Create</h3>
        <ul className="sidebarList">
            <NavLink to="/addmovies" className="link">
            <li className="sidebarListItem">
                <MovieCreationIcon className="sidebarIcon" />
                Movies
            </li>
            </NavLink>
            <NavLink to="/addsongs" className="link">
                <li className="sidebarListItem">
                    <LibraryMusicIcon className="sidebarIcon" />
                    Songs
                </li>
            </NavLink>
        </ul>
        </div>
    </div>
    </div>
);
}