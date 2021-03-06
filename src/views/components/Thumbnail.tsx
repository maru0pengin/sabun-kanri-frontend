import React from 'react';
import { useState, useEffect } from 'react';
const PSD = require('psd.js');

interface ThumbnailProps {
  psdUrl: string;
  width: number;
}

interface LayerType {
  url: string;
  top: number;
  left: number;
  width: number;
}

const Thumbnail: React.FC<ThumbnailProps> = (props) => {
  const [layers, setlayers] = useState<LayerType[]>([]);
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: props.width, height: props.width });

  let scale: number = 1;
  useEffect(() => {
    if (props.psdUrl.length > 0) {
      (async () => {
        let psd = await PSD.fromURL(props.psdUrl);
        let layerNum = psd.tree().children().length;
        scale = psd.header.cols / props.width;
        let _canvasSize = {
          width: psd.header.cols / scale,
          height: psd.header.rows / scale,
        };
        let _layers: LayerType[] = [];
        for (let i = layerNum - 1; i >= 0; i--) {
          let layer;
          if (psd.tree().children()[i]._children.length > 0) {
            layer = psd.tree().children()[i].children()[0].layer;
          } else {
            layer = psd.tree().children()[i].layer;
          }
          let url = layer.image.toBase64();
          _layers = _layers.concat({
            url: url,
            top: layer.top / scale,
            left: layer.left / scale,
            width: layer.width / scale,
          });
        }
        setlayers(_layers);
        setCanvasSize(_canvasSize);
      })();
    }
  }, [props]);
  return (
    <div
      style={{
        position: 'relative',
        width: canvasSize.width,
        height: canvasSize.height,
      }}
    >
      {layers.map((layer, i) => {
        return (
          <img
            width={layer.width}
            key={i}
            src={layer?.url}
            style={{
              position: 'absolute',
              top: layer?.top,
              left: layer?.left,
              maxWidth: '500px',
            }}
          />
        );
      })}
    </div>
  );
};

export { Thumbnail };
