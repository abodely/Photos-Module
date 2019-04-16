import React from 'react';
import { shallow } from 'enzyme';
import Carousel from '../../../../client/src/components/carousel';


describe('Carousel', () => {
  const wrapper = shallow(<Carousel />);
  test('Should render', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Should contain div', () => {
    expect(wrapper.find('div')).toExist();
  });
});
