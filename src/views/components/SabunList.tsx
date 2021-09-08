import React from 'react';
import { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const PSD = require('psd.js');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  })
);

interface SabunListProps {
  psdUrl: string;
}

interface LayerType {
  url: string;
  top: number;
  left: number;
  width: number;
  legacyName: string;
}

const SabunList: React.FC<SabunListProps> = (props) => {
  const classes = useStyles();

  const [list, setList] = useState<LayerType[][]>([]);
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  const [partsNameList, setPartsNameList] = useState<string[]>([]);

  const [update, setUpdata] = useState<boolean>(false);

  let scale: number = 1;
  const width = 200;

  console.log('再レンダリング');

  const showList = async () => {
    let psd = await PSD.fromURL(props.psdUrl);
    let layerNum = psd.tree().children().length;
    scale = psd.header.cols / width;
    let _canvasSize = {
      width: psd.header.cols / scale,
      height: psd.header.rows / scale,
    };
    setCanvasSize(_canvasSize);
    let _list: LayerType[][] = list;
    let _layers: LayerType[] = [];

    let loopIndexList = [];
    let _partsNameList = [];
    for (let i = 0; i < 7; i++) {
      loopIndexList[i] = psd.tree().children()[i]?.children().length;
      console.log();
      if (loopIndexList[i] === undefined || loopIndexList[i] === 0)
        loopIndexList[i] = 1;
      else _partsNameList[i] = psd.tree().children()[i].name;
    }
    setPartsNameList(_partsNameList);
    console.log(_partsNameList.reverse());
    console.log(layerNum);
    let layer;
    // このプログラムでは5項目の差分までしか表示できない
    // ToDo:簡潔なコードへ修正する
    console.log(loopIndexList[4]);
    for (let n = 0; n < loopIndexList[4]; n++) {
      for (let m = 0; m < loopIndexList[3]; m++) {
        for (let l = 0; l < loopIndexList[2]; l++) {
          for (let k = 0; k < loopIndexList[1]; k++) {
            for (let j = 0; j < loopIndexList[0]; j++) {
              for (let i = layerNum - 1; i >= 0; i--) {
                layer = {};
                if (psd.tree().children()[i]._children.length > 0) {
                  if (i === 0)
                    layer = psd.tree().children()[i].children()[j].layer;
                  else if (i === 1)
                    layer = psd.tree().children()[i].children()[k].layer;
                  else if (i === 2)
                    layer = psd.tree().children()[i].children()[l].layer;
                  else if (i === 3)
                    layer = psd.tree().children()[i].children()[m].layer;
                  else if (i === 4)
                    layer = psd.tree().children()[i].children()[n].layer;
                  else layer = psd.tree().children()[i].children()[0].layer;
                } else {
                  layer = psd.tree().children()[i].layer;
                }
                let url = layer.image.toBase64();
                //console.log(layer);
                _layers = _layers.concat({
                  url: url,
                  top: layer.top / scale,
                  left: layer.left / scale,
                  width: layer.width / scale,
                  legacyName: layer.legacyName,
                });
              }
              _list.push(_layers);
              //_list[j ] = _layers
              _layers = [];
            }
          }
        }
      }
    }

    setList(_list);
    console.log('うに丼');
    console.log(_list);
    //ToDo: 強制再レンダリングをしない方法を調べる
    setUpdata(update ? false : true);
  };
  return (
    <div>
      <button onClick={showList}>リスト表示</button>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {list.map((layers, i) => {
              return (
                <div
                  style={{
                    position: 'relative',
                    backgroundColor: 'white',
                    margin: '10px',
                    padding: '0 5px 0 5px',
                    width: canvasSize.width + 25,
                    height: canvasSize.height,
                    border: '2px solid',
                    borderColor: '#dcdcdc',
                    borderRadius: '10px',
                  }}
                >
                  {layers.map((layer, j) => {
                    return (
                      <div>
                        <div>
                          <img
                            width={layer.width / scale}
                            key={`${i}+${j}`}
                            src={layer?.url}
                            style={{
                              top: layer?.top,
                              left: layer?.left + 25,
                              maxWidth: '500px',
                              position: 'absolute',
                              display: 'block',
                            }}
                          />
                        </div>
                        {j !== 0 ? (
                          <div>
                            {partsNameList[j - 1]}:{layer.legacyName}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export { SabunList };
