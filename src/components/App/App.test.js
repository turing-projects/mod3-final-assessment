import React from 'react';
import App from './App';

import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {

  it('should render the header', () => {
    const { getByText } = render(<App />);

    expect(getByText('URL Shortener')).toBeInTheDocument();
  });

  it('should render urls from the API', async() => {
    const { getByText } = render(<App />);

    const longurl = await (waitFor(() => getByText('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')));

    expect(longurl).toBeInTheDocument();
    expect(await waitFor(() => getByText('http://localhost:3001/useshorturl/1'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('Awesome photo'))).toBeInTheDocument();
  });

  it('should render new url on form submission', async () => {
    const { getByPlaceholderText, getByRole, getByText, queryByText } = render(<App />);

    expect(await waitFor(() => getByText('Awesome photo'))).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText('Title...'), {
      target: {value: 'test title'}
    });
    fireEvent.change(getByPlaceholderText('URL to Shorten...'), {
      target: {value: 'test url'}
    });
    fireEvent.click(getByRole('button', {name: 'Shorten Please!'}));

    expect(queryByText('No urls yet! Find some to shorten!')).not.toBeInTheDocument();

    expect(await waitFor(() => getByText('test title'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('test url'))).toBeInTheDocument();
  });

});