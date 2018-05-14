import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import { UrlUtil, IMMUTABLE_EMPTY_MAP } from '../../utility';

export const passThroughFunction = (input) => input;

/**
 * Validate the passed down options object of the connectUrl decorator
 *
 * @param {Object} options The connectUrl options
 * @return {Void}
 */
export const validateOptions = (options) => {
  if (!_.isPlainObject(options)) {
    throw Error('The options must be a plain object');
  }

  const { composer, decomposer, isCached } = options;

  if (!_.isUndefined(composer) && !_.isFunction(composer)) {
    throw Error('The composer must be a function');
  }

  if (!_.isUndefined(decomposer) && !_.isFunction(decomposer)) {
    throw Error('The decomposer must be a function');
  }

  if (!_.isUndefined(isCached) && !_.isBoolean(isCached)) {
    throw Error('The isCached must be a boolean');
  }
};

/**
 * Validate the passed down property name of the connectUrl decorator
 *
 * @param {Object} propName The connectUrl property name
 * @return {Void}
 */
export const validatePropertyName = (propName) => {
  if (!_.isString(propName) || _.isEmpty(propName)) {
    throw Error("The passed down property's name must be a string");
  }
};

/**
 * Sanitize the options object of the connectUrl decorator
 *
 * @param {Object} options The connectUrl options
 * @return {Object} The sanitized options object
 */
export const sanitizeOptions = (options) => {
  const {
    composer = passThroughFunction,
    decomposer = passThroughFunction,
    isCached = false
  } = options;

  return { composer, decomposer, isCached };
};

/**
 * A decorator for component, it will pass down a property contains the parsed value from the URL queries.
 * The passed property contains the following methods:
 *  - get():{Object} Get the parsed value from the URL queries.
 *  - set(value:{Object}, newPath=null:{String}):{Void} Set the URL queries to be the stringified value
 *    of the passed 'value', and reroute if needed. The 'newPath' is the path that it should take on reroute.
 *  - isChanged():{Boolean} Whether the URL is changed since the last time this method is called.
 *
 * @param {String} propName='queries' The name of the property the decorated component will receive
 * @param {Object} options={ composer, decomposer, isCached } The options of the decorator:
 *                      - {Function} composer A function receive the plain object parsed from
 *                        the URL queries and compose it into a value that the decorated component understands.
 *                        The output value should be matched with the 'decomposer' input for consistency.
 *                      - {Function} composer A function receive a object from the decorated component
 *                        and decompose it into a plain object for stringify onto URL queries.
 *                        The input value should be matched with the 'composer' output for consistency.
 *                      - {Boolean} isCached If set to true, when the passed property is set,
 *                        the decorator will not reroute if there is no changes.
 *                        Otherwise, it will always reroute on set.
 * @return {Function} The actual decorator method
 */
export const connectUrl = (propName = 'queries', options = {}) => {
  validatePropertyName(propName);
  validateOptions(options);

  const sanitizedOptions = sanitizeOptions(options);

  return (WrappedComponent) => {
    return class UrlQueriesReader extends React.Component {
      /**
       * Constructor
       * @param  {Object} props         Props
       * @return {Void}
       */
      constructor(props) {
        super(props);

        this.WrappedComponent = WrappedComponent;
        this.state = {
          lastComparedQueriesString: null,
          cachedQueriesString: null,
          cachedQueriesObject: IMMUTABLE_EMPTY_MAP,
          cachedComposedQueriesObject: IMMUTABLE_EMPTY_MAP
        };
      }

      /**
        * Context
        */
      static contextTypes = {
        router: PropTypes.object.isRequired
      };

      /**
       * Get the object parsed from URL query
       *
       * @param {String} queriesString=this.context.router.history.location.search The current URL queries string
       * @return {Object} The parsed object
       */
      getComposedQueriesObject = (queriesString = this.context.router.history.location.search) => {
        if (queriesString === this.state.cachedQueriesString) {
          return this.state.cachedComposedQueriesObject.toJS();
        }

        const queriesObject = UrlUtil.parse(queriesString);
        const composedQueriesObject = sanitizedOptions.composer(queriesObject);

        return composedQueriesObject;
      }

      /**
       * Calculate the URL queries from the object data
       *
       * @param {Object} queriesObject The input object
       * @param {Boolean} isPatching Patch the original values or override it
       * @return {String} The calculated URL queries
       */
      calculateQueriesString = (queriesObject, isPatching = false) => {
        const { cachedComposedQueriesObject, cachedQueriesObject, cachedQueriesString } = this.state;
        const [
          convertedCachedComposedQueriesObject,
          convertedCachedQueriesObject
          ]
          = [
            cachedComposedQueriesObject.toJS(),
            cachedQueriesObject.toJS()
          ];
        const isCached = sanitizedOptions.isCached;
        const patchedObject = isPatching
          ? { ...convertedCachedComposedQueriesObject, ...queriesObject }
          : queriesObject;

        let newQueriesString = cachedQueriesString;

        if (!isCached || !_.isEqual(patchedObject, convertedCachedComposedQueriesObject)) {
          const decomposedObject = sanitizedOptions.decomposer(patchedObject);

          if (!isCached || !_.isEqual(decomposedObject, convertedCachedQueriesObject)) {
            newQueriesString = UrlUtil.stringify(decomposedObject);
          }
        }

        return `?${newQueriesString}`.replace('??', '?');
      }

      /**
       * Route to a specific URL parsed from the input object
       *
       * @param {String} queriesObject The input object
       * @param {String} path The new path of the route
       * @param {Boolean} isPatching Patch the original values or override it
       * @return {Void}
       */
      processRoute = (queriesObject, path = null, isPatching = false) => {
        const { push, location: { pathname, search }} = this.context.router.history;
        const newQueriesString = this.calculateQueriesString(queriesObject, isPatching);
        const isQueryChanged = newQueriesString !== search;
        const isPathChanged = path && !_.endsWith(pathname, path);

        if (!sanitizedOptions.isCached || isPathChanged || isQueryChanged) {
          const newQueries = isQueryChanged ? newQueriesString : search;
          const newPath = isPathChanged ? path : pathname;

          push(`${newPath}${newQueries}`);
        }
      }

      /**
       * Route with queriesObject merge with the current queries
       *
       * @param {String} queriesObject The input object
       * @param {String} path The new path of the route
       * @return {Void}
       */
      patchRoute = (queriesObject, path) => {
        this.processRoute(queriesObject, path, true);
      }

      /**
       * Route with queriesObject replace with the current queries
       *
       * @param {String} queriesObject The input object
       * @param {String} path The new path of the route
       * @return {Void}
       */
      setRoute = (queriesObject, path) => {
        this.processRoute(queriesObject, path, false);
      }

      /**
       * Check if the URL queries is changed since the last compare
       *
       * @param {String} newQueriesString=this.context.router.history.location.search Current URL queries string
       * @param {String} oldQueriesString=this.state.lastComparedQueriesString Last compared URL queries string
       * @return {Boolean} true, if the queries is changed; false, otherwise
       */
      checkQueriesChanged = (
        newQueriesString = this.context.router.history.location.search,
        oldQueriesString = this.state.lastComparedQueriesString
      ) => {
        if (newQueriesString === oldQueriesString) return false;

        this.setState({
          lastComparedQueriesString: newQueriesString
        });

        return true;
      }

      /**
       * Update the cache of the parsed URL queries
       *
       * @return {Void}
       */
      updateQueriesCache = () => {
        const { search: queriesString } = this.context.router.history.location;

        if (queriesString !== this.state.cachedQueriesString) {
          const queriesObject = UrlUtil.parse(queriesString);
          const composedObject = sanitizedOptions.composer(queriesObject);

          this.setState({
            cachedQueriesString: queriesString,
            cachedQueriesObject: Immutable.fromJS(queriesObject),
            cachedComposedQueriesObject: Immutable.fromJS(composedObject)
          });
        }
      }

      /**
      * Handle when component mount
      *
      * @return {Void}
      */
      componentWillMount() {
        this.updateQueriesCache();
      }

      /**
      * Handle when component receive props
      *
      * @return {Void}
      */
      componentWillReceiveProps() {
        this.updateQueriesCache();
      }

      /**
       * Render component
       * @return {Component}      React component
       */
      render() {
        const queriesObject = {
          isChanged: this.checkQueriesChanged,
          get: this.getComposedQueriesObject,
          set: this.setRoute,
          patch: this.patchRoute
        };
        const props = Object.assign({}, this.props, { [propName]: queriesObject });

        return <this.WrappedComponent { ...props }/>;
      }
    };
  };
};
