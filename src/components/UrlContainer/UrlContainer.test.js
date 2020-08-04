import React from 'react';
import UrlContainer from './UrlContainer';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('UrlContainer', () => {

  const mockUrls = [
    {
      id: 1,
      long_url: 'thisisalongurl.com/this-is-a-long-url-it-is-so-long-oh-my-god',
      short_url: 'shorturl.com/haha-shorturl',
      title: 'mock url 1'
    },
    {
      id: 2,
      long_url: 'thisisalongurl.com/this-is-a-long-url-it-is-so-long-oh-my-god-this-one-is-longer-oh-god-help',
      short_url: 'shorturl.com/shorturl',
      title: 'mock url 2'
    },
  ]

  it('should render correctly when passed an array of url objects', () => {
    const { getByText } = render(<UrlContainer urls={mockUrls}/>);

    expect(getByText('thisisalongurl.com/this-is-a-long-url-it-is-so-long-oh-my-god')).toBeInTheDocument();
    expect(getByText('shorturl.com/haha-shorturl')).toBeInTheDocument();
    expect(getByText('mock url 1')).toBeInTheDocument();

    expect(getByText('thisisalongurl.com/this-is-a-long-url-it-is-so-long-oh-my-god-this-one-is-longer-oh-god-help')).toBeInTheDocument();
    expect(getByText('shorturl.com/shorturl')).toBeInTheDocument();
    expect(getByText('mock url 2')).toBeInTheDocument();
  });

  it('should render correctly when not passed an array of url objects', () => {
    const { queryByText, getByText } = render(<UrlContainer urls={[]}/>);

    expect(getByText('No urls yet! Find some to shorten!')).toBeInTheDocument();

    expect(queryByText('mock url 1')).not.toBeInTheDocument();
    expect(queryByText('mock url 2')).not.toBeInTheDocument();
  });

});