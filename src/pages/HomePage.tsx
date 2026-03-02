import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <p>HomePage</p>

      <Link
        to="/login"
        className="inline-flex rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
      >
        로그인
      </Link>
    </div>
  );
};

export default HomePage;
