import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      artistInfo: {},
      musicsData: [],
      favorites: [],
    };
  }

  componentDidMount() {
    this.handleGetMusics();
    this.getFavorites();
  }

    getFavorites = async () => {
      this.setState({
        loading: true,
        favorites: await getFavoriteSongs(),
      }, () => this.setState({
        loading: false,
      }));
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
  const { musicsData, artistInfo, loading, favorites } = this.state;
  return (
    <>
      <Header />
      {loading
        ? <Loading />
        : (
          <div data-testid="page-album">

            <div className="artist">
              <img src={ artistInfo.artworkUrl100 } alt="" />
              <h1 data-testid="artist-name">{artistInfo.artistName}</h1>
              <p data-testid="album-name">{artistInfo.collectionName}</p>
            </div>

            <div className="musics">
              {
                musicsData.map((music, index) => {
                  let item;
                  if (index !== 0) {
                    item = favorites.some(
                      (favorite) => favorite.trackId === music.trackId,
                    )
                      ? (
                        <MusicCard
                          key={ music.trackId }
                          music={ music }
                          isFavoriteSong
                        />)
                      : (
                        <MusicCard
                          key={ music.trackId }
                          music={ music }
                          isFavoriteSong={ false }
                        />);
                  }

                  return item;
                })
              }

            </div>

          </div>)}
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
