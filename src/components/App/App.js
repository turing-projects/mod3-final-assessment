import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl, deleteUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      error: null,
    }
  }

  componentDidMount() {
    this.fetchUrls()
  }

  fetchUrls = () => {
    getUrls()
    .then(data => this.setState({ urls: [...data.urls] }))
    .catch(err => {
      console.error(err)
      this.setState({ error: JSON.stringify(err) })
    })
  }

  submitUrl = (info) => {
    postUrl(info.urlToShorten, info.title)
      .then(data => this.fetchUrls())
      .catch(err => {
        console.error(err)
        this.setState({ error: JSON.stringify(err) })
      })
  }

  handleDelete = (id) => {
    deleteUrl(id)
      .then(() => this.fetchUrls())
      .catch(err => {
        console.error(err)
        this.setState({ error: err })
      })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm 
          submitUrl={this.submitUrl}
          error={this.state.error}
          />
        </header>

        <UrlContainer 
          urls={this.state.urls} 
          handleDelete={this.handleDelete}
          error={this.state.error}
        />
      </main>
    );
  } 
}


export default App;
