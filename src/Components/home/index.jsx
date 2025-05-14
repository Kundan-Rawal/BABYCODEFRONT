import Navbar from '../navbar';
import SideNavigationBar from '../sideNavigationBar';
import InitialContext from '../../StateContext/initialstate';
import RightMainDashboard from '../RightMainDashboard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect to login if user not found
    }
  }, [user, navigate]);

  return (
    <InitialContext.Consumer>
      {({ activeOpt, onClickChangeOpt }) => (
        <div>
          <Navbar />
          {/* User Info */}
          <div className="flex flex-row justify-between items-center">
            <SideNavigationBar
              activeID={activeOpt}
              onClickChangeOpt={onClickChangeOpt}
            />
            <RightMainDashboard activeID={activeOpt} />
          </div>
        </div>
      )}
    </InitialContext.Consumer>
  );
};

export default Home;
