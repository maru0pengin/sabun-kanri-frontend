import React from "react";
import { useState, useEffect } from 'react';
// const PSD = require('psd.js');
import { PSDRepository } from "models/PSD";
import { Thumbnail } from "views/components/Thumbnail"

interface LayerType {
  url: string,
  top: number,
  left: number
  width: number
}

const PSDList: React.FC = () => {
  const [urlList, setUrlList] = useState<string[]>([])
  const [layers, setlayers] = useState<LayerType[]>([])
  
  const scale = 2

  useEffect(() => {
    // (async () => {
    //   const res: any = await new PSDRepository().all()
    //   console.log(res)
    // })()
    //if (props.psdUrl.length > 0) {
    (async () => {
      const res: {image_url:string}[] = await new PSDRepository().all()
      let _urlList = res.map((e:{image_url:string}) => e.image_url)
      console.log(_urlList)
      setUrlList(_urlList)
        // let psd = await PSD.fromURL(props.psdUrl)
        // let layerNum = psd.tree().children().length
        // let canvasWidth = psd.header.cols
        // let _layers:LayerType[] = []
        // for (let i = layerNum - 1; i >= 0; i--) {
        //   let layer
        //   console.log(psd.tree().children()[i])
        //   if (psd.tree().children()[i]._children.length > 0) {
        //     console.log(`下から${i + 1}番目の要素はディレクトリです`)
        //     layer = psd.tree().children()[i].children()[0].layer
        //     console.log(layer)
        //   } else {
        //     layer = psd.tree().children()[i].layer
        //     console.log(`下から${i + 1}番目の要素はレイヤーです`)
        //     console.log(layer)
        //   }
        //   let url = layer.image.toBase64()
        //   _layers = _layers.concat({ url: url, top: layer.top, left: layer.left, width: layer.width })
        // }
        // setlayers(_layers)
        // setCanvasWidth(canvasWidth)
      })()
    //}
  },[]);
  return (
    <div >
      {urlList.map((url, i) => {
        return <div ><Thumbnail psdUrl={ url } width={ 300 }/></div>
      // return <img width={layer.width/scale} key={i} src={layer?.url} style={{ position: "absolute", top:layer?.top/scale, left:layer?.left/scale, maxWidth: "500px"}}/>
    })}
  </div>
  );
}

export { PSDList }