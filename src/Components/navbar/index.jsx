import './index.css';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase'; // Adjust path if needed
import { useNavigate } from 'react-router-dom'; // ✅ Add this

const Navbar = () => {
  const navigate = useNavigate(); // ✅ Use this hook to redirect

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Clear all data from localStorage
        localStorage.clear();

        // Optionally, set user to null in state
        setUser(null);

        // Redirect to the login page
        navigate('/login');
      })
      .catch((error) => console.error('Logout error', error));
  };

  return (
    <div className="flex flex-row justify-between lg:justify-around bg-blue-600 items-center max-h-[10vh]">
      <div className="flex items-center">
        <img
          src="https://internshala-uploads.internshala.com/logo%2F615eb21a856a01633595930.png.webp"
          className="rounded-full p-3 lg:p-5"
          alt="Logo"
        />
        <h2 className="font-semibold ml-1 lg:ml-4 text-white text-2xl m-0">
          BabyCode
        </h2>
      </div>
      <button onClick={handleLogout} className="logoutbutton ">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
