import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    const { store } = this.props;
    return { store };
  }

  render() {
    const { children } = this.props;
    return (
      <div>{ children }</div>
    );
  }
}

Provider.propTypes = {
  store: PropTypes.object,
  children: PropTypes.any,
};

Provider.childContextTypes = {
  store: PropTypes.object,
};

export default Provider;
