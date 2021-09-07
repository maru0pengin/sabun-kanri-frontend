
import React from "react";
import { useState, useEffect } from 'react';
const PSD = require('psd.js')

interface SabunListProps {
  psdUrl: string
}

interface LayerType {
  url: string,
  top: number,
  left: number
  width: number
}

const SabunList: React.FC<SabunListProps> = (props) => {
  const [list, setList] = useState<LayerType[][]>([[]])
  const [layers, setlayers] = useState<LayerType[]>([])
  const [canvasSize, setCanvasSize] = useState<{ width: number, height: number }>({width:0,height:0})
  const [test, setTest] = useState<string[]>(["a","b"])
  let scale:number = 1

  const showList = async() => {
    let psd = await PSD.fromURL(props.psdUrl)
    let layerNum = psd.tree().children().length
    scale = psd.header.cols / 300
    let _canvasSize = { width: psd.header.cols / scale, height: psd.header.rows / scale }
    let _list:LayerType[][] = list
    let _layers:LayerType[] = []
    for (let i = layerNum - 1; i >= 0; i--) {
      let layer
      if (psd.tree().children()[i]._children.length > 0) {
        //console.log(`下から${i + 1}番目の要素はディレクトリです`)
        layer = psd.tree().children()[i].children()[0].layer
      } else {
        layer = psd.tree().children()[i].layer
        //console.log(`下から${i + 1}番目の要素はレイヤーです`)
      }
      let url = layer.image.toBase64()
      _layers = _layers.concat({ url: url, top: layer.top/scale, left: layer.left/scale, width: layer.width/scale })
    }
    //setlayers(_layers)
    setCanvasSize(_canvasSize)

    
    _list[0] = _layers
    console.log(`_layers${_layers}`)
    console.log(_list)
    setList(_list)
  }
  return (
    <div>
      <button onClick={showList}>リスト表示</button>
      {/* <div style={{ position: "relative", backgroundColor: "red", marginTop: "50px", width: canvasSize.width, height: canvasSize.height }}>
        test
        {layers.map((layer,i) => {
          return <img width={layer.width/scale} key={i} src={layer?.url} style={{ position: "absolute", top:layer?.top, left:layer?.left, maxWidth: "500px"}}/>
        })}
      </div>
       */}
      {/* {list.map((layers, i) => {
        return (
          <div style={{ position: "relative", backgroundColor: "red", marginTop: "50px", width: canvasSize.width, height: canvasSize.height }}>
            { layers.map((layer, j) => {
              return (
                test < img width = { layer.width / scale } key = { i * j} src = { layer?.url
              } style = {{ position: "absolute", top: layer?.top, left: layer?.left, maxWidth: "500px" }} />
            )}
          </div>
        )
      }
        )
      })} */}
      {/* {test.map((test,i) => (
          <div>{test}</div>
      ))} */}

      {list.map((layers, i) => {
        return (<div style={{ position: "relative", backgroundColor: "red", marginTop: "50px", width: canvasSize.width, height: canvasSize.height }}>{layers.map((layer,j) => {
          return (
            < img width = { layer.width / scale } key = { i * j} src = { layer?.url
            } style = {{ position: "absolute", top: layer?.top, left: layer?.left, maxWidth: "500px" }} />
        )})}</div>)
      })}
    </div>
  );
}

export { SabunList }