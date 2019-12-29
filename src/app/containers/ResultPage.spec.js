import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ResultPage from './ResultPage';

function setup(store) {
  const props = Object.assign({
    status: 'success',
    time: 200,
    planet: 'planet'
  }, store);
  const renderer = TestUtils.createRenderer();
  renderer.render(<ResultPage {...store}/>);
  const output = renderer.getRenderOutput();
  return {
    props,
    output,
    renderer
  };
}

describe('ResultPage', () => {
  describe('content', () => {
    it('should render properly', () => {
      const {output} = setup();
      console.log(output());
      const content = output.props.children[1];
      expect(content.type).toBe('div');
      expect(content.props.className).toBe('MainPage');
    });

    it('renders SUCCESS result correctly', () => {
      const {output, props} = setup();
      const content = output.props.children[1].props.children;
      const [message, br, time, planet] = content;
      expect(message.props.children).toBe('Success! Congratulations on finding Falcone. King Shan is mighty Pleased.');
      expect(br.type).toBe('br');
      expect(time.props.children).toBe(`Time taken: ${props.time}`);
      expect(planet.props.children).toBe(`Planet found: ${props.planet}`);
    });

    it('renders FAILURE result correctly', () => {
      const failureProps = {
        status: 'false',
        time: 180
      };
      const {output, props} = setup(failureProps);
      const content = output.props.children[1].props.children;
      const [message, br, time, planet] = content;
      expect(message.props.children).toBe('Failure! Queen Falcone couldn\'t find be found and will come back.');
      expect(br.type).toBe('br');
      expect(time.props.children).toBe(`Time taken: ${props.time}`);
      expect(planet.props.children).toBe('Planet Not Found');
    });
  });

  it('should render HEADER', () => {
    const {output} = setup();
    const [header] = output.props.children;
    expect(header.type).toBe('header');
  });

  it('should render FOOTER', () => {
    const {output} = setup();
    const footer = output.props.children[2];
    expect(footer.type).toBe('footer');
  });
});
