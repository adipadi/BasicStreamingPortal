import React from 'react';

const player = window.vimond.player;
const query = player.getQueryParametersAsObject();
// const itemId = query.itemId;
// const startPosition = query.startPosition;

const replacements = [{
    match: /("avc1\.4d001f")+/g,
    replacement: '"avc1.4d401f"'
},{
    match: /("avc1\.42001e")+/g,
    replacement: '"avc1.42801e"'
},{
    match: /<Representation id="p0a1r1"(.|\n)*?<\/Representation>/m,
    replacement: ' '
}];

// if (query && query.audiocodec) {
//     replacements.push({
//         match: /("mp4a\.40\.2")+/g,
//         replacement: '"mp4a.40.5"'
//     });
// }

const config = {
    videoEngine: {
        dash: {
            manifestModifier: {
                replacements: replacements
            }
        }
    },
    rest: {
        apiServer: '',
        authorization: 'Bearer 80c49e7b-77cc-428e-b8f3-5f2ded12dff4',
    },
    logging: {
        global: 'DEBUG'
    },
    userInactivityInterval: 2000
};

const dependencies = {};

class Player extends React.Component {

  static propTypes = {
    assetId: React.PropTypes.number
  };

  componentDidMount() {
    if (window.vimond.player) {
      const assetId = this.props.assetId || query.assetId || 1072795;

      player.insert({
              autoplay: false,
              assetId: assetId
          },
          {
              mainContainer: this.playerContainer,
              // videoElement: "videoElement"
          },
          config,
          dependencies)
                  .done(function (playerApi) {
                      window.playerApi = playerApi;
          }, function(err) {
              console.error('Player insert failed.', err);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.assetId && nextProps.assetId !== this.props.assetId) {
      const assetId = nextProps.assetId;
      player.insert({
              autoplay: false,
              assetId: assetId
          },
          {
              mainContainer: this.playerContainer,
              // videoElement: "videoElement"
          },
          config,
          dependencies)
                  .done(function (playerApi) {
                      window.playerApi = playerApi;
          }, function(err) {
              console.error('Player insert failed.', err);
      });
    }
  }

  render() {
    return (
      <div className="playerContainer" ref={c => { this.playerContainer = c; }}/>
    );
  }

}

export default Player;
