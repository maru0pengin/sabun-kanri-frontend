
import React from "react";
import { useState, useEffect } from 'react';
const PSD = require('psd.js')

interface PSDListProps {
  psdUrl: string
}

interface LayerType {
  url: string,
  top: string,
  left: string
}

const PSDList: React.FC<PSDListProps> = (props) => {
  const [layers, setlayers] = useState<LayerType[]>([])
  const [canvasWidth,setCanvasWidth] = useState()
  const [psd, setPSD] = useState<any>("")

  useEffect(() => {
    if (props.psdUrl.length > 0) {
      (async () => {
        let psd = await PSD.fromURL(props.psdUrl)
        let layerNum = psd.tree().descendants().length
        let canvasWidth = psd.header.cols
        let _layers:LayerType[] = []
        for (let i = layerNum - 1; i >= 0; i--) {
          let layer = psd.tree().descendants()[i].layer
          let url = layer.image.toBase64()
          _layers = _layers.concat({ url: url, top: layer.top, left: layer.left })
        }
        setlayers(_layers)
        setCanvasWidth(canvasWidth)
      })()
    }
  },[props]);
  return (
    <div style={{ position: "relative" ,backgroundColor: "red" ,marginTop: "50px", width: canvasWidth}}>
    {layers.map((layer,i) => {
      return <img key={i} src={layer?.url} style={{ position: "absolute", top:layer?.top, left:layer?.left, maxWidth: "500px"}}/>
    })}
  </div>
  );
}

export { PSDList }