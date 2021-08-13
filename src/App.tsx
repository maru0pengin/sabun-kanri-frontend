import React, { Component } from 'react';
import './App.css';
import DropZone from './utils/DropZone';
import { DropDirectory } from './components/DropDirectory'

const PSD = require('psd.js')

class App extends Component<{},{ text: string, imgSrc1: string, top: string, left: string, imgSrc2: string, imgSrc3: string }> {
  constructor(props: any) {
    super(props);

    this.state = {
      text: '',
      imgSrc1: '',
      top: '',
      left: '',
      imgSrc2: '',
      imgSrc3: '',
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
    
    PSD.fromURL("https://filedrive.github.io/pen/mask-min.psd").then((psd: any) => {
      //console.log(psd.image)
      //console.log(psd.tree().childrenAtPath('Seal')[0].toPng())
      //console.log(psd.tree().descendants()[0].layer)
      var data = psd.tree().descendants()[0].layer.image.file.data
      var b64 = "data:image/png;base64," + btoa(String.fromCharCode.apply(data));

      let test: any = psd.image.toBase64()
      //let test = b64
    })
  }

  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  }

  onDrop(evt: any) {
    PSD.fromEvent(evt).then(function (psd: any) {
      console.log(psd.tree().export());
    }).catch((err:any) => {
      console.log(err)
    });
  }

  handleDragOver = (e: any) => {
    console.log("DragOver")
    e.stopPropagation()
    e.preventDefault()
  }

  handleDrop = async(e: any) => {
    console.log("Drop")

    let psd = await PSD.fromEvent(e)
    let layer1 = psd.tree().descendants()[0].layer
    let url = layer1.image.toBase64()
    this.setState({ imgSrc1: url ,top: layer1.top, left: layer1.left})



    url = psd.tree().descendants()[1].layer.image.toBase64()
    this.setState({ imgSrc2: url })
    url = psd.tree().descendants()[2].layer.image.toBase64()
    this.setState({ imgSrc3: url })
    e.stopPropagation()
    e.preventDefault()
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          
          <img src={this.state.imgSrc3} style={{ position: "absolute" }}/>
          <img src={this.state.imgSrc2} style={{ position: "absolute" }}/>
          <img src={this.state.imgSrc1} style={{ position: "absolute" }}/>

          <div onDragOver={this.handleDragOver} onDrop={this.handleDrop}>ここへPSDをドロップ</div>
          {/* <DropZone />
          <DropDirectory/> */}
        </header>
      </div>
    );
  }
}

export default App;
