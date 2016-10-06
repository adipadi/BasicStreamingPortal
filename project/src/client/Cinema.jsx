import React from 'react';
import { connect } from 'react-redux';
import * as cinemaActions from './cinemaActions';
import { bindActionCreators } from 'redux';
import Player from './Player';
import AssetCarousel from './AssetCarousel';

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(cinemaActions, dispatch) };
}

function mapStateToProps(state) {
  return { ...state.cinemaReducer };
}

class Cinema extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object,
    assets: React.PropTypes.array
  };

  componentDidMount() {
    this.props.actions.getAssets();
  }

  render() {
    return (
      <div className="cinema">
        Welcome!
        <div className="playerWrapper">
          <Player/>
          <AssetCarousel assets={this.props.assets}/>
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Cinema);
