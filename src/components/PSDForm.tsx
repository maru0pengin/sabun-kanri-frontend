
import { PSDRepository } from '../models/PSD';
import { useState } from 'react';
import { PSDList } from './PSDList'
const PSD = require('psd.js')

interface PSDListProps {
  psdUrl: string
}

interface LayerType {
  url: string,
  top: string,
  left: string
}

function PSDForm() {
  const [psdFile, setPSD] = useState<any>()
  const [title, setTitle] = useState("")
  const [psdUrl, setpsdUrl] = useState("")

  const [layers, setlayers] = useState<LayerType[]>([])
  const [canvasWidth,setCanvasWidth] = useState()

  const upload = async () => {
    interface CustomFormData extends FormData {
      append(title: string, psdFile:any):void
    }
    var formData:CustomFormData = new FormData()
    formData.append('title', title)
    formData.append('image', psdFile)

    const res: any = await new PSDRepository().create(formData)
    //console.log(res.image_url)
    setpsdUrl(res.image_url)

    let psd = await PSD.fromURL(res.image_url)
    let layerNum = psd.tree().descendants().length
    let canvasWidth = psd.header.cols
    let _layers:LayerType[] = []
    for (let i = layerNum - 1; i >= 0; i--) {
      let layer = psd.tree().descendants()[i].layer
      let url = layer.image.toBase64()
      _layers = _layers.concat({ url: url, top: layer.top, left: layer.left })
      console.log({ url: url, top: layer.top, left: layer.left })
    }
    setlayers(_layers)
    setCanvasWidth(canvasWidth)
  }


  return (
  <div>
    <h2>PostForm</h2>
    <section>
      <label htmlFor="title">title: </label>
        <input type="text" name="title" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
    </section>
    <section>
      <label htmlFor="image">image: </label>
      <input
        type="file"
        id="image"
        name="image"
          onChange={(e:any) => {
            e.preventDefault()
            setPSD(e.target.files[0])
          }}
      />
    </section>
    <section>
        <button type="submit" onClick={upload} disabled={title === ''}>
        upload
      </button>
    </section>

      <PSDList psdUrl={psdUrl} />
      {/* <div style={{ position: "relative" ,backgroundColor: "red" ,marginTop: "50px", width: canvasWidth}}>
        {layers.map((layer,i) => {
          return <img key={i} src={layer?.url} style={{ position: "absolute", top:layer?.top, left:layer?.left, maxWidth: "500px"}}/>
        })}
      </div> */}
  </div>
  );
}

export { PSDForm }