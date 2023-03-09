import React, {useContext} from 'react';
import {MyContex} from "../App";
import {Link} from "react-router-dom";
function SingleSearch(props) {
    const call=useContext(MyContex);
    const singleMovie=call.singleMovie;
    const photos=call.actors;





    return (

        <div className="single">
            <div className="header">
                <div className="d-flex justify-content-between">
                    <h4 className="  mx-5">Movie details</h4>
                    <button className="btn btn-info">
                        <Link className="nav-link  fw-bold border-danger fs-6  " to="/search" >Back to Search</Link>
                    </button>
                </div>
                <div className="title text-dark fw-bold text-center mb-3 mx-auto   fs-5">{singleMovie.name}{singleMovie.title}</div>
            </div>
            <div className="body">
                <div className="header d-flex justify-content-start h-auto ">
                    <img className="single-photo " src={`${call.image}${singleMovie.poster_path}`} alt="none"/>
                    <div className="right h-auto">
                        <div className="h-auto">
                            <div className="row">
                                <div className="col-xl-6">
                                    <div className="lang">Language: <span className="text-warning">{singleMovie.original_language}</span></div>
                                    <div className="lang">Release date: <span className="text-warning">{singleMovie.release_date}</span></div>
                                    <div className="lang">Status: <span className="text-warning">{singleMovie.status}</span></div>
                                    <div className="lang">Duration: <span className="text-warning">{singleMovie.runtime}</span></div>
                                    <div className="lang">Vote average: <span className="text-info">{singleMovie.vote_average}</span></div>
                                    {/*<div className="lang">Voters: <span className="text-danger">{singleMovie.vote_count}</span></div>*/}
                                    <div className="lang">Movie budget: <span className="text-warning">{singleMovie.budget}</span></div>
                                    <div className="text-white fs-6 mx-5  mb-0 mt-4 trailer-w" ><span className="text-danger fw-bold">YouTube Trailer</span> Watch here</div>
                                </div>
                                <div className="col-xl-6 over-box-w">
                                    <div className="over overflow-auto w-100">Overview: <span className="text-warning">"{singleMovie.overview}"</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex  justify-content-between ">
                            <div className="trailer-b-web">
                                <div className="text-white fs-6 mx-5  mb-0 mt-4 trailer" ><span className="text-danger fw-bold">YouTube Trailer</span> Watch here</div>
                                <iframe
                                    className="iframe"
                                    width="350" height="260"
                                    src={`https://www.youtube.com/embed/${call.link}`}
                                    title="YouTube video player" frameBorder="1"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen>Trailer</iframe>

                            </div>
                            <div className="actors actors-m text-center mb-5">
                                <p className="text-decoration-underline ">Cast</p>
                                <div className="d-flex justify-content-between mb-2">
                                    {photos.slice(0,3).map((item,index)=>(
                                        <Link className="" to="/single">
                                            <div key={index} className="card">
                                                <div className="card-header"><img className="actor-photo" src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt="none"/></div>
                                                <div className="card-body">
                                                    <div className="name text-dark ">{item.original_name}</div>
                                                    <div className="role text-danger"><span className="text-dark">as </span> "{item.character}"</div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}

                                </div>


                                <div className="offcanvas h-auto offcanvas-end " id="demo">
                                    <div className="offcanvas-header  h-auto">
                                        <h1 className="offcanvas-title ">Actors</h1>

                                    </div>
                                    <div className="offcanvas-body h-auto">
                                        <div className="actors">
                                            <div className="d-flex justify-content-between mb-1">
                                                {photos.splice(0,4).map((item,index)=>(
                                                    <div key={index} className="card">
                                                        <div className="card-header"><img className="actor-photo" src={`https://image.tmdb.org/t/p/w300${item.profile_path}`} alt={`${item.original_name}`}/></div>
                                                        <div className="card-body">
                                                            <div className="name text-dark ">{item.original_name}</div>
                                                            <div className="role text-danger"><span className="text-dark">as </span> "{item.character}"</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                {photos.splice(4,4).map((item,index)=>(
                                                    <div key={index} className="card">
                                                        <div className="card-header"><img className="actor-photo" src={`https://image.tmdb.org/t/p/w300${item.profile_path}`} alt="none"/></div>
                                                        <div className="card-body">
                                                            <div className="name text-dark ">{item.original_name}</div>
                                                            <div className="role text-danger"><span className="text-dark">as </span> "{item.character}"</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="d-flex justify-content-between mb-2">
                                                {photos.splice(8,4).map((item,index)=>(
                                                    <div key={index} className="card">
                                                        <div className="card-header"><img className="actor-photo" src={`https://image.tmdb.org/t/p/w300${item.profile_path}`} alt="none"/></div>
                                                        <div className="card-body">
                                                            <div className="name text-dark ">{item.original_name}</div>
                                                            <div className="role text-danger"><span className="text-dark">as </span> "{item.character}"</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button type="button" className=" btn btn-danger w-25 text-reset"
                                                data-bs-dismiss="offcanvas">Close</button>
                                    </div>
                                </div>

                                <button className="btn btn-success w-50" type="button" data-bs-toggle="offcanvas"
                                        data-bs-target="#demo">
                                    View all...
                                </button>


                            </div>
                        </div>
                    </div>
                </div>
                <div className="down">
                    <div className="over over-m overflow-auto w-100">Overview: <span className="text-warning">"{singleMovie.overview}"</span></div>
                    <div className="d-flex trailer-b-mobile justify-content-between mt-3">
                        <div>
                            <div className="text-white fs-6 mx-auto  mb-0 mt-4 " ><span className="text-danger fw-bold">YouTube Trailer</span> Watch here</div>
                            <iframe
                                className="iframe"
                                width="500" height="260"
                                src={`https://www.youtube.com/embed/${call.link}`}
                                title="YouTube video player" frameBorder="1"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>Trailer</iframe>

                        </div>

                    </div>
                    <div className="actors  text-center mb-5">
                        <p className="text-decoration-underline ">Cast</p>
                        <div className="d-flex justify-content-between mb-2">
                            {photos.slice(0,4)?.map((item,index)=>(
                                <Link className="" to="/single">
                                    <div key={index} className="card">
                                        <div className="card-header"><img className="actor-photo" src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt="none"/></div>
                                        <div className="card-body">
                                            <div className="name text-dark ">{item.original_name}</div>
                                            <div className="role text-danger"><span className="text-dark">as </span> "{item.character}"</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}


                        </div>


                        {/*<div className="offcanvas h-auto offcanvas-end " id="demo">*/}
                        {/*    <div className="offcanvas-header  h-auto">*/}
                        {/*        <h1 className="offcanvas-title ">Actors</h1>*/}

                        {/*    </div>*/}
                        {/*    <div className="offcanvas-body h-auto">*/}
                        {/*        <div className="actors">*/}
                        {/*            <div className="d-flex justify-content-between mb-1">*/}
                        {/*                {photos.splice(0,4).map((item,index)=>(*/}
                        {/*                    <div key={index} className="card">*/}
                        {/*                        <div className="card-header"><img className="actor-photo" src={`https://image.tmdb.org/t/p/w300${item.profile_path}`} alt={`${item.original_name}`}/></div>*/}
                        {/*                        <div className="card-body">*/}
                        {/*                            <div className="name text-dark ">{item.original_name}</div>*/}
                        {/*                            <div className="role text-danger"><span className="text-dark">as </span> "{item.character}"</div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                ))}*/}
                        {/*            </div>*/}
                        {/*            <div className="d-flex justify-content-between mb-1">*/}
                        {/*                {photos.splice(4,4).map((item,index)=>(*/}
                        {/*                    <div key={index} className="card">*/}
                        {/*                        <div className="card-header"><img className="actor-photo" src={`https://image.tmdb.org/t/p/w300${item.profile_path}`} alt="none"/></div>*/}
                        {/*                        <div className="card-body">*/}
                        {/*                            <div className="name text-dark ">{item.original_name}</div>*/}
                        {/*                            <div className="role text-danger"><span className="text-dark">as </span> "{item.character}"</div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                ))}*/}
                        {/*            </div>*/}
                        {/*            <div className="d-flex justify-content-between mb-2">*/}
                        {/*                {photos.splice(8,4).map((item,index)=>(*/}
                        {/*                    <div key={index} className="card">*/}
                        {/*                        <div className="card-header"><img className="actor-photo" src={`https://image.tmdb.org/t/p/w300${item.profile_path}`} alt="none"/></div>*/}
                        {/*                        <div className="card-body">*/}
                        {/*                            <div className="name text-dark ">{item.original_name}</div>*/}
                        {/*                            <div className="role text-danger"><span className="text-dark">as </span> "{item.character}"</div>*/}
                        {/*                        </div>*/}
                        {/*                    </div>*/}
                        {/*                ))}*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <button type="button" className=" btn btn-danger w-25 text-reset"*/}
                        {/*                data-bs-dismiss="offcanvas">Close</button>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<button className="btn btn-success w-50" type="button" data-bs-toggle="offcanvas"*/}
                        {/*        data-bs-target="#demo">*/}
                        {/*    View all...*/}
                        {/*</button>*/}


                    </div>
                </div>


            </div>
        </div>
    )
}
export default SingleSearch;


