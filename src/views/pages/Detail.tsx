import { Link } from 'react-router-dom';

const Detail = () => {
  return (
    <div>
      ここが詳細ページ！！！！
      <Link to="/">
        <button>
          Top
        </button>
      </Link>
    </div>
  );  
};

export { Detail }