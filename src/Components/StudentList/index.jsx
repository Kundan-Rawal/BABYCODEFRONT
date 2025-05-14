import { useEffect, useState } from 'react';
import axios from '../../API/api';
import './index.css';

const StudentList = ({ filterCourse, sortBy, searchTerm }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('/students')
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  }, []);

  let updated = [...students];

  if (filterCourse && filterCourse !== '') {
    updated = updated.filter((student) => student.course === filterCourse);
  }

  if (searchTerm) {
    updated = updated.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (sortBy === 'NAME') {
    updated.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'ID') {
    updated.sort((a, b) => {
      const numA = parseInt(a.id.match(/\d+/)[0]);
      const numB = parseInt(b.id.match(/\d+/)[0]);
      return numA - numB;
    });
  }

  if (loading) {
    return (
      <p className="text-center mt-4 text-blue-600 font-medium">
        Loading students...
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 overflow-y-scroll h-[70vh] scrollbarremove">
      {updated.map((student) => (
        <div
          key={student.id}
          className="bg-white border border-gray-200 p-4 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 max-h-[350px]"
        >
          <img
            src={student.img}
            alt={student.name}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {student.name}
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold text-gray-700">ID:</span>{' '}
            {student.id}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold text-gray-700">Email:</span>{' '}
            {student.email}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-700">Course:</span>{' '}
            {student.course}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StudentList;
