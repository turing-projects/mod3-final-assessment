import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: []
    }
  }

  componentDidMount() {
    getUrls()
    .then(data => this.setState({ urls: [...this.state.urls, data.urls[0]] }))
    .catch(err => console.error(err))
  }

  submitUrl = (info) => {
    postUrl(info.urlToShorten, info.title)
      .then(data => this.setState({ urls: [...this.state.urls, data] }))
      .catch(err => console.error(err))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm submitUrl={this.submitUrl}/>
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
