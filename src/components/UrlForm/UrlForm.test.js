import React from 'react';
import UrlForm from './UrlForm';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('UrlForm', () => {

  it('should render correctly', () => {
    const { getByRole, getByPlaceholderText } = render(<UrlForm />);

    expect(getByRole('button', {name: 'Shorten Please!'})).toBeInTheDocument();
    expect(getByPlaceholderText('Title...')).toBeInTheDocument();
    expect(getByPlaceholderText('URL to Shorten...')).toBeInTheDocument();
  });

  it('should be able to change the inputs', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(<UrlForm />);

    fireEvent.change(getByPlaceholderText('Title...'), {
      target: {value: 'test title'}
    });
    fireEvent.change(getByPlaceholderText('URL to Shorten...'), {
      target: {value: 'test url'}
    });

    expect(getByDisplayValue('test title')).toBeInTheDocument();
    expect(getByDisplayValue('test url')).toBeInTheDocument();
  });

  it('should be able to submit the form', () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByRole } = render(
      <UrlForm 
        submitUrl={mockSubmit}
      />)
      ;

    fireEvent.change(getByPlaceholderText('Title...'), {
      target: {value: 'test title'}
    });
    fireEvent.change(getByPlaceholderText('URL to Shorten...'), {
      target: {value: 'test url'}
    });

    fireEvent.click(getByRole('button', {name: 'Shorten Please!'}));

    expect(mockSubmit).toBeCalledTimes(1);
    expect(mockSubmit).toBeCalledWith({"title": "test title", "urlToShorten": "test url"});
  });

});