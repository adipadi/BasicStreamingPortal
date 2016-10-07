import React from 'react';

class Loader extends React.Component {

  render() {
    return (
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
    );
  }

}

export default Loader;
