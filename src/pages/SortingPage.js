import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {MyContex} from "../App";
import button from "bootstrap/js/src/button";

function SortingPages(props) {
    const call=useContext(MyContex);
    console.log(call.ne)
    console.log(call.movies)
    const singleMovie=call.singleMovie;



    useEffect(()=>{
        // call.getMovie();
        call.getGenreList();
        call.getGenreData();
    },[]);



    const handleChange = (event, value) => {
        call.setPage(value);
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=1fd40a54bb7c8b5e91b107f78cdaac79&language=en- US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${value}&with_genres=All`)
            .then((res)=>{
                call.setMovies(res.data.results);
                call.setLink('')
            }).catch((e)=>{
            console.log(e)
        })
    };


    return (

        <div className="">
            <div className="w-75 mx-auto mb-2">
                <div className="row">
                    {call.genreList.map((item,index)=>(
                        <div className="col-xl-3 col-3 text-center mb-2">
                            <Link className="" to="/sorting">
                                <button key={index} className="btn text-white bg-secondary btn-outline-dark mx-2 my-2 btn-sm" onClick={()=>call.getGenreData(item.id,index)}>{item.name}</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <Stack spacing={1} >
                <Typography>
                    <h1 className="text-center text-warning fw-bold my-3 border-dark ">{call.ne}( <span className="fs-5 text-white"> total: <span className="text-warning">{call.genreData.total_results}</span> results)</span> )</h1>
                    <div className="row mt-5 mb-5">

                        {call.movies?.map((item,index)=>(
                            <div key={index} className="col-xl-3 col-6" onClick={()=>call.getLink(item.id,index)}>
                                <Link className="" to="/singleSorting">
                                    <div className="card trend-card mt-4"  onClick={()=>call.getSingleMovie(item.id)}>
                                        <div className="card-header w-100 ">
                                            <img src={`${call.image}${item.poster_path}`} alt="none"/>
                                            <div className="rating">{item.vote_average.toFixed(1)}</div>
                                        </div>
                                        <div className="card-body">
                                            <div className="title">{item.name}{item.title}</div>
                                            <div className="d-flex justify-content-between">
                                                <div className="type">{item.media_type}</div>
                                                <div className="date">{item.release_date}{item.first_air_date}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                        ))}

                        <div className="modal" id="myModal"  data-backdrop="static" data-keyboard="false" >
                            <div className="modal-dialog">
                                <div className="single-modal-content">


                                    <div className="modal-header  ">
                                        {/*<h4 className="modal-title d-flex justify-content-between">Movie details</h4>*/}
                                        <div className="title text-danger fs-5">{singleMovie.name}{singleMovie.title}</div>
                                        {/*<button type="button" className="btn bg-danger text-white" data-bs-dismiss="modal">Close</button>*/}
                                    </div>
                                    <div className="modal-body">

                                        <div className="header d-flex justify-content-start ">
                                            <img className="single-photo " src={`${call.image}${singleMovie.poster_path}`} alt="none"/>
                                            <div className="right">
                                                <div className="lang">Language: <span className="text-primary">{singleMovie.original_language}</span></div>
                                                <div className="lang">Release date: <span className="text-warning">{singleMovie.release_date}</span></div>
                                                <div className="lang">Status: <span className="text-secondary">{singleMovie.status}</span></div>
                                                <div className="lang">Duration: <span className="text-danger">{singleMovie.runtime}</span></div>
                                                <div className="lang">Vote average: <span className="text-info">{singleMovie.vote_average}</span></div>
                                                <div className="lang">Voters: <span className="text-danger">{singleMovie.vote_count}</span></div>
                                                <div className="lang">Overview: "<span className="text-success">{singleMovie.overview}</span>"</div>
                                                <div className="lang">Movie budget: <span className="text-warning">{singleMovie.budget}</span></div>
                                                <div>
                                                    <iframe width="300" height="200"
                                                            src="https://www.youtube.com/embed/vnR2Guu3atA"
                                                            title="YouTube video player" frameBorder="1"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowFullScreen></iframe></div>

                                            </div>
                                        </div>
                                        <div className="body">



                                        </div>


                                    </div>


                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-danger form-control" data-bs-dismiss="modal">Close
                                        </button>
                                    </div>

                                </div>
                            </div>


                        </div>


                    </div>

                </Typography>
                <div className="d-block text-center">
                    <Pagination
                        count={500}
                        page={call.page}
                        color="info"
                        onChange={handleChange} />
                </div>

            </Stack>
        </div>
        // <div className="">
        //     <div className="w-75 mx-auto mb-2">
        //         <div className="row">
        //             {call.genreList.map((item,index)=>(
        //                 <div className="col-xl-3 col-4 mb-2">
        //                     <Link className="" to="/sorting">
        //                         <button key={index} className="btn text-white bg-secondary btn-outline-dark mx-2 my-2 btn-sm" onClick={()=>call.getGenreData(item.id,index)}>{item.name}</button>
        //                     </Link>
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        //
        //     <Stack spacing={1} >
        //         <Typography>
        //             <h1 className="text-center text-warning fw-bold my-3 border-dark ">{call.ne}( <span className="fs-5 text-white"> total: <span className="text-warning">{call.genreData.total_results}</span> results)</span> )</h1>
        //             <div className="row mt-5 mb-5">
        //                 {call.movies?.map((item,index)=>(
        //                     <div key={index} className="col-xl-3 col-6"   onClick={()=>call.getLink(item.id,index)} >
        //                         <Link className="" to="/singleSorting">
        //                             <div className="card sorting-card  mt-4"  onClick={()=>call.getSingleMovie(item.id,index)}>
        //                                 <div className="card-header w-100 ">
        //                                     {/*{()=>{item.poster_path.length>0?setLink1('block'):setLink2('block')}}*/}
        //                                     <img  style={{display:`${call.link1}`}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}    alt="none"/>
        //                                     {/*<img  style={{display:`${link2}`}} src={`https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg`}    alt="none"/>*/}
        //                                     <div className="rating">{item?.vote_average.toFixed(1)}</div>
        //                                 </div>
        //                                 <div className="card-body">
        //                                     <div className="title">{item.name}{item.title}</div>
        //                                     <div className="d-flex justify-content-between">
        //                                         <div className="type">{item.media_type}</div>
        //                                         <div className="date">{item.release_date}{item.first_air_date}</div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </Link>
        //                     </div>
        //                 ))}
        //             </div>
        //
        //         </Typography>
        //         <div className="d-block text-center pagi" >
        //             <Pagination
        //                 // style={{display:`${call.paginationLink}`}}
        //                 count={500}
        //                 page={call.page}
        //                 color="info"
        //                 onChange={handleChange} />
        //         </div>
        //     </Stack>
        // </div>
    );
}

export default SortingPages;