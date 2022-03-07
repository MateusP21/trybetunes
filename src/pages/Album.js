import React from 'react';
import Header from '../components/Header';

export default class Album extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <h1>Album</h1>
        </div>
      </>
    );
  }
}
