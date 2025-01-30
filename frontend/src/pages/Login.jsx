import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import googleIcon from '../assets/google-icon.svg';
import { baseURL } from '../utils/api';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const loginWithGoogle = () => {
    window.location.href = `${baseURL}/auth/google`
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Image Vault</h1>
        {/* features */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Features</h2>
          <ul className="list-disc pl-6">
            <li>Upload and organize your images</li>
            <li>Store images and videos up to 10MB</li>
            <li>Secure and private storage</li>
          </ul>
        </div>
        <button
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center gap-2 p-2 border rounded-lg hover:bg-gray-50"
        >
          <img src={googleIcon} alt="Google" className="w-6 h-6" />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;