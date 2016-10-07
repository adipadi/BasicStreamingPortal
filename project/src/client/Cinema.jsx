import React from 'react';
import { connect } from 'react-redux';
import * as cinemaActions from './cinemaActions';
import { bindActionCreators } from 'redux';
import Player from './Player';
import AssetCarousel from './AssetCarousel';
import MovieInformation from './MovieInformation';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(cinemaActions, dispatch) };
}

function mapStateToProps(state) {
  return { ...state.cinemaReducer };
}

class Cinema extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object,
    assets: React.PropTypes.array,
    playingAssetId: React.PropTypes.number,
    movieInformationArray: React.PropTypes.array,
    showMovieInformationWithId: React.PropTypes.string,
    loading: React.PropTypes.bool
  };

  componentDidMount() {
    this.props.actions.getAssets();
  }

  onAssetChange = (id) => {
    this.props.actions.onAssetChange(id);
    this.props.actions.getMovieInformation(id, 'force+awakens');
  }

  onAssetHover = (id) => {
    const exists = _.find(this.props.movieInformationArray, m => m.id === id);
    if (!exists) {
      // this.props.actions.getMovieInformation(id, 'force+awakens');
    }
    this.props.actions.showMoviewInformationWithId(id);
  }

  render() {
    let movieInformation;
    if (this.props.showMovieInformationWithId) {
      const movieData = _.find(this.props.movieInformationArray, m => m.assetId === this.props.showMovieInformationWithId);
      movieInformation = (
        <MovieInformation
          id={this.props.showMovieInformationWithId}
          movieData={movieData}
          getMovieInformation={this.props.actions.getMovieInformation}
          loading={this.props.loading}/>
      );
    }
    return (
      <div className="cinema">
        <ReactCSSTransitionGroup
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={1}
          transitionName="animate-movie-information"
          transitionAppear={true}
          component="div">
          {movieInformation}
        </ReactCSSTransitionGroup>
        <Player assetId={this.props.playingAssetId}/>
        <AssetCarousel onAssetHover={this.onAssetHover} assets={this.props.assets} onAssetChange={this.onAssetChange}/>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);
