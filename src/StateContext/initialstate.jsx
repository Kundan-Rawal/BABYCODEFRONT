import React from 'react';

const InitialContext = React.createContext({
  activeOpt: 'STUDENTS',
  onClickChangeOpt: () => {},
});

export default InitialContext;
