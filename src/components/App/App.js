import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl, deleteUrl } from '../../apiCalls';
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
    this.fetchUrls()
  }

  fetchUrls = () => {
    getUrls()
    .then(data => this.setState({ urls: [...data.urls] }))
    .catch(err => console.error(err))
  }

  submitUrl = (info) => {
    postUrl(info.urlToShorten, info.title)
      .then(data => this.setState({ urls: [...this.state.urls, data ]}))
      .catch(err => console.error(err))
  }

  handleDelete = (id) => {
    deleteUrl(id)
      .then(() => this.fetchUrls())
      .catch(err => console.error(err))
  }

  render() {
    console.log(this.state.urls);
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm submitUrl={this.submitUrl}/>
        </header>

        <UrlContainer urls={this.state.urls} handleDelete={this.handleDelete}/>
      </main>
    );
  }
}

export default App;
