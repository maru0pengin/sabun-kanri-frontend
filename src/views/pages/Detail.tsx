import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import { PSDRepository } from 'models/PSD';
import { SabunList } from 'views/components/SabunList';
import { DetailTop } from 'views/components/DetailTop';

type DetailProps = RouteComponentProps<{
  id: string;
}>;

const Detail: React.FC<DetailProps> = (props) => {
  const [psdUrl, setpsdUrl] = useState('');

  const id = props.match.params.id;
  console.log(id);

  useEffect(() => {
    (async () => {
      const res: any = await new PSDRepository().show(id);
      console.log(res);
      setpsdUrl(res.image_url);
    })();
  }, [props]);
  return (
    <div>
      <DetailTop psdUrl={psdUrl} id={id} />
      <Link to="/">
        <button>Top</button>
      </Link>
      <SabunList psdUrl={psdUrl} />
    </div>
  );
};

export { Detail };
