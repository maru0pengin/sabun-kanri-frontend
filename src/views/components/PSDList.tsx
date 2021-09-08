import React from 'react';
import { useState, useEffect } from 'react';
import { PSDRepository } from 'models/PSD';
import { Thumbnail } from 'views/components/Thumbnail';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

const PSDList: React.FC = () => {
  const [urlList, setUrlList] = useState<
    { id: number; title: string; image_url: string }[]
  >([]);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const res: { id: number; title: string; image_url: string }[] =
        await new PSDRepository().all();
      //let _urlList = res.map((e:{ id:number, image_url:string }) => e.image_url)
      console.log(res);
      setUrlList(res);
    })();
  }, []);

  const move = (id: number) => {
    history.push(`/detail/${id}`); // 画面遷移
  };

  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {urlList.map((url, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    alert(`id:${url.id}ですよ`);
                    move(url.id);
                  }}
                >
                  <Card className={classes.root}>
                    <CardContent>
                      <Thumbnail psdUrl={url.image_url} width={300} />
                      <div className="bg-red">{url.title}</div>
                    </CardContent>
                  </Card>
                </button>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export { PSDList };
