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
  {
    id: 'BT2',
    name: 'Bob',
    email: 'bob@example.com',
    course: 'Btech',
    img: 'https://d2kf8ptlxcina8.cloudfront.net/8ADWVBHPEK-preview.png',
  },
  {
    id: 'BT3',
    name: 'Daniel',
    email: 'dani@example.com',
    course: 'Btech',
    img: 'https://d2kf8ptlxcina8.cloudfront.net/8ADWVBHPEK-preview.png',
  },
  {
    id: 'BT4',
    name: 'Kundan',
    email: 'Kundan@example.com',
    course: 'Btech',
    img: 'https://d2kf8ptlxcina8.cloudfront.net/8ADWVBHPEK-preview.png',
  },
  {
    id: 'BC5',
    name: 'Anu',
    email: 'Anuriti@gamil.com',
    course: 'BCA',
    img: 'https://d2kf8ptlxcina8.cloudfront.net/8ADWVBHPEK-preview.png',
  },
  {
    id: 'BC6',
    name: 'ritik',
    email: 'ritik@gamil.com',
    course: 'BCA',
    img: 'https://d2kf8ptlxcina8.cloudfront.net/8ADWVBHPEK-preview.png',
  },
  {
    id: 'BC7',
    name: 'evy',
    email: 'Anuriti@gamil.com',
    course: 'BCA',
    img: 'https://d2kf8ptlxcina8.cloudfront.net/8ADWVBHPEK-preview.png',
  },
];

// Load existing from localStorage
let students = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// If not initialized before, merge and save
if (!localStorage.getItem(MERGED_KEY)) {
  const existingIds = new Set(students.map((s) => s.id));
  const merged = [
    ...defaultStudents.filter((s) => !existingIds.has(s.id)),
    ...students,
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  localStorage.setItem(MERGED_KEY, 'true');

  students = merged; // ✅ This was missing
}

// GET /students
mock.onGet('/students').reply(200, students);

// POST /students
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
