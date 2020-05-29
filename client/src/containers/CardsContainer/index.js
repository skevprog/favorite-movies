import React, {
  useState, useEffect, useRef, useReducer, useCallback,
} from 'react';
import axios from 'axios';
import {
  Card, SearchBar, Pagination, Alert, Loader,
} from '../../components';
import CardsContainerReducer from './reducer';

const API_URL = 'https://api.themoviedb.org/3';
const API_KEY = '5327697ea8ddd8a4b0662631cd99b7b5';

const initialState = {
  loading: true,
  moviesData: {},
  errorMessage: null,
};

const CardsContainer = () => {
  const [state, dispatch] = useReducer(CardsContainerReducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [topRated, setTopRated] = useState(true);
  const isFirstRun = useRef(true);

  // componentDidMount
  useEffect(() => {
    getTopRatedMovies();
  }, []);

  // Executes every time page changes (componentDidUpdate)
  useEffect(() => {
    // Avoids the execution on the first render
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    searchMovies(searchTerm);
  }, [page]);

  const getMoviesData = async (url) => {
    dispatch({ type: 'SEARCH_MOVIES_REQUEST' });
    try {
      const moviesApi = await axios.get(url);
      const { results: movies, total_results, total_pages } = moviesApi.data;
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: { movies, total_results, total_pages },
      });
    } catch (error) {
      dispatch({
        type: 'SEARCH_MOVIES_FAILURE',
        error: error.message,
      });
    }
  };

  const getTopRatedMovies = () => {
    const topRatedMoviesUrl = `${API_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    getMoviesData(topRatedMoviesUrl);
  };

  const searchMovies = (searchValue) => {
    const movieSearchUrl = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchValue}&page=${page}&include_adult=false`;
    getMoviesData(movieSearchUrl);
    if (!topRated) return;
    setTopRated(false);
  };

  const showInfo = (info) => {
    alert(info.overview);
  };

  const renderCards = () => {
    const { movies = [] } = state.moviesData;
    return !movies.length
      ? <Alert type="INFO" message="No movies found" />
      : movies.map(({
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
  };

  const renderMovies = () => {
    const { loading, errorMessage } = state;
    if (errorMessage) {
      return (<Alert type="ERROR" message={errorMessage} />);
    }
    if (loading) {
      return <Loader />;
    }
    return renderCards();
  };

  const nextPage = useCallback(
    () => {
      setPage((c) => c + 1);
    },
    [setPage],
  );
  const previousPage = useCallback(
    () => {
      setPage((c) => c - 1);
    },
    [setPage],
  );

  const renderPagination = () => {
    const { total_pages, total_results } = state.moviesData;
    return (
      <Pagination
        totalPages={total_pages}
        currentPage={page}
        totalResults={total_results}
        onNextPageClick={nextPage}
        onPrevPageClick={previousPage}
      />
    );
  };

  const search = (searchValue) => {
    setPage(1);
    setSearchTerm(searchValue);
    searchMovies(searchValue);
  };

  const { moviesData: { total_pages = 0 } } = state;

  return (
    <>
      <SearchBar search={search} />
      <>
        {!topRated && (total_pages > 1) && renderPagination()}
        <div className="movies-container">
          {renderMovies()}
        </div>
      </>
    </>
  );
};

export default CardsContainer;
