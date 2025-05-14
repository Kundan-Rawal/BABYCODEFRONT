import { useState } from 'react';
import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import InitialContext from './StateContext/initialstate';
import Home from './Components/home';
import Login from './Components/Login';

import './App.css';

class App extends Component {
  state = { activeOpt: 'STUDENTS' };

  onClickChangeOpt = (idn) => {
    this.setState({ activeOpt: idn });
  };

  render() {
    const { activeOpt } = this.state;
    return (
      <InitialContext.Provider
        value={{ activeOpt, onClickChangeOpt: this.onClickChangeOpt }}
      >
        <Routes>
          <Route path="/" element={<Home activeOpt={activeOpt} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </InitialContext.Provider>
    );
  }
}

export default App;
