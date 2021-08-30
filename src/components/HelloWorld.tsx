import { useState } from 'react'

function HelloWorld() {

  const [text,setText] = useState("取得していません")
  const getText = async () => {
    const fetchInit = {
      method: "GET",
      headers: { "content-type": "application/json" }
    };
    let url:string = new URL("hello_world", process.env.REACT_APP_SERVER_URL).toString()
    await fetch(url, fetchInit)
      .then(response => response.json())
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