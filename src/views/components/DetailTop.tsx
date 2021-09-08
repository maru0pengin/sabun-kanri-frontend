import { Thumbnail } from 'views/components/Thumbnail';
import { PSDRepository } from 'models/PSD';
import TopLoadingBar from 'views/components/LinearProgressTest';
import React from 'react';

interface DetailTopProps {
  psdUrl: string;
  id: string;
}

const DetailTop: React.FC<DetailTopProps> = (props) => {
  const deletePDF = async () => {
    const res: any = await new PSDRepository().delete(props.id);
    console.log(res);
  };
  return (
    <div>
      <Thumbnail psdUrl={props.psdUrl} width={300} />
      <button onClick={deletePDF}>削除</button>
      {/* <TopLoadingBar /> */}
    </div>
  );
};

export { DetailTop };
