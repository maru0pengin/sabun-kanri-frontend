import { useState } from 'react'
import axios from 'axios';
const apiUrlBase: string = "https://sabun-kanri-backend.herokuapp.com/api/posts";

function PSDForm() {
  const [psdFile, setPSD] = useState<any>()
  const [title, setTitle] = useState("")
  const upload = async () => {
    var formData = new FormData()
    formData.append('title', title)
    formData.append('image', psdFile)

    const res = await axios.post(apiUrlBase, formData)
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
  </div>
  );
}

export { PSDForm }