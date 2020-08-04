import React from 'react';
import UrlContainer from './UrlContainer';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('UrlContainer', () => {

  const mockUrls = [
    {
      
    }
  ]

  it('should render correctly when passed an array of url objects', () => {
    const { getByText } = render(<UrlContainer urls={}/>)
  });

});