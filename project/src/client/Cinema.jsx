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
    playingAssetId: React.PropTypes.string,
    movieInformationArray: React.PropTypes.array,
    showMovieInformationWithId: React.PropTypes.string,
    movieInformationLoading: React.PropTypes.bool,
    assetsLoading: React.PropTypes.bool,
    showInitialHeader: React.PropTypes.bool,
    idleSecondsCounter: React.PropTypes.number
  };

  componentDidMount() {
    // Make a call to fetch assets
    window.addEventListener('scroll', this.checkScrollBottom, false);
    window.addEventListener('scroll', this.resetIdleCounter, false);
    window.addEventListener('mousemove', this.resetIdleCounter, false);
    window.addEventListener('keypress', this.resetIdleCounter, false);
    window.addEventListener('click', this.resetIdleCounter, false);
    window.mouseIdleInterval = setInterval(this.incrementIdleSeconds, 1000);

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScrollBottom, false);
    window.removeEventListener('scroll', this.resetIdleCounter, false);
    window.removeEventListener('mousemove', this.resetIdleCounter, false);
    window.removeEventListener('keypress', this.resetIdleCounter, false);
    window.removeEventListener('click', this.resetIdleCounter, false);
    clearInterval(window.mouseIdleInterval);
  }


  onAssetChange = (id) => {
    this.props.actions.onAssetChange(id);
    this.props.actions.getMovieInformation(id, 'force+awakens');
  }

  onAssetHover = (id) => {
    this.props.actions.showMoviewInformationWithId(id);
  }

// Make function for getting movies

  incrementIdleSeconds = () => {
    this.props.actions.setIdleSeconds(this.props.idleSecondsCounter + 1);
  }

  resetIdleCounter = () => {
    this.props.actions.setIdleSeconds(0);
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
    const className = this.props.idleSecondsCounter >= 2 &&
                      !this.props.showMovieInformationWithId
                      ? ' fade' : '';

    if (this.props.showMovieInformationWithId) {
      const movieData = _.find(this.props.movieInformationArray, m => m.assetId === this.props.showMovieInformationWithId);
      movieInformation = (
        <MovieInformation
          id={this.props.showMovieInformationWithId}
          movieData={movieData}
          getMovieInformation={this.getMovieInformation}
          loading={this.props.movieInformationLoading}/>
      );
    }
    return (
      <div className={`cinema ${className}`}>
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
            <AssetCarousel className={className}
              playingAssetId={this.props.playingAssetId}
              onAssetHover={this.onAssetHover} assets={this.props.assets}
              onAssetChange={this.onAssetChange}/>
        }
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);
