import { useState, useEffect } from 'react';
import './index.css';
import StudentDet from '../StudentDet';
import AddStudent from '../AddStudent';
import axios from '../../API/api';

const STORAGE_KEY = 'student_data';

const RightMainDashboard = ({ activeID }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setStudents(JSON.parse(saved));
    } else {
      axios.get('/students').then((res) => {
        setStudents(res.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const addStudentHandler = (newStudent) => {
    const updated = [...students, newStudent];
    setStudents(updated);
  };

  return (
    <div className="lg:w-[80%] w-[100%] bg-blue-50 h-[90vh] p-1 lg:p-3 overflow-auto">
      {activeID === 'STUDENTS' ? (
        <StudentDet students={students} />
      ) : activeID === 'ADD' ? (
        <AddStudent students={students} addStudentHandler={addStudentHandler} />
      ) : (
        <p>Invalid selection</p>
      )}
    </div>
  );
};

export default RightMainDashboard;
