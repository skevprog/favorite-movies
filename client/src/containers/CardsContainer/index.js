import React, {
  useState, useEffect, useRef,
} from 'react';
import axios from 'axios';
import { Card, SearchBar, Pagination } from '../../components';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '5327697ea8ddd8a4b0662631cd99b7b5';

const CardsContainer = () => {
  const [moviesData, setMoviesData] = useState({
    movies: [],
    total_results: 0,
    total_pages: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [topRated, setTopRated] = useState(true);
  const isFirstRun = useRef(true);

  // Component didMount only executes first after first render
  useEffect(() => {
    getTopRatedMovies();
  }, []);

  // Executes every time page changes (componentDidUpdate)
  useEffect(() => {
    // Avoids to execute in first render
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    searchMovies();
  }, [page]);

  const getMoviesData = async (url) => {
    try {
      const moviesApi = await axios.get(url);
      const { results: movies, total_results, total_pages } = moviesApi.data;
      setMoviesData({ movies, total_results, total_pages });
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  const getTopRatedMovies = () => {
    const topRatedMoviesUrl = `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    getMoviesData(topRatedMoviesUrl);
  };

  const searchMovies = () => {
    const movieSearchUrl = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${page}&include_adult=false`;
    getMoviesData(movieSearchUrl);
    if (!topRated) return;
    setTopRated(false);
  };

  const handleOnChange = (e) => setSearchTerm(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    searchMovies();
  };

  const renderCards = () => moviesData.movies.map(({
    poster_path,
    original_title,
    id,
    ...rest
  } = {}) => (
    <Card
      key={id}
      image={poster_path}
      title={original_title}
      onClick={() => showInfo(rest)}
    />
  ));

  const showInfo = (info) => {
    alert(info.overview);
  };

  return (
    <>
      <SearchBar
        onSubmit={handleOnSubmit}
        onChange={handleOnChange}
        value={searchTerm}
      />
      {
    !moviesData.movies
      ? (<div>Loading...</div>)
      : (
        <>
          <div className="movies-container">
            {renderCards()}
          </div>
          {
         !topRated && (moviesData.total_pages > 1) && (
           <Pagination
             totalPages={moviesData.total_pages}
             currentPage={page}
             totalResults={moviesData.total_results}
             onPrevPageClick={() => setPage(page - 1)}
             onNextPageClick={() => setPage(page + 1)}
           />
         )
            }
        </>
      )
}
    </>
  );
};

export default CardsContainer;
