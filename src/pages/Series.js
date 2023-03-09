import React, {useContext, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";
import button from "bootstrap/js/src/button";
import {Link} from "react-router-dom";
import {MyContex} from "../App";


export default function Series(props) {
    const call=useContext(MyContex);
    const singleMovie=call.singleMovie;
    const m=call.genreList.slice(0,14).concat(call.genreList.slice(15));
    console.log(call.page)




    useEffect(()=>{
        // call.searchData([]);

        call.getMovie();
        call.getGenreData();
        call.getGenreList();
    },[]);

    const handleChange = (event, value) => {
        call.setPage(value);
        axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=1fd40a54bb7c8b5e91b107f78cdaac79&language=en- US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${value}&with_genres=All`)
            .then((res)=>{
                call.setSeries(res.data.results);
                call.setLink('')
            }).catch((e)=>{
            console.log(e)
        })
    };




    return (
        <div>
            <div className="w-75 mx-auto mb-2">
                <div className="row">
                    {call.genreList.map((item,index)=>(
                        <div className="col-xl-2 col-4 mb-2">
                            <Link className="" to="/sortingSeries">
                                <button key={index} className="btn text-white fs-6 bg-secondary btn-outline-warning mx-2 my-2 btn-sm" onClick={()=>call.getGenreData(item.id,index)}>{item.name}</button>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>

            <Stack spacing={1} >
                <Typography>
                    <h1 className="text-center text-warning fw-bold my-3">TV Series</h1>
                    {/*<div>data-bs-toggle="modal" data-bs-target="#myModal"</div>*/}
                    <div className="row mt-5 mb-4">

                        {call.series.map((item,index)=>(
                            <div key={index} className="col-xl-3 col-6" onClick={()=>call.getLink(item.id,index)}>
                                <Link className="" to="/singleSeries">
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

    );
}