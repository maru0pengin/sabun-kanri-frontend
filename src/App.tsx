import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const PSD = require('psd.js')

class App extends Component<{},{ text: string }> {
  constructor(props: any) {
    super(props);

    this.state = {
      text: ''
    };
  }

  async componentDidMount() {
    let psd = await PSD.fromURL("https://filedrive.github.io/pen/mask-min.psd")
    console.log(psd)
    const fetchInit = {
      method: "GET",
      headers: { "content-type": "application/json" }
    };
    let url:string = new URL("hello_world", process.env.REACT_APP_SERVER_URL).toString()
    fetch(url, fetchInit)
      .then(response => response.json())
      .then(response => this.setState(response));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Response: {this.state.text}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
