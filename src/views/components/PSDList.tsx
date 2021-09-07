
import { group } from "console"
import React from "react";
import { useState, useEffect } from 'react';
const PSD = require('psd.js')

interface PSDListProps {
  psdUrl: string
}

interface LayerType {
  url: string,
  top: number,
  left: number
  width: number
}

const PSDList: React.FC<PSDListProps> = (props) => {
  const [layers, setlayers] = useState<LayerType[]>([])
  const [canvasWidth, setCanvasWidth] = useState<number>(0)
  
  const scale = 2

  useEffect(() => {
    if (props.psdUrl.length > 0) {
      (async () => {
        let psd = await PSD.fromURL(props.psdUrl)
        let layerNum = psd.tree().children().length
        let canvasWidth = psd.header.cols
        //console.log(psd.tree().descendants()[0].layer)
        //console.log(psd.tree().descendants()[0].children()[0].layer)
        let _layers:LayerType[] = []
        for (let i = layerNum - 1; i >= 0; i--) {
          let layer
          console.log(psd.tree().children()[i])
          if (psd.tree().children()[i]._children.length > 0) {
            console.log(`下から${i + 1}番目の要素はディレクトリです`)
            layer = psd.tree().children()[i].children()[1].layer
            //console.log(layer)
          } else {
            layer = psd.tree().children()[i].layer
            console.log(`下から${i + 1}番目の要素はレイヤーです`)
            //console.log(layer)
          }
          let url = layer.image.toBase64()
          _layers = _layers.concat({ url: url, top: layer.top, left: layer.left, width: layer.width })
        }
        setlayers(_layers)
        setCanvasWidth(canvasWidth)
      })()
    }
  },[props]);
  return (
    <div style={{ position: "relative", backgroundColor: "red", marginTop: "50px", width: canvasWidth }}>
    {layers.map((layer,i) => {
      return <img width={layer.width/scale} key={i} src={layer?.url} style={{ position: "absolute", top:layer?.top/scale, left:layer?.left/scale, maxWidth: "500px"}}/>
    })}
  </div>
  );
}

export { PSDList }