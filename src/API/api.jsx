import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios, { delayResponse: 1000 });
const STORAGE_KEY = 'student_data';
const MERGED_KEY = 'students_initialized'; // Flag for merging only once

// Default mock data
const defaultStudents = [
  {
    id: 'BT1',
    name: 'Alice',
    email: 'alice@example.com',
    course: 'Btech',
    img: 'https://d2kf8ptlxcina8.cloudfront.net/8ADWVBHPEK-preview.png',
  },
  // More default students...
];

// Load existing students from localStorage
let students = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Initialize students if not done already
if (!localStorage.getItem(MERGED_KEY)) {
  const mergedStudents = [...students, ...defaultStudents];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedStudents));
  localStorage.setItem(MERGED_KEY, 'true'); // Mark initialization as done
}

// Mock GET /students
mock.onGet('/students').reply(200, students);

// Mock POST /students
mock.onPost('/students').reply((config) => {
  const newStudent = JSON.parse(config.data);

  const idExists = students.some((s) => s.id === newStudent.id);
  const emailExists = students.some((s) => s.email === newStudent.email);

  if (idExists || emailExists) {
    return [400, { message: 'Duplicate ID or Email' }];
  }

  students.push(newStudent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));

  return [201, newStudent];
});

export default axios;
