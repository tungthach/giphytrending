import React from 'react';

/**
 * Higher order component that handle Async load component
 * @param  {Object} options          Parameters is passed to decorator component
 * @return {Func}                    Enhancer decorator
 */
export const asyncComponent = (options) => {
  const {
    component,
    preProcess = null,
    postProcess = null,
    initialProps = {}
  } = options;

  return class AsyncComponent extends React.Component {
    /**
     * Constructor
     * @param  {Object} props         Props
     * @return {Void}
     */
    constructor(props) {
      super(props);

      this.Component = null;
      this.state = {
        Component: AsyncComponent.Component
      };
    }

    /**
     * Handle load module error
     * @param  {String} error         Error string
     * @return {Error}                Throw Error message
     */
    loadModuleError = (error) => {
      throw new Error(`Dynamic page loading failed: ${error}`);
    };

    /**
     * Handle load module error
     * @param  {Object} module        Module object
     * @return {Func}                 Module/Class/Function
     */
    loadModule = (module) => {
      const target = module.default || module;

      typeof preProcess === 'function' && preProcess(target);
      AsyncComponent.Component = target;
      this.setState({ Component: target });
      typeof postProcess === 'function' && postProcess(target);
    };

    /**
     * Handle whenc componenWillMount
     * @return {Void}
     */
    componentWillMount() {
      if (!this.state.Component && component) {
        // Case 'bundle-loader'
        try {
          component(module => this.loadModule(module));
        }
        catch (e) {
          this.loadModuleError(e);
        }
      }
    }

    /**
     * Render component
     * @return {Component}      React component
     */
    render() {
      if (this.state.Component) {
        const props = Object.assign({}, this.props, initialProps);

        return <this.state.Component { ...props } />;
      }

      return null;
    }
  };
};
