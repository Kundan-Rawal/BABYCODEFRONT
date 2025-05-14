import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';
import StudentList from '../StudentList';
import './index.css';

const StudentDet = () => {
  const [filterCourse, setFilterCourse] = useState('');
  const [sortBy, setSortBy] = useState('NAME');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <div className="flex justify-between  max-h-[8vh]">
        <p className="text-lg lg:text-2xl text-blue-600 font-bold">Dashboard</p>
        <div className="mainsearchbarcontainer bg-blue-200 flex items-center px-2 rounded">
          <input
            type="text"
            className="inputfield outline-none"
            placeholder="Search students"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch size={30} color={'#181818'} />
        </div>
      </div>

      <div className="flex justify-between max-h-[10vh] lg:max-h-[8vh]">
        <div className="flex  items-center mr-5 w-[10%]">
          <p className="text-sm lg:text-normal font-semibold">Filters</p>
          <IoFilter className="ml-3" />
        </div>
        <div className="flex justify-end w-[90%]">
          <div className="mb-4 w-2/5 ml-4 flex mt-2 items-center">
            <label className="text-xs block mb-1 font-medium text-gray-700 lg:text-sm mr-2 ">
              Filter by Course
            </label>
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="p-1 border border-blue-600 rounded-md w-full max-w-3xs h-[30px]"
            >
              <option value="">All Courses</option>
              <option value="Btech">Btech</option>
              <option value="Mtech">Mtech</option>
              <option value="BCA">BCA</option>
              <option value="MBA">MBA</option>
            </select>
          </div>

          <div className="mb-4 w-2/5 ml-4 flex mt-2 items-center">
            <label className="block mb-1 font-medium text-gray-700 text-sm mr-2">
              Sort by
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-1 border border-blue-600 rounded-md w-full max-w-3xs"
            >
              <option value="NAME">Name</option>
              <option value="ID">ID</option>
            </select>
          </div>
        </div>
      </div>

      <StudentList
        filterCourse={filterCourse}
        sortBy={sortBy}
        searchTerm={searchTerm}
      />
    </>
  );
};

export default StudentDet;
