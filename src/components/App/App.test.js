import React from 'react';
import App from './App';

import { render, waitFor, fireEvent, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { getUrls, postUrl, deleteUrl } from '../../apiCalls';
jest.mock('../../apiCalls');

describe('App', () => {

  const mockGetUrlsOne = { urls: [
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
  ]};

  const mockPostUrl = { id: 3, long_url: 'test url', short_url: 'short url', title: 'mock url 3'};

  const mockGetUrlsTwo = { urls: [
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
    { id: 3, 
      long_url: 'test url', 
      short_url: 'short url', 
      title: 'mock url 3'
    }
  ]};

  it('should render the header', () => {
    getUrls.mockResolvedValueOnce(mockGetUrlsOne);
    const { getByText } = render(<App />);

    expect(getByText('URL Shortener')).toBeInTheDocument();
  });

  it('should render urls from the API', async() => {
    getUrls.mockResolvedValueOnce(mockGetUrlsOne);
    const { getByText } = render(<App />);

    const longurl = await (waitFor(() => getByText('thisisalongurl.com/this-is-a-long-url-it-is-so-long-oh-my-god')));

    expect(longurl).toBeInTheDocument();
    expect(await waitFor(() => getByText('shorturl.com/shorturl'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('mock url 1'))).toBeInTheDocument();
  });

  it('should render new url on form submission', async () => {
    getUrls.mockResolvedValueOnce(mockGetUrlsOne);
    postUrl.mockResolvedValueOnce(mockPostUrl)
    getUrls.mockResolvedValueOnce(mockGetUrlsTwo);

    const { getByPlaceholderText, getByRole, getByText } = render(<App />);

    expect(await waitFor(() => getByText('mock url 1'))).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText('Title...'), {
      target: {value: 'test title'}
    });
    fireEvent.change(getByPlaceholderText('URL to Shorten...'), {
      target: {value: 'test url'}
    });
    fireEvent.click(getByRole('button', {name: 'Shorten Please!'}));

    expect(await waitFor(() => getByText('mock url 3'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('test url'))).toBeInTheDocument();
  });

  it('should be able to delete a url', async () => {
    getUrls.mockResolvedValueOnce(mockGetUrlsTwo);
    deleteUrl.mockResolvedValueOnce();
    getUrls.mockResolvedValueOnce(mockGetUrlsOne);

    const { getByTestId, getByText, queryByText } = render(<App />);

    expect(await waitFor(() => getByText('mock url 3'))).toBeInTheDocument();

    fireEvent.click(getByTestId('delete3'));

    expect(await waitFor(() => queryByText('mock url 3'))).not.toBeInTheDocument();
  });

  it('should return an error if the get fails', () => {
    getUrls.mockRejectedValueOnce('Couldn\'t get URLS');

    const { getByTestId, getByText, queryByText } = render(<App />);

  });

});