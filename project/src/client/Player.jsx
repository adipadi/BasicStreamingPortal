import React from 'react';

const replacements = [{
  match: /("avc1\.4d001f")+/g,
  replacement: '"avc1.4d401f"'
}, {
  match: /("avc1\.42001e")+/g,
  replacement: '"avc1.42801e"'
}, {
  match: /<Representation id="p0a1r1"(.|\n)*?<\/Representation>/m,
  replacement: ' '
}];

const config = {
  videoEngine: {
    dash: {
      manifestModifier: {
        replacements
      }
    }
  },
  rest: {
    apiServer: '',
  },
  logging: {
    global: ''
  },
  userInactivityInterval: 2000
};

const dependencies = {};

class Player extends React.Component {

  static propTypes = {
    assetId: React.PropTypes.string
  };

  componentDidMount() {
    if (window.vimond.player) {
      const player = window.vimond.player;
      const assetId = this.props.assetId;

      player.insert({
        autoplay: true,
        assetId
      },
        {
          mainContainer: this.playerContainer,
        },
      config,
      dependencies)
              .done(playerApi => {
                window.playerApi = playerApi;
              }, err => {
                console.error('Player insert failed.', err);
              });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.assetId && nextProps.assetId !== this.props.assetId && window.playerApi) {
      const playerApi = window.playerApi;
      const assetId = nextProps.assetId;
      playerApi.changePlayback(assetId);
      setTimeout(() => { playerApi.start(); }, 10);
    }
  }

  render() {
    return (
      <div className="playerContainer" ref={c => { this.playerContainer = c; }}/>
    );
  }

}

export default Player;
