import React, { Component } from 'react';
import './App.css';
import DropZone from './utils/DropZone';
import { DropDirectory } from './components/DropDirectory'

const PSD = require('psd.js')

class App extends Component<{}, { text: string, layers: {url: string,top: string,left: string}[], canvasWidth:number }> {
  constructor(props: any) {
    super(props);

    this.state = {
      text: '',
      layers: [],
      canvasWidth: 0
    };
  }

  async componentDidMount() {
    const fetchInit = {
      method: "GET",
      headers: { "content-type": "application/json" }
    };
    let url:string = new URL("hello_world", process.env.REACT_APP_SERVER_URL).toString()
    fetch(url, fetchInit)
      .then(response => response.json())
      .then(response => this.setState(response));
  }

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  }

  handleDragOver = (e: any) => {
    console.log("DragOver")
    e.stopPropagation()
    e.preventDefault()
  }

  handleDrop = async(e: any) => {

    let psd = await PSD.fromEvent(e)
    let layerNum = psd.tree().descendants().length
    let canvasWidth = psd.header.cols
    for (let i = layerNum-1; i >= 0; i--){
      let layer = psd.tree().descendants()[i].layer
      let url = layer.image.toBase64()
      this.setState({ layers: this.state.layers.concat([{ url: url ,top: layer.top, left: layer.left}]) })
    }
    this.setState({ canvasWidth: canvasWidth })
    e.stopPropagation()
    e.preventDefault()
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          
          <div onDragOver={this.handleDragOver} onDrop={this.handleDrop}>ここへPSDをドロップ</div>
          <div style={{ position: "relative" ,backgroundColor: "red" ,marginTop: "50px", width: this.state.canvasWidth}}>
            {/* <img src={this.state.imgSrc3} style={{ position: "absolute", top:this.state.top, left:this.state.left}}/>
            <img src={this.state.imgSrc2} style={{ position: "absolute" }}/>
            <img src={this.state.imgSrc1} style={{ position: "absolute" }}/> */}
            {this.state.layers.map(layer => {
              return <img src={layer?.url} style={{ position: "absolute", top:layer?.top, left:layer?.left, maxWidth: "500px"}}/>
            })}
          </div>

          {/* <DropZone />
          <DropDirectory/> */}
        </header>
      </div>
    );
  }
}

export default App;
