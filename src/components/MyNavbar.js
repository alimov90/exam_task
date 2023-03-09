import React from 'react';
import {Link} from "react-router-dom";

function MyNavbar(props) {
    return (
        <div>
            <h1 className=" top   text-center mt-2 "><Link className="navbar-brand" to="/">CINEMA HOUSE</Link></h1>
            <nav className="navbar navbar-expand-sm  ">
                <button className="navbar-toggler " type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapsibleNavbar">MENU
                    {/*<span className="navbar-toggler-icon text-white "> </span>*/}
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav w-auto">
                        <li className="nav-item w-auto border-1 active" >
                            <Link className="nav-link  fw-bold" to="/">Trending today</Link>
                        </li>
                        <li className="nav-item w-auto">
                            <Link className="nav-link  fw-bold" to="/movies">Movies</Link>
                        </li>
                        <li className="nav-item w-auto">
                            <Link className="nav-link  fw-bold" to="/series">Series</Link>
                        </li>
                        <li className="nav-item w-auto">
                            <Link className="nav-link  fw-bold" to="/search">Search</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    );
}

export default MyNavbar;