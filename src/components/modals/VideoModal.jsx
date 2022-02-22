import React from 'react';
import ReactPlayer from 'react-player';
import ModalWrapper from './ModalWrapper';

function VideoModal({ video, title }) {
  return (
    <ModalWrapper size='mini' header={title}>
      <ReactPlayer
        playing={true}
        url={video}
        width='100%'
        height='200px'
        controls
      />
    </ModalWrapper>
  );
}

export default VideoModal;
