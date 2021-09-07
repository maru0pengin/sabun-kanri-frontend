import axios from 'axios';
import { useState } from 'react'
function HelloWorld() {

  const [text,setText] = useState("取得していません")
  const getText = async () => {
    await axios({
      method : 'GET',
      url    : `${process.env.REACT_APP_SERVER_URL}/hello_world`,
    })
      .then(response => response.data)
      .then(response => setText(response.text)
    );
  }
  return (
    <div>
      <button onClick={getText}>GetText</button>
      { text }
    </div>
  );
}

export { HelloWorld }