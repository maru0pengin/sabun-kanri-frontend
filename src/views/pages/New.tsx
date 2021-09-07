import { Link } from 'react-router-dom';

const New = () => {
  return (
    <div>
      ここが新規投稿ページ！！！！
      <Link to="/">
        <button>
          show PageOne when you click this!!
        </button>
      </Link>
    </div>
  );
};

export { New }