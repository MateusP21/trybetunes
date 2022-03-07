import React from 'react';
import Header from '../components/Header';

export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      isDisabled: true,
    };
  }

    handleSearch = (e) => {
      const maxLength = 2;
      const searchText = e.target.value;
      this.setState({
        search: searchText,
      });
      if (searchText.length >= maxLength) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    }

    render() {
      const { isDisabled, search } = this.state;
      return (
        <>
          <Header />
          <div data-testid="page-search">
            <form>
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do Artista"
                onChange={ this.handleSearch }
                value={ search }
              />
              <button
                disabled={ isDisabled }
                data-testid="search-artist-button"
                type="button"
              >
                Procurar
              </button>
            </form>
          </div>
        </>
      );
    }
}
