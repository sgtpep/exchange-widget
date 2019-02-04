import { Component } from '../node_modules/preact/dist/preact.mjs';

export default (hidden, cached, render) => {
  return class extends Component {
    render(props, state, context) {
      const componentHidden = hidden(props, context);
      this.cache = componentHidden ? this.cache || {} : cached(props, context);
      return render(
        {
          ...props,
          ...this.cache,
          hidden: componentHidden,
        },
        context
      );
    }
  };
};
