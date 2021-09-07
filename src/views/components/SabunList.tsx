
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
  const [canvasSize, setCanvasSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 })
  
  const [update, setUpdata] = useState<boolean>(false)
  
  let scale: number = 1
  const width = 300

  console.log("再レンダリング")

  const showList = async () => {
    let psd = await PSD.fromURL(props.psdUrl)
    let layerNum = psd.tree().children().length
    scale = psd.header.cols / width
    let _canvasSize = { width: psd.header.cols / scale, height: psd.header.rows / scale }
    setCanvasSize(_canvasSize)
    let _list:LayerType[][] = list
    let _layers: LayerType[] = []
    for (let j = 0; j < 3; j++) {
      for (let i = layerNum - 1; i >= 0; i--) {
        let layer
        if (psd.tree().children()[i]._children.length > 0) {
          layer = psd.tree().children()[i].children()[j].layer
        } else {
          layer = psd.tree().children()[i].layer
        }
        let url = layer.image.toBase64()
        _layers = _layers.concat({ url: url, top: layer.top / scale, left: layer.left / scale, width: layer.width / scale })
      }
      _list[j] = _layers
    }
    
    setList(_list)
    console.log("うに丼")
    console.log(_list)
    //ToDo: 強制再レンダリングをしない方法を調べる
    setUpdata(update?false:true)
  }
  return (
    <div>
      <button onClick={showList}>リスト表示</button>

      {list.map((layers, i) => {
        return (<div style={{ position: "relative", backgroundColor: "red", marginTop: "50px", width: canvasSize.width, height: canvasSize.height }}>{layers.map((layer,j) => {
          return (
            < img width = { layer.width / scale } key = {`${i}+${j}`} src = { layer?.url
            } style = {{ position: "absolute", top: layer?.top, left: layer?.left, maxWidth: "500px" }} />
        )})}</div>)
      })}
    </div>
  );
}

export { SabunList }