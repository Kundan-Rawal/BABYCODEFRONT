import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../../../firebase';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        uid: result.user.uid,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error.code, error.message);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
      })
      .catch((error) => console.error('Logout error', error));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const userData = {
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          uid: currentUser.uid,
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {!user ? (
        <div className="bg-blue-50 w-[100vw] h-[100vh] flex flex-col items-center justify-center">
          <div className="bg-white shadow-lg  w-[380px] flex flex-col items-center p-5 rounded-2xl">
            <div className="flex items-center mt-2 mb-5">
              <img
                src="https://internshala-uploads.internshala.com/logo%2F615eb21a856a01633595930.png.webp"
                className="rounded-full "
                alt="Logo"
              />
              <h2 className="font-semibold ml-2 text-blue-950 text-2xl m-0">
                BabyCode
              </h2>
            </div>
            <p className="text-blue-950  text-lg">Login to BabyCode!</p>
            <button
              onClick={handleLogin}
              className="bg-blue-50 text-blue-950 flex items-center px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition border-blue-700 border hover:text-white mt-9 hover:shadow-lg hover:shadow-blue-500/50 cursor-pointer"
            >
              <FcGoogle className="mr-3" size={30} />
              <p className="font-semibold">Continue with Google</p>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
