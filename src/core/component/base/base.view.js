const normalizeView = viewComponent => {
  const type = typeof viewComponent;

  if (type === 'function') {
    return viewComponent;
  }

  return viewComponent.view;
};

/* eslint func-names: ["error", "never"]*/
export const view = viewComponent => target => {
  target.prototype.render = function() {
    let normalized = normalizeView(viewComponent);

    return normalized(this.model, this.handler);
  };

  return target;
};
