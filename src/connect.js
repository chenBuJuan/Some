import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default (mapStateToProps, mapDispatchToProps) => (Wrapper) => {
  class Connect extends Component {
    constructor(props) {
      super(props);
      this.state = {
        props: {},
      };
      this.updateProps = this.updateProps.bind(this);
    }

    componentWillMount() {
      this.updateProps();
      const { store } = this.context;
      store.subscribe(this.updateProps);
    }

    updateProps() {
      const { store } = this.context;
      const stateProps = mapStateToProps
        ? mapStateToProps(store.getState())
        : {};
      const dispatchProps = mapDispatchToProps
        ? mapDispatchToProps(store.dispatch)
        : {};
      this.setState({
        props: {
          ...stateProps,
          ...dispatchProps,
        },
      });
    }

    render() {
      const { props } = this.state;
      return <Wrapper {...props} />;
    }
  }

  Connect.contextTypes = {
    store: PropTypes.object,
  };

  return Connect;
};
