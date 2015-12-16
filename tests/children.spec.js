/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0, react/no-multi-comp: 0, react/prop-types: 0, react/jsx-boolean-value: 0 */

import * as React from '../src/index';
import chai, { expect } from 'chai';

describe('elem-simple : children', () => {
  it('should handle components with children', () => {
    const Item = (props) => <li className="item">{props.value}</li>;
    const Wrapper = (props) => <ul className="wrapper">{props.children}</ul>;
    const App = (props) => {
      return (
        <Wrapper>
          <Item value="Item 1" />
          <Item value="Item 2" />
          <Item value="Item 3" />
        </Wrapper>
      );
    };
    const app = React.render(App, document.getElementById('app'));
    const ul = document.querySelector('ul');
    const children = ul.childNodes;
    expect(ul.className).to.be.equal('wrapper');
    expect(children.length).to.be.equal(3);
    expect(children[0].innerHTML).to.be.equal('Item 1');
    expect(children[0].tagName).to.be.equal('LI');
    expect(children[0].className).to.be.equal('item');
    expect(children[1].innerHTML).to.be.equal('Item 2');
    expect(children[1].tagName).to.be.equal('LI');
    expect(children[1].className).to.be.equal('item');
    expect(children[2].innerHTML).to.be.equal('Item 3');
    expect(children[2].tagName).to.be.equal('LI');
    expect(children[2].className).to.be.equal('item');
    app.cleanup();
  });
});