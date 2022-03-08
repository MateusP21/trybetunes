import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      artistInfo: {},
      musicsData: [],
    };
  }

  componentDidMount() {
    this.handleGetMusics();
  }

handleGetMusics = async () => {
  const { match: { params } } = this.props;
  const musics = await getMusics(params.id);

  this.setState({
    artistInfo: musics[0],
    musicsData: musics,
  });
}

render() {
  const { musicsData, artistInfo } = this.state;
  return (
    <>
      <Header />
      <div data-testid="page-album">

        <div className="artist">
          <img src={ artistInfo.artworkUrl100 } alt="" />
          <h1 data-testid="artist-name">{artistInfo.artistName}</h1>
          <p data-testid="album-name">{artistInfo.collectionName}</p>
        </div>

        <div className="musics">
          {
            musicsData.map((music, index) => index !== 0
                && <MusicCard
                  handleLoading={ this.handleLoading }
                  key={ music.trackId }
                  music={ music }
                />)
          }

        </div>

      </div>
    </>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
