import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

function LoadingComponent({ content = 'Loading...' }) {
  return (
    <Dimmer inverted active={true}>
      <Loader content={content} />
    </Dimmer>
  );
}

export default LoadingComponent;
