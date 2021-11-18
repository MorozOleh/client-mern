import React, { Component } from 'react';

const asyncComponent = ({ loader, loading: Loading }) => {
  return class AsyncComponent extends Component {
    state = {
      component: null,
    };

    async componentDidMount() {
      const { default: component } = await loader();

      this.setState({ component });
    }

    render() {
      const { component: Component } = this.state;

      return Component ? <Component {...this.props} /> : <Loading />;
    }
  };
};

export default asyncComponent;
