import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      loading: false,
    };
  }

  componentDidMount() {
    const { isFavoriteSong } = this.props;
    this.setState({
      isChecked: isFavoriteSong,
    });
  }

    handleChange = async (event) => {
      const { music } = this.props;
      const { isChecked } = this.state;
      if (isChecked) {
        this.setState({
          isChecked: !isChecked,
          loading: true,
        });
        await removeSong(music);
        this.setState({
          loading: false,
        });
      } else {
        this.setState({
          isChecked: event.target.checked,
          loading: true,
        });
        await addSong(music);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      const { music } = this.props;
      const { isChecked, loading } = this.state;
      if (loading) return <Loading />;
      return (

        <div className="track">
          <p>
            {music.trackName}
            {' '}
          </p>
          <audio data-testid="audio-component" src={ music.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
          </audio>
          <label htmlFor="favorites">
            Favorita
            <input
              onChange={ this.handleChange }
              checked={ isChecked }
              data-testid={ `checkbox-music-${music.trackId}` }
              type="checkbox"
              name=""
              id="favorites"
            />
          </label>

        </div>
      );
    }
}

MusicCard.propTypes = {
  isFavoriteSong: PropTypes.bool.isRequired,
  music: PropTypes.shape({
    trackName: PropTypes.string,
    trackId: PropTypes.number,
    previewUrl: PropTypes.string,
  }).isRequired,
};
