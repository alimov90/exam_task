import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {MyContex} from "../App";
import button from "bootstrap/js/src/button";

function SortingSeries(props) {
    const call=useContext(MyContex);




    useEffect(()=>{
        call.getMovie();
        call.getGenreList();
        call.getGenreData();
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
        <div className="">
            <div className="w-75 mx-auto mb-2">
                <div className="row">
                    {call.genreList.map((item,index)=>(
                        <div className="col-xl-3 col-4 mb-2">
                            <Link className="" to="/sortingSeries">
                                <button key={index} className="btn text-white bg-secondary btn-outline-dark mx-2 my-2 btn-sm" onClick={()=>call.getGenreData(item.id,index)}>{item.name}</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <Stack spacing={1} >
                <Typography>
                    <h1 className="text-center text-dark fw-bold my-3 border-dark text-decoration-underline">{call.ne}( <span className="fs-5 text-white"> total: <span className="text-warning">{call.genreDataS.total_results}</span> results)</span> )</h1>
                    <div className="row mt-5 mb-5">
                        {call.series?.map((item,index)=>(
                            <div key={index} className="col-xl-3 col-6"   onClick={()=>call.getLink(item.id,index)} >
                                <Link className="" to="/singleSortingSeries">
                                    <div className="card trend-card mt-4"  onClick={()=>call.getSingleMovie(item.id,index)}>
                                        <div className="card-header w-100 ">
                                            {/*{()=>{item.poster_path.length>0?setLink1('block'):setLink2('block')}}*/}
                                            <img  style={{display:`${call.link1}`}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}    alt="none"/>
                                            {/*<img  style={{display:`${link2}`}} src={`https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg`}    alt="none"/>*/}
                                            <div className="rating">{item?.vote_average.toFixed(1)}</div>
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
                    </div>

                </Typography>
                <div className="d-block text-center pagi" >
                    <Pagination
                        style={{display:`${call.paginationLink}`}}
                        count={call.genreDataS.total_pages}
                        page={call.page}
                        color="info"
                        onChange={handleChange} />
                </div>
            </Stack>
        </div>
    );
}

export default SortingSeries;