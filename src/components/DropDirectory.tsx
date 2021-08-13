//参考: https://www.cresco.co.jp/blog/entry/16359/
import { DropArea } from "./DropArea" // コンポーネントのインポート
const PSD = require('psd.js')

function DropDirectory() {
  let url!: string ;
  const handleDrop = async (e: any) => {
    let psd = await PSD.fromEvent(e)
    
    console.log(`url:${psd.tree().descendants()[0].layer.image.toBase64()}`);
    url = psd.tree().descendants()[0].layer.image.toBase64()

  };
  return (
    <div>
      <DropArea onDrop={handleDrop}>
        <div style={{ width: 600, height: 300, border: "solid", borderWidth: 2 }}>
          ドロップエリアですぅ
        </div>
      </DropArea>
      <img src={url} />
    </div>
  );
}

export { DropDirectory }