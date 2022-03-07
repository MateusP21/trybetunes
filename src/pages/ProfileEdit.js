import React from 'react';
import Header from '../components/Header';

export default class ProfileEdit extends React.Component {
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile-edit">
          <h1>ProfileEdit</h1>
        </div>
      </>
    );
  }
}
