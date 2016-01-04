/* eslint react/no-multi-comp: 0, react/prop-types: 0, react/jsx-boolean-value: 0 */

import * as React from '../src/index';
import { expect } from 'chai';
import { describe, it } from 'mocha';

class ComponentWithState extends React.Component {
  constructor(props) {
    super(props);
    const copy = { ...this.props };
    this.state = copy.$$state || this.getInitialState();
    delete copy.$$state;
    this.props = copy;
    this.replaceState = (ns) => props.myself.redraw({ ...copy, $$state: ns });
    this.setState = (ns) => this.replaceState({ ...this.state, ...ns });
  }
}

class Clicker extends ComponentWithState {
  constructor(props) {
    super(props);
  }
  getInitialState() {
    return {
      counter: 1,
    };
  }
  render() {
    return (
      <h1 id="h1" onClick={() => this.setState({ counter: this.state.counter + 1 })}>
        You have clicked {this.state.counter} times
      </h1>
    );
  }
}

describe('elem-simple : state test', () => {
  it('should be able to provide simple positional states', () => {
    const app = React.render(<Clicker/>, document.getElementById('app'));
    let h1 = document.getElementById('h1');
    expect(h1.innerHTML).to.be.equal('You have clicked 1 times');
    h1.click();
    h1 = document.getElementById('h1');
    expect(h1.innerHTML).to.be.equal('You have clicked 2 times');
    h1.click();
    h1 = document.getElementById('h1');
    expect(h1.innerHTML).to.be.equal('You have clicked 3 times');
    app.cleanup();
  });
});