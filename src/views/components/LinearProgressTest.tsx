import React, { useState, useEffect } from 'react';
import { LinearProgress, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
export default function TopLoadingBar() {
  const [count, setCount] = useState(0);

  console.log('再描画');
  // useEffect(() => {
  //   setProgress(Math.min(progress + 1, 1000));
  // }, [progress]);

  const _sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // const add = () => {
  //   setProgress(Math.min(progress + 1, 1000));
  // };

  return (
    <div>
      <CircularProgress variant="determinate" value={count} />
      {/* <LinearProgress variant="determinate" value={count} /> */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setCount(0);
        }}
      >
        リセット
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={async () => {
          let new_count = count;
          for (let i = 0; i < 20; i++) {
            new_count = new_count + 1;
            setCount(new_count);
            await _sleep(1000);
          }
          // setProgress(Math.min(progress + 1, 1000));
          // //for (let i = 0; i < 100000; i++) {
          // add();
          // await _sleep(5000);
          // console.log('test');
          // add();
          // setProgress((progress: number) => {
          //   return Math.min(progress + 1, 1000);
          // });
          // setProgress((progress) => {
          //   //alert(`count:${progress}`);
          //   return progress;
          // });
          //}
        }}
      >
        進める
      </Button>
    </div>
  );
}
