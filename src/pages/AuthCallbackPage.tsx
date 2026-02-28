import { useParams, useSearchParams } from 'react-router-dom';

const AuthCallbackPage = () => {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  return (
    <div className="p-6">
      <p className="text-xl">Auth Callback</p>

      <div className="mt-2">
        <p>provider: {provider}</p>
        <p>code: {code ?? '없음'}</p>
        <p>error: {error ?? '없음'}</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
