import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

function ErrorComponent({ message }) {
  const history = useHistory();

  function goBack() {
    history.push('/courses');
  }
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h3>{message}</h3>
      <button className='custom-button' onClick={goBack}>
        Go Back To Courses
      </button>
    </div>
  );
}

export default ErrorComponent;
