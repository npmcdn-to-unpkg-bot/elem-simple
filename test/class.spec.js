/* eslint react/no-multi-comp: 0, react/prop-types: 0, react/jsx-boolean-value: 0 */

import { expect } from 'chai';
import { describe, it } from 'mocha';
import * as React from '../src/index';

describe('elem-simple : class', () => {
  it('should handle simple className', () => {
    const App = () => (
      <h1 className="btn">Hello World!</h1>
    );
    const app = React.render(<App />, document.getElementById('app'));
    const h1 = document.getElementsByTagName('h1')[0];
    expect(h1.getAttribute('class')).to.be.equal('btn');
    app.cleanup();
  });
  it('should handle undefined className', () => {
    const App = () => (
      <h1 className={undefined}>Hello World!</h1>
    );
    const app = React.render(<App />, document.getElementById('app'));
    const h1 = document.getElementsByTagName('h1')[0];
    expect(h1.getAttribute('class')).to.be.equal('');
    app.cleanup();
  });
  it('should handle array className', () => {
    const App = () => (
      <h1 className={['btn', 'btn-danger']}>Hello World!</h1>
    );
    const app = React.render(<App />, document.getElementById('app'));
    const h1 = document.getElementsByTagName('h1')[0];
    expect(h1.getAttribute('class')).to.be.equal('btn btn-danger');
    app.cleanup();
  });
  it('should handle object className', () => {
    const App = () => (
      <h1 className={{ btn: true, btnDanger: false, btnWarning: true }}>Hello World!</h1>
    );
    const app = React.render(<App />, document.getElementById('app'));
    const h1 = document.getElementsByTagName('h1')[0];
    expect(h1.getAttribute('class')).to.be.equal('btn btn-warning');
    app.cleanup();
  });
});
