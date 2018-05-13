import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';

import { stringToArray } from 'utility';

/**
 * BaseComponent class provide some common methods for child
 */
export class BaseComponent extends Component {
  /**
   * If has className in this.props, set it to first dom node.
   * @return {Void}
   */
  componentDidMount() {
    this.updateClassName(this.props.className);
  }

  /**
   * Component did update lifecycle
   * -> If current class differ from previous class, it'll update class.
   * @param  {Object} prevProps is previous props
   * @return {Void}
   */
  componentDidUpdate(prevProps) {
    const { className: prevClassName } = prevProps;
    const { className } = this.props;

    this.updateClassName(className, prevClassName);
  }

  /**
   * Update class for dom node
   * @param  {String} newClassName New class name
   * @param  {String} previousClassName Previous class name
   * @param  {Object} findNode=findDOMNode FindDOMNode function
   * @return {Void}
   */
  updateClassName(newClassName, previousClassName, findNode = findDOMNode) {
    let domNode = null;

    try {
      domNode = findNode(this);
    }
    catch (error) {
      return;
    }

    if (!domNode || newClassName === previousClassName) {
      return;
    }

    const previousClasses = stringToArray(previousClassName).value();
    const newDomClasses = stringToArray(domNode.className)
      .without(...previousClasses)
      .value();
    const resultClassName = stringToArray(newClassName)
      .concat(newDomClasses)
      .uniq()
      .join(' ')
      .value();

    domNode.className = resultClassName;
  }

  /**
   * Create model object by component propTypes object
   * @param  {Object} extendModel [is object to extend model from ]
   * @return {Object} [return model object]
   */
  createModel(extendModel) {
    const CHILDREN = 'children';
    const { props } = this;
    const { propTypes } = this.constructor;
    const keys = propTypes ? Object.keys(propTypes) : [];
    let result = {};

    keys.forEach(key => {
      result[key] = props[key];
    });

    // Set children property if it exists
    if (!result[CHILDREN] && props[CHILDREN]) {
      result[CHILDREN] = props[CHILDREN];
    }

    // extend model
    result = Object.assign({}, result, extendModel);

    return result;
  }

  /**
   * Create Handler base on naming convention for funtions which has prefix 'on'
   * @param  {Array | Object}   extendHandler is array or object of functions
   * @param  {Boolean} useCache is true, it will save the final handler object.
   * @return {Object}           return handler functions object
   */
  createHandler(extendHandler = null, useCache = true) {
    if (useCache && this.cachedHandler) {
      return this.cachedHandler;
    }

    let handler = {};
    let propertyNames = Object.keys(this);

    propertyNames = propertyNames.concat(Object.getOwnPropertyNames(this.constructor.prototype));

    propertyNames.forEach(funcName => {
      if (!funcName.startsWith('on')) {
        return;
      }

      let func = this[funcName];

      if (_.isFunction(func)) {
        func = _.bind(func, this);
        handler[funcName] = func;
        this[funcName] = func;
      }
    });

    const finalHandler = this.extendHandler(handler, extendHandler);

    if (useCache) {
      this.cachedHandler = finalHandler;
    }

    return finalHandler;
  }

  /**
   * Extend handler
   * @param {Object} handler is object of functions which has prefix 'on'
   * @param  {Array|Object} extendHandler is array or object of functions
   * @return {Object} return object of functions
   */
  extendHandler(handler, extendHandler) {
    if (!extendHandler) {
      return handler;
    }
    if (_.isArray(extendHandler)) {
      return this.extendArrayHandler(handler, extendHandler);
    }

    return this.extendObjectHandler(handler, extendHandler);
  }

  /**
   * Extend handler by object extendHandler
   * @param  {Object} handler       is object of functions
   * @param  {Object} extendHandler is object of functions
   * @return {Object} return handler object
   */
  extendObjectHandler(handler, extendHandler) {
    Object.keys(extendHandler).forEach(funcName => {
      let func = extendHandler[funcName];

      if (_.isFunction(func)) {
        func = _.bind(func, this);
        handler[funcName] = func;
        this[funcName] = func;
      }
    });

    return handler;
  }

  /**
   * Extend handler with array of handler
   * @param  {Object} handler       is object of functions
   * @param  {Array} extendHandler  is array of functions
   * @return {Object} return handler object
   */
  extendArrayHandler(handler, extendHandler) {
    extendHandler.forEach((method, index) => {
      if (_.isFunction(method)) {
        if (!method.name) {
          throw new Error(`class ${this.constructor.name}, index: [${index}] => createHandler():\
 Should not use arrow function for array of extend functions.`);
        }
        const { name: funcName } = method;
        const func = _.bind(method, this);

        handler[funcName] = func;
        this[funcName] = func;
      }
    });

    return handler;
  }
}
