import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import {MyContex} from "../App";

function Search(props) {
    const call=useContext(MyContex);
    useEffect(()=>{
        call.getSearchData()
        call.setSearchData([]);
        call.setPaginationLink('none');
        call.setResults("not yet)))");
        call.setTypeLink('#0b9648')
        call.setTypeLink1('#ec6666')


    },[]);
    const handleChange = (event, value) => {
        call.setPage(value);
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1fd40a54bb7c8b5e91b107f78cdaac79&language=en-US&query=${call.searchText}&page=${value}&include_adult=false`)
            .then((res)=>{
                call.setSearchData(res.data.results);
                call.setResults(res.data.total_results);
                // setPage(1)
                if (res.data.results.length >0){
                    return call.setPaginationLink('block');}
                if (res.data.results.length ===0){
                    return call.setNothingLink('block');}
            }).catch((e)=>{
            console.log(e)
        })
    };



    return (
        <div className="search">
            <Stack spacing={1} >
                <Typography>
                    <div className="text-warning text-decoration-underline"><h1 className=" text-info mb-5 fw-bold  text-center ">Searching section</h1></div>

                    <div className="box">
                        <div className="d-flex justify-content-between w-75 mx-auto">
                            <input
                                id="name"
                                onChange={call.getInput}
                                className="search form-control"
                                name="search"
                                placeholder="Enter text(default search in Movies )"
                                defaultValue=""
                                type="search"/>
                            <button className="btn  btn-primary w-50 ms-1" onClick={()=>call.getSearchData()}>Search</button>
                        </div>
                        <p className="mt-4 text-center fw-bold text-warning">Choose the section to search from:</p>

                        <div className="d-flex justify-content-around w-75  mx-auto">
                            <button style={{backgroundColor:`${call.typeLink}`}} className="btn  btn-secondary w-50 border-0 text-dark mx-5 fw-bold" onClick={call.movieType}>Movie section</button>
                            <button style={{backgroundColor:`${call.typeLink1}`}} className="btn  btn-secondary w-50 border-0 text-dark mx-5 fw-bold" onClick={call.seriesType}>TV Series section</button>
                        </div>
                    </div>
                    <p className="text-warning fs-4 ms-5 mt-3">Results found: <span className="text-info fs-6">{call.results}</span></p>
                    <p style={{display:`${call.nothingLink}`}} className=" nothing   text-center ms-5 mt-5">Oops! Nothing is found ((( </p>
                    <div className="row  mb-5">
                        {call.searchData?.map((item,index)=>(
                            <div key={index} className="col-xl-3 col-6"   onClick={()=>call.getLink(item.id,index)} >
                                <Link className="" to="/singleSearch">
                                    <div className="card  mt-4"  onClick={()=>call.getSingleMovie(item.id,index)}>
                                        <div className="card-header w-100 ">
                                            <img  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}    alt="none"/>
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
                        count={call.results}
                        page={call.page}
                        color="info"
                        onChange={handleChange} />
                </div>
            </Stack>
        </div>
    );
}

export default Search;