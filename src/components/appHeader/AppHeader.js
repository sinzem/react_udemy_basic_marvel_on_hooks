import {Link, NavLink} from "react-router-dom";

import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                            exact
                            activeStyle={{'color': '#9f0013'}} 
                            // end 
                            // style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})} (закомментированное - для 6-й версии router-dom )
                            to="/">Characters</NavLink></li>
                    /
                    <li><NavLink
                             activeStyle={{'color': '#9f0013'}} 
                            // end 
                            // style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit'})}
                            to="/comics">Comics</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;