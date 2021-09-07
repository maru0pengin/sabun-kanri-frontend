import { Link } from 'react-router-dom';
import { PSDForm } from 'views/components/PSDForm';

const New = () => {
  return (
    <div>
      ここが新規投稿ページ！！！！
      <Link to="/">
        <button>
          一覧ページへ
        </button>
      </Link>
      <PSDForm/>
    </div>
  );
};

export { New }