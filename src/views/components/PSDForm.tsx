import { PSDRepository } from 'models/PSD';
import { useState } from 'react';
import { Thumbnail } from './Thumbnail';

function PSDForm() {
  const [psdFile, setPSD] = useState<any>();
  const [title, setTitle] = useState('');
  const [psdUrl, setpsdUrl] = useState('');

  const upload = async () => {
    interface CustomFormData extends FormData {
      append(title: string, psdFile: any): void;
    }
    var formData: CustomFormData = new FormData();
    formData.append('title', title);
    formData.append('image', psdFile);

    const res: any = await new PSDRepository().create(formData);
    //console.log(res.image_url)
    setpsdUrl(res.image_url);
  };
  return (
    <div>
      <h2>PostForm</h2>
      <section>
        <label htmlFor="title">title: </label>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>
      <section>
        <label htmlFor="image">image: </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={(e: any) => {
            e.preventDefault();
            setPSD(e.target.files[0]);
          }}
        />
      </section>
      <section>
        <button type="submit" onClick={upload} disabled={title === ''}>
          upload
        </button>
      </section>
      <Thumbnail psdUrl={psdUrl} width={300} />
    </div>
  );
}

export { PSDForm };
