import React from 'react';

class Loader extends React.Component {

  render() {
    const title = this.props.title || null;
    return (
      <div className="loader-wrapper">
        <h3>{this.props.title}</h3>
        <div className="cs-loader">
          <div className="cs-loader-inner">
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
            <label>	●</label>
          </div>
        </div>
      </div>

    );
  }

}

export default Loader;
