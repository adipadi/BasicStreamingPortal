import React from 'react';
import { connect } from 'react-redux';
import * as cinemaActions from './cinemaActions';
import { bindActionCreators } from 'redux';
import Player from './Player';
import AssetCarousel from './AssetCarousel';
import MovieInformation from './MovieInformation';
import _ from 'lodash';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loading from './Loader';

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
    movieInformationLoading: React.PropTypes.bool,
    assetsLoading: React.PropTypes.bool,
    showInitialHeader: React.PropTypes.bool
  };

  componentDidMount() {
    this.props.actions.getAssets();
    window.addEventListener('scroll', this.checkScrollBottom, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScrollBottom, false);
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

  checkScrollBottom = () => {
    if ((document.body.scrollHeight ===
        document.body.scrollTop +
        window.innerHeight) && this.props.showInitialHeader) {
      this.props.actions.toggleInitialHeader();
    }
  }

  render() {
    let movieInformation;
    const initialHeader = this.props.showInitialHeader ? (
      <div className="initial-load-header">
        <h1>Scroll down to view movies</h1>
        <i className="fa fa-arrow-down fa-6" aria-hidden="true"/>
      </div>
    ) : null;

    if (this.props.showMovieInformationWithId) {
      const movieData = _.find(this.props.movieInformationArray, m => m.assetId === this.props.showMovieInformationWithId);
      movieInformation = (
        <MovieInformation
          id={this.props.showMovieInformationWithId}
          movieData={movieData}
          getMovieInformation={this.props.actions.getMovieInformation}
          loading={this.props.movieInformationLoading}/>
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
        {initialHeader}
        {
          this.props.assetsLoading ?
          <Loading title="Loading assets"/> :
          <AssetCarousel playingAssetId={this.props.playingAssetId}
            onAssetHover={this.onAssetHover} assets={this.props.assets} onAssetChange={this.onAssetChange}/>
        }
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);
