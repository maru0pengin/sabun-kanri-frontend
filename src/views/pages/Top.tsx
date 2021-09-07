import { Link } from 'react-router-dom';

const Top = () => {
  return (
    <div>
      ここが一覧ページ！！！！
      <Link to="/new">
        <button>
          show PageTwo when you click this!!
        </button>
      </Link>
    </div>
  );  
};

export { Top }