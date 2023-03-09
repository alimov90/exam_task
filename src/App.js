import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
import { Route, Switch} from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import TrendingHome from "./pages/TrendingHome";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import SingleDetail from "./pages/SingleDetail";
import SingleTrending from "./pages/SingleTrending";
import SortingPage from "./pages/SortingPage";
import SingleSorting from "./pages/SingleSorting";
import SingleSeries from "./pages/SingleSeries";
import SingleSortingSeries from "./pages/SingleSortingSeries";
import SortingSeries from "./pages/SortingSeries";
import SingleSearch from "./pages/SingleSearch";



export const MyContex=createContext(null)

function App(props) {
    const KEY='1fd40a54bb7c8b5e91b107f78cdaac79';
    const image='https://image.tmdb.org/t/p/w500';
    const [singleMovie,setSingleMovie]=useState({})
    const [link,setLink]=useState('');
    const [type,setType]=useState('movie');
    const [actors,setActors]=useState([]);
    const [data,setData]=useState({});
    const [genreData,setGenreData]=useState({});
    const [list,setList]=useState([]);
    const [page,setPage]=useState(1);
    const [genreIndex,setGenreIndex]=useState(0);
    const [ne,setNe]=useState('none');

    const [movies,setMovies]=useState([]);
    const [genreList,setGenreList]=useState([]);

    const [series,setSeries]=useState([]);
    const [singleSeries,setSingleSeries]=useState({})
    const [actorsSeries,setActorsSeries]=useState([]);
    const [genreDataS,setGenreDataS]=useState({});

    const [searchData,setSearchData]=useState([]);
    const [searchText,setSearchText]=useState('');
    const [results,setResults]=useState(0);
    const [paginationLink,setPaginationLink]=useState('none');
    const [nothingLink,setNothingLink]=useState('none');
    const [typeLink,setTypeLink]=useState('darkgrey');
    const [typeLink1,setTypeLink1]=useState('darkgrey');



console.log(movies)

    function getData() {
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=1fd40a54bb7c8b5e91b107f78cdaac79&page=${page}`)
            .then((res)=>{
                setData(res.data);
                setList(res.data.results);
                setLink('')
                setPage(1)
            }).catch((e)=>{
            console.log(e)
        })

    }
    function getSingleMovie(id) {

        axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${KEY}&language= en-US`)
            .then((res)=>{
                setSingleMovie(res.data)
            }).catch((e)=>{
            console.log(e)
        })

        axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${KEY}&language= en-US`)
            .then((res)=>{
                setSingleSeries(res.data)
            }).catch((e)=>{
            console.log(e)
        })



    }
    function getLink(id,index) {
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${KEY}&lan guage=en-US`)
            .then((res)=>{
                const x=res.data.results.findIndex(item=> item.name=== 'Official Trailer')
                if (x>=0){
                    setLink(res.data.results[x].key)
                }
            }).catch((e)=>{
            console.log(e)
        })
        axios.get(`https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${KEY}&lan guage=en-US`)
            .then((res)=>{
                setActors(res.data.cast)
            }).catch((e)=>{
            console.log(e)
        })


        axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${KEY}&lan guage=en-US`)
            .then((res)=>{
                setActorsSeries(res.data.cast)
            }).catch((e)=>{
            console.log(e)
        })



    }


    function getMovie() {
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=en- US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=All`)
            .then((res)=>{
                setMovies(res.data.results);
                setLink('')
                setPage(1)

            }).catch((e)=>{
            console.log(e)
        })

        axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&language=en- US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=All`)
            .then((res)=>{
                setSeries(res.data.results);
                setLink('')
                setPage(1)

            }).catch((e)=>{
            console.log(e)
        })

    }
    function getGenreList() {
        axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${KEY}&language=en- US`)
            .then((res)=>{
                setGenreList(res.data.genres)
            }).catch((e)=>{
            console.log(e)
        })
    }
    function getGenreData(id,index) {
        setGenreIndex(index);


        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&language=en- US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}`)
            .then((res)=>{
                setGenreData(res.data);
                setMovies(res.data.results);
                setNe(genreList[index].name);


            }).catch((e)=>{
            console.log(e)
        })
        axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${KEY}&language=en- US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}`)
            .then((res)=>{
                setGenreDataS(res.data);
                setSeries(res.data.results);
                setNe(genreList[index].name);
                console.log(res.data)
                if (res.data.total_results===0 ){
                    setPaginationLink('none')
                }


            }).catch((e)=>{
            console.log(e)
        })


    }


    function getSearchData() {
        axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=1fd40a54bb7c8b5e91b107f78cdaac79&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
            .then((res)=>{
                setSearchData(res.data.results);
                setResults(res.data.total_results);
                setLink('')
                // setPage(1)
                if (res.data.total_results >20 ){
                    return setPaginationLink('block');}
                if (res.data.results.length ===0){
                    return setNothingLink('block');}
            }).catch((e)=>{
            console.log(e)
        })
    }
    const getInput = (e) => {
        setSearchText(e.target.value);
        setSearchData([]);
        setPaginationLink('none');
        setNothingLink('none');
        setResults(0);
    };
    const movieType = (e) => {
        setType('movie')
        setTypeLink('#0b9648')
        setTypeLink1('#ec6666')
    };
    const seriesType = (e) => {
        setType('tv')
        setTypeLink1('#0b9648')
        setTypeLink('#ec6666')
    };


    const handleChangeTrend = (event, value) => {
        setPage(value);

        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=1fd40a54bb7c8b5e91b107f78cdaac79&page=${value}`)
            .then((res)=>{
                setData(res.data);
                setList(res.data.results);
            }).catch((e)=>{
            console.log(e)
        })


    };


    return (
        <MyContex.Provider value={{image,
            singleMovie,setSingleMovie,
            link,setLink,
            actors,setActors,
            data,setData,
            list,setList,
            page,setPage,
            ne,setNe,
            type,setType,

            movies,setMovies,
            genreList,setGenreList,
            genreIndex,setGenreIndex,
            genreData,setGenreData,

            series,setSeries,
            singleSeries,setSingleSeries,
            actorsSeries,setActorsSeries,
            genreDataS,setGenreDataS,

            searchData,setSearchData,
            searchText,setSearchText,
            results,setResults,
            paginationLink,setPaginationLink,
            nothingLink,setNothingLink,
            typeLink,setTypeLink,
            typeLink1,setTypeLink1,

            handleChangeTrend,
            getData,
            getSingleMovie,
            getLink,

            getMovie,
            getGenreList,
            getGenreData,

            getSearchData,
            getInput,
            movieType,
            seriesType

             }}>
            <div className="container">
                    <MyNavbar/>
                    <Switch>
                        <Route exact path="/" component={TrendingHome}/>
                        <Route exact path="/movies" component={Movies}/>
                        <Route exact path="/series" component={Series}/>
                        <Route exact path="/search" component={Search}/>
                        <Route exact path="/sorting" component={SortingPage}/>
                        <Route exact path="/sortingSeries" component={SortingSeries}/>
                        <Route exact path="/single" component={SingleDetail}/>
                        <Route exact path="/singleTrending" component={SingleTrending}/>
                        <Route exact path="/singleSorting" component={SingleSorting}/>
                        <Route exact path="/singleSortingSeries" component={SingleSortingSeries}/>
                        <Route exact path="/singleSeries" component={SingleSeries}/>
                        <Route exact path="/singleSearch" component={SingleSearch}/>

                    </Switch>

                </div>



        </MyContex.Provider>
    );
}

export default App;