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
    if (nextProps.id !== this.props.id) {
      this.getMovieInformation(nextProps);
    }

  }

  getMovieInformation = (props) => {
    if (!props.movieData && props.getMovieInformation && props.id && !props.loading) {
      const justRandomArray = ['force+awakens', 'forrest+gump', 'shoot+em+up', 'superman+returns',
      'the+phantom+menace', 'scary+movie'];
      const min = Math.ceil(0);
      const max = Math.floor(6);
      const nr = Math.floor(Math.random() * (max - min)) + min;
      props.getMovieInformation(props.id, justRandomArray[nr]);
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
        <img alt="bgr" src={poster} className="poster"/>
        <div className="info-wrapper">
          <div className="col">
            <h2 className="title">{movieData.Title}</h2>
            <div className="plot">{movieData.Plot}</div>
            <div className="rating">IMDB Rating {movieData.imdbRating}
              <StarRatingComponent
                name="rating" /* name of the radio input, it is required */
                value={(movieData.imdbRating / 1.6)} /* number of selected icon (`0` - none, `1` - first) */
                editing={false} /* is component available for editing, default `true` */
                renderStarIcon={() => (<i className="fa fa-star" aria-hidden="true"></i>)}
                renderStarIconHalf={() => (<i className="fa fa-star-half-o" aria-hidden="true"></i>)}
              />
            </div>
            <div className="votes">Votes {movieData.imdbVotes}</div>
          </div>
          <div className="col">
            <div className="actors"><h3 className="sub-header">Actors</h3> <br/> {movieData.Actors}</div>
            <div className="writers"><h3 className="sub-header">Writer(s)</h3> <br/> {movieData.Writer}</div>
          </div>
          <div className="col">
            <div className="awards"><h3 className="sub-header">Awards</h3> <br/> {movieData.Awards}</div>
            <div className="director"><h3 className="sub-header">Director</h3> <br/> {movieData.Director}</div>

          </div>


        </div>

      </div>
    );
  }

}

export default MovieInformation;
