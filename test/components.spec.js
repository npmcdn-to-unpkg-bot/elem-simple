/* eslint react/no-multi-comp: 0, react/prop-types: 0, react/jsx-boolean-value: 0 */

import * as React from '../src/index';
import { isFunction } from '../src/utils';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('elem-simple : components', () => {
  it('should be able to wrap other components easily', () => {
    const Item = (props) => <li className="item">{props.value}</li>;
    const Conditional = (props) => {
      if (props.condition === true) {
        return props.children[0];
      } if (isFunction(props.condition) && props.condition()) {
        return props.children[0];
      } else {
        return null;
      }
    };
    const App = () => {
      return (
        <ul>
          <Conditional condition={true}><Item value="Item 1" /></Conditional>
          <Conditional condition={false}><Item value="Item 2" /></Conditional>
          <Conditional condition={() => true}><Item value="Item 3" /></Conditional>
          <Conditional condition={() => true}><Item value="Item 4" /></Conditional>
        </ul>
      );
    };
    const app = React.render(App, document.getElementById('app'));
    const ul = document.querySelector('ul');
    const children = ul.childNodes;
    expect(children.length).to.be.equal(3);
    expect(children[0].innerHTML).to.be.equal('Item 1');
    expect(children[0].tagName).to.be.equal('LI');
    expect(children[0].className).to.be.equal('item');
    expect(children[1].innerHTML).to.be.equal('Item 3');
    expect(children[1].tagName).to.be.equal('LI');
    expect(children[1].className).to.be.equal('item');
    expect(children[2].innerHTML).to.be.equal('Item 4');
    expect(children[2].tagName).to.be.equal('LI');
    expect(children[2].className).to.be.equal('item');
    app.cleanup();
  });
  it('should be able to provide higher order components', () => {
    const provideStyle = (style) => (Component) => (props) => <Component {...props} commonStyle={style} />;
    const Item = (props) => <div className={['item', props.commonStyle.name]}>{props.value}</div>;
    const BootstrapItem = provideStyle({ name: 'bootstrap' })(Item);
    const MaterialItem = provideStyle({ name: 'material' })(Item);
    const App = () => {
      return (
        <div>
          <BootstrapItem value="Item 1" />
          <MaterialItem value="Item 2" />
          <BootstrapItem value="Item 3" />
          <MaterialItem value="Item 4" />
        </div>
      );
    };
    const app = React.render(App, document.getElementById('app'));
    const bootstrapDivs = [].slice.call(document.querySelectorAll('.bootstrap'));
    const materialDivs = [].slice.call(document.querySelectorAll('.material'));
    expect(bootstrapDivs.length).to.be.equal(2);
    expect(materialDivs.length).to.be.equal(2);
    expect(bootstrapDivs[0].innerHTML).to.be.equal('Item 1');
    expect(bootstrapDivs[1].innerHTML).to.be.equal('Item 3');
    expect(materialDivs[0].innerHTML).to.be.equal('Item 2');
    expect(materialDivs[1].innerHTML).to.be.equal('Item 4');
    app.cleanup();
  });
});