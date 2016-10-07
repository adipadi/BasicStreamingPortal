import React from 'react';
import Loading from './Loader';

class AssetCarousel extends React.Component {

  static propTypes = {
    assets: React.PropTypes.array,
    onAssetChange: React.PropTypes.func,
    loading: React.PropTypes.bool,
    playingAssetId: React.PropTypes.string
  };

  componentDidMount() {
  }

  onClick(id) {
    if (this.props.onAssetChange) {
      this.props.onAssetChange(id);
    }
  }

  onMouseOver(id) {
    if (this.props.onAssetHover) {
      this.props.onAssetHover(id)
    }
  }

  onMouseLeave(id) {
    if (this.props.onAssetHover) {
      this.props.onAssetHover(id)
    }
  }

  render() {
    const assets = this.props.assets;
    if (this.props.loading) {
      return (
        <div className="asset-carousel loading">
          <Loading/>
        </div>
      );
    }

    return (
      <div className="asset-carousel">
        {assets.map(a => {
          const imgUrl = (a.imageVersions && a.imageVersions.image && a.imageVersions.image.url) ||
           'http://images.hngn.com/data/images/full/134342/mr-robot.jpg';
          const isPlaying = a['@id'] === this.props.playingAssetId ? 'fa-pause-circle' : 'fa-play-circle';
          return (
            <div key={a['@id']} className="asset" onClick={this.onClick.bind(this, a['@id'])}
              onMouseOver={this.onMouseOver.bind(this, a['@id'])}
              onMouseLeave={this.onMouseLeave.bind(this, a['@id'])}>
              <div className="cover" style={{ backgroundImage: `url("${imgUrl}")` }}/>
              <i className={`fa ${isPlaying}`} aria-hidden="true"
                onMouseOver={this.onMouseOver.bind(this, a['@id'])}
                onMouseLeave={this.onMouseLeave.bind(this, a['@id'])}/>
              {a.title}
            </div>
          );
        })}
      </div>
    );
  }

}

export default AssetCarousel;
