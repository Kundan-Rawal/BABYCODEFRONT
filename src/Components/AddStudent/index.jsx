import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './index.css';

const AddStudent = ({ addStudentHandler, students }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [popupMessage, setPopupMessage] = useState('');

  const isDuplicate = (id, email) => {
    return students.some(
      (student) => student.id === id || student.email === email
    );
  };

  const addStudentAPI = async (data) => {
    try {
      const response = await axios.post('/students', data);
      return response.data;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    if (isDuplicate(data.id, data.email)) {
      setPopupMessage(
        'Duplicate entry detected. Student with this ID or Email already exists.'
      );
      return;
    }

    try {
      const newStudent = await addStudentAPI(data);

      addStudentHandler(newStudent);

      setPopupMessage('Student added successfully!');
      reset();
    } catch (error) {
      setPopupMessage('Failed to add student. Please try again.');
    }
  };

  return (
    <div className="add-student-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="id">Student ID</label>
          <input
            type="text"
            id="id"
            {...register('id', { required: 'Student ID is required' })}
            className="input"
          />
          {errors.id && <p className="error">{errors.id.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Student Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Student Name is required' })}
            className="input"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Please enter a valid email',
              },
            })}
            className="input"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            {...register('course', {
              required: 'Course selection is required',
            })}
            className="input"
          >
            <option value="Btech">Btech</option>
            <option value="Mtech">Mtech</option>
            <option value="MBA">MBA</option>
          </select>
          {errors.course && <p className="error">{errors.course.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="img">Image URL</label>
          <input
            type="text"
            id="img"
            {...register('img', { required: 'Image URL is required' })}
            className="input"
          />
          {errors.img && <p className="error">{errors.img.message}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Add Student
        </button>
      </form>

      {popupMessage && (
        <div className="popup">
          <p>{popupMessage}</p>
          <button onClick={() => setPopupMessage('')}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
