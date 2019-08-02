import React from 'react';
import { shallow } from 'enzyme';
import ShallowComponet from './ShallowComponet';

it('renders without crashing 2', () => {
  shallow(<ShallowComponet />);
});
