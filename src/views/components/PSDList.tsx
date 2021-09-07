import React from "react";
import { useState, useEffect } from 'react';
// const PSD = require('psd.js');
import { PSDRepository } from "models/PSD";
import { Thumbnail } from "views/components/Thumbnail"
import { useHistory } from 'react-router-dom';

const PSDList: React.FC = () => {
  const [urlList, setUrlList] = useState<{ id:number, image_url:string }[]>([])
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res: { id:number, image_url:string }[] = await new PSDRepository().all()
      //let _urlList = res.map((e:{ id:number, image_url:string }) => e.image_url)
      console.log(res)
      setUrlList(res)
      })()
  }, []);

  const move = (id:number) => {
    history.push(`/detail/${id}`); // 画面遷移
  };

  return (
    <div >
      {urlList.map((url,i) => {
        return <button key={i} onClick={() => {
          alert(`id:${url.id}ですよ`)
          move(url.id)
        }}><Thumbnail psdUrl={url.image_url} width={300} /></button>
     })}
  </div>
  );
}

export { PSDList }