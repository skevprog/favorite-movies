import React, { Component } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import SearchBar from '../../components/SearchBar';

const apiUrl = 'http://www.omdbapi.com/?apikey=be947be3';

class CardsContainer extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      searchTerm: '',
    };
  }


  async componentDidMount() {
    // initial state
    const defaultMovies = await axios.get(`${apiUrl}&s=batman`);
    const { Search } = defaultMovies.data;
    this.setState({ movies: Search });
  }

    handleOnChange = (e) => {
      this.setState({
        searchTerm: e.target.value,
      });
    }

    handleOnSubmit = async (e) => {
      e.preventDefault();
      try {
        const { searchTerm } = this.state;
        const resp = await axios.get(`${apiUrl}&s=${searchTerm}`);
        const { Search: movies } = resp.data;
        this.setState({ movies });
      } catch (error) {
        console.error('Error', error);
      }
    }

    showDetails = async (movieId) => {
      try {
        const movieDetails = await axios.get(`${apiUrl}&i=s${movieId}`);
        console.log(movieDetails);
      } catch (error) {
        console.error('Error', error);
      }
    }

    renderCards = () => {
      const { movies } = this.state;
      return movies.map(({ Poster, Title, imdbID } = {}) => (
        <Card key={imdbID} onClick={() => this.showDetails(imdbID)} image={Poster} title={Title} />
      ));
    }


    render() {
      const { movies, searchTerm } = this.state;
      if (!movies) {
        return <div>Loading...</div>;
      }
      return (
        <>
          <SearchBar
            onSubmit={this.handleOnSubmit}
            onChange={this.handleOnChange}
            value={searchTerm}
          />
          <div className="movies-container">
            {this.renderCards()}
          </div>
        </>
      );
    }
}

export default CardsContainer;
