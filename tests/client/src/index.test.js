import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from '../../../client/src/components/carousel';

require('../../../client/src/index');

jest.mock('react-dom');

test('Should render correctly', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Carousel />, div);
});
