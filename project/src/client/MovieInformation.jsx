import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import Loader from './Loader';

class MovieInformation extends React.Component {

  static propTypes = {
    movieData: React.PropTypes.object,
    id: React.PropTypes.string,
    loading: React.PropTypes.bool,
  };

  componentDidMount() {
    this.getMovieInformation(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // Insert logic here
  }

  getMovieInformation = (props) => {
    if (!props.movieData && props.getMovieInformation && props.id && !props.loading) {
      props.getMovieInformation(props.id);
    }
  }

  render() {
    const movieData = this.props.movieData || {};
    const poster = movieData.Poster && movieData.Poster !== 'N/A' ? movieData.Poster :
    'http://image.shutterstock.com/z/stock-vector-camera-film-mm-roll-gold-festival-movie-poster-slide-films-frame-vector-illustration-317168813.jpg';

    if (this.props.loading) {
      return (
        <div className="movie-information">
          <Loader/>
        </div>
      );
    }

    return (
      <div className="movie-information">
        {/*Display the id for this component*/}
            {/*  <StarRatingComponent
                name="rating"
                value={calculate value}
                editing={false}
                renderStarIcon={() => (<i className="fa fa-star" aria-hidden="true"></i>)}
                renderStarIconHalf={() => (<i className="fa fa-star-half-o" aria-hidden="true"></i>)}
              />
            */}
      </div>
    );
  }

}

export default MovieInformation;
