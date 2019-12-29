import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from './Header';
// import TodoTextInput from './TodoTextInput';

function setup() {
  const props = {
    addTodo: jasmine.createSpy()
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Header {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('component', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const {output} = setup();
      expect(output.type).toBe('div');
      expect(output.props.children.length).toBe(2);
      const [header, h1] = output.props.children;
      expect(header.type).toBe('header');
      expect(header.props.className).toBe('header');
      expect(h1.type).toBe('h1');
      expect(h1.props.children).toBe('FINDING FALCON!');
    });

    it('nav bar list items correctly rendered', () => {
      const {output} = setup();
      const [header] = output.props.children;
      const ul = header.props.children.props.children;
      expect(ul.length).toBe(2);
    });
  });
});
