import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.handleGetUser();
  }

  handleGetUser = async () => {
    this.setState({ loading: true });
    const userObj = await getUser();
    this.setState({ loading: false });
    this.setState({
      user: userObj.name,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <h1>Header</h1>
        {
          loading
            ? <Loading />
            : (<p data-testid="header-user-name">{user}</p>)
        }

      </header>
    );
  }
}
