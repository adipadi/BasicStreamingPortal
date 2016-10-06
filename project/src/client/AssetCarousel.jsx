import React from 'react';

// const assets = [
//   { '@id': 1, title: 'The first', description: 'The first asset blabla' },
//   { '@id': 2, title: 'The second', description: 'The second asset blabla' },
//   { '@id': 3, title: 'The third', description: 'The third asset blabla' },
//   { '@id': 4, title: 'The fourth', description: 'The fourth asset blabla' },
//   { '@id': 5, title: 'The fifth', description: 'The fifth asset blabla' },
//   { '@id': 6, title: 'The sixth', description: 'The sixth asset blabla' },
//   { '@id': 7, title: 'The seventh', description: 'The seventh asset blabla' },
//   { '@id': 8, title: 'The eigth', description: 'The eigth asset blabla' },
//   { '@id': 9, title: 'The nine', description: 'The nine asset blabla' },
//   { '@id': 10, title: 'The ten', description: 'The ten asset blabla' },
//   { '@id': 11, title: 'The eleventh', description: 'The eleventh asset blabla' },
//   { '@id': 12, title: 'The twelvth', description: 'The twelvth asset blabla' }
// ];

class AssetCarousel extends React.Component {

  static propTypes = {
    assets: React.PropTypes.array,
    onAssetChange: React.PropTypes.func
  };

  componentDidMount() {
  }

  onClick(id) {
    if (this.props.onAssetChange) {
      this.props.onAssetChange(id);
    }
  };

  render() {
    const assets = this.props.assets;
    return (
      <div className="asset-carousel">

      </div>
    );
  }

}

export default AssetCarousel;
