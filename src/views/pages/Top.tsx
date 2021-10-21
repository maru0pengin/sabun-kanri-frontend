import { Link } from 'react-router-dom';
import { PSDList } from 'views/components/PSDList'

const Top = () => {
  return (
    <div>
      ここが一覧ページ！！！！
      <Link to="/new">
        <button　className="bg-red-100">
          新規作成
        </button>
      </Link>
      <PSDList/>
    </div>
  );  
};

export { Top }