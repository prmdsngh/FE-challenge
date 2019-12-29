import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Footer from './Footer';

function setup() {
  const props = {};

  const renderer = TestUtils.createRenderer();
  renderer.render(<Footer {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props,
    output
  };
}

describe('components', () => {
  describe('Footer', () => {
    it('should render Footer', () => {
      const {output} = setup();
      expect(output.type).toBe('footer');
      expect(output.props.className).toBe('footer');
    });

    it('should display text content', () => {
      const {output} = setup();
      const subChildren = output.props.children.props.children;
      expect(subChildren.length).toBe(2);
      expect(subChildren[0]).toBe('Coding Problem - ');
    });
  });
});
