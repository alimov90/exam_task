import React, {useContext, useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from "axios";
import {MyContex} from "../App";
import {Link} from "react-router-dom";


export default function TrendingHome() {

    const call=useContext(MyContex);
    useEffect(()=>{
        call.getData();
        // call.searchData([]);


    },[]);
    return (
        <Stack spacing={1} >
            <Typography>
                <h1 className="text-center trend-title  fw-bold my-3">Trending today</h1>

                <div className="row mt-5 mb-5">
                    {call.list.map((item,index)=>(
                        <div key={index} className="col-xl-3 col-6" onClick={()=>call.getLink(item.id,index)}>
                            <Link className="" to="/singleTrending">
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
                </div>
            </Typography>
            <div className="d-block text-center pagi">
                <Pagination

                    count={call.data.total_pages}
                    page={call.page}
                    color="info"
                    onChange={call.handleChangeTrend} />
            </div>

        </Stack>
    );
}