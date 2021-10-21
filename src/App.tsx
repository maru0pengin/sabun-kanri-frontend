// import { Component } from 'react';
// import './App.css';

// import axios from 'axios';
// const PSD = require('psd.js')

// const apiUrlBase:string = "https://sabun-kanri-backend.herokuapp.com/api/posts";

// class App extends Component<{}, { layers: {url: string,top: string,left: string}[], canvasWidth:number,psd:any }> {
//   constructor(props: any) {
//     super(props);

//     this.state = {
//       layers: [],
//       canvasWidth: 0,
//       psd: null
//     };
//   }
//   eventLogger = (e: MouseEvent, data: Object) => {
//     console.log('Event: ', e);
//     console.log('Data: ', data);
//   }

//   handleDragOver = (e: any) => {
//     console.log("DragOver")
//     e.stopPropagation()
//     e.preventDefault()
//   }

//   handleDrop = async(e: any) => {
//     let psd = await PSD.fromEvent(e)
//     console.log(e)
//     this.setState({ psd :e.target.files })
//     let layerNum = psd.tree().descendants().length
//     let canvasWidth = psd.header.cols
//     for (let i = layerNum-1; i >= 0; i--){
//       let layer = psd.tree().descendants()[i].layer
//       let url = layer.image.toBase64()
//       this.setState({ layers: this.state.layers.concat([{ url: url ,top: layer.top, left: layer.left}]) })
//     }
//     this.setState({ canvasWidth: canvasWidth })
//     e.stopPropagation()
//     e.preventDefault()
//   }

//   sendPsd = async (e: any) => {
//     var formData = new FormData()
//     formData.append('title', 'testたーとる')
//     console.log(this.state.psd)
//     formData.append('image', this.state.psd)

//     const res = await axios.post(apiUrlBase, formData
//     )

//     console.log(res)
//   }

//   setImage = (e:any) => {
//     e.preventDefault();
//     this.setState({ psd :e.target.files[0]})
//   }

//   render() {

//     return (
//       <div className="App">
//         <header className="App-header">

//           <div onDragOver={this.handleDragOver} onDrop={this.handleDrop}>ここへPSDをドロップ</div>
//           <button onClick={this.sendPsd}>保存</button>
//           <div style={{ position: "relative" ,backgroundColor: "red" ,marginTop: "50px", width: this.state.canvasWidth}}>

//             {this.state.layers.map(layer => {
//               return <img src={layer?.url} style={{ position: "absolute", top:layer?.top, left:layer?.left, maxWidth: "500px"}}/>
//             })}
//           </div>
//           <input type="file" id="image" name="image"  onChange={this.setImage} />
//           {/* <DropZone />
//           <DropDirectory/> */}
//         </header>
//       </div>
//     );
//   }
// }

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Top } from './views/pages/Top';
import { New } from './views/pages/New';
import { Detail } from './views/pages/Detail';
import Header from 'views/components/Header';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Top} />
          <Route path="/new" component={New} />
          <Route path="/detail/:id" component={Detail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
