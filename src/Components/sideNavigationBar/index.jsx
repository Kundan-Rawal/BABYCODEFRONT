import './index.css';
import {
  FaUserGraduate,
  FaUserPlus,
  FaLinkedin,
  FaInstagramSquare,
  FaTwitterSquare,
} from 'react-icons/fa';

const SideNavigationBar = (props) => {
  const { activeID, onClickChangeOpt } = props;
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const options = [
    { id: 'STUDENTS', disp: 'Students' },
    { id: 'ADD', disp: 'Add Students' },
  ];
  const functionreq = (id) => {
    switch (id) {
      case 'STUDENTS':
        return <FaUserGraduate />;
      case 'ADD':
        return <FaUserPlus />;
      default:
        return <FaUserGraduate />;
    }
  };
  return (
    <div className="w-[64px] lg:w-1/5 bg-blue-100 h-[90vh] flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center">
        <p className="hidden lg:block text-xl font-bold mt-3 text-blue-700">
          Welcome Back!
        </p>
        <img
          src={user?.photoURL}
          className="h-[40px] w-[40px] lg:h-[70px] lg:w-[70px] m-3 rounded-full"
        />
        <p className="hidden lg:block text-lg font-semibold text-gray-800">
          {user?.displayName}
        </p>
        <p className=" hidden lg:block text-sm font-normal mt-1 text-gray-700">
          {user?.email}
        </p>
        <hr className="w-[90%] mt-4 border-blue-700" />
        <ul className=" m-0 w-full p">
          {options.map((each) => (
            <li
              className={`flex  items-center justify-center lg:justify-start ${
                activeID == each.id
                  ? 'text-blue-700 bg-blue-200'
                  : 'text-blue-500'
              } text-xl font-semibold mt-5 p-3 cursor-pointer`}
              onClick={() => onClickChangeOpt(each.id)}
            >
              {functionreq(each.id)}
              <p className=" hidden lg:inline text-sm ml-5 text-gray-600">
                {each.disp}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-blue-500 w-full p-3 hidden lg:block">
        <p className="hidden lg:block text-lg text-white font-semibold">
          Contact Us :
        </p>
        <div className="flex justify-end mt-2">
          <FaLinkedin size={30} className="ml-2 cursor-pointer text-white" />
          <FaInstagramSquare
            size={30}
            className="ml-2 cursor-pointer  text-white"
          />
          <FaTwitterSquare
            size={30}
            className="ml-2 cursor-pointer  text-white"
          />
        </div>
      </div>
    </div>
  );
};
export default SideNavigationBar;
