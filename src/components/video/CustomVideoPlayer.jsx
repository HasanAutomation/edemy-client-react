import React, { useRef, useState } from 'react';
import './index.scss';

function CustomVideoPlayer({
  src = 'https://res.cloudinary.com/dssvrf9oz/video/upload/v1635662987/pexels-pavel-danilyuk-5359634_1_gmixla.mp4',
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);
  var elem = document.getElementById('myvideo');

  function videoHandler(control) {
    if (control === 'play') {
      videoRef.current.play();
      setPlaying(true);
    } else if (control === 'pause') {
      videoRef.current.pause();
      setPlaying(false);
    }
  }

  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  const revert = () => {
    videoRef.current.currentTime -= 5;
  };

  window.setInterval(function () {
    setCurrentTime(videoRef.current?.currentTime);
    setProgress((videoRef.current?.currentTime / videoTime) * 100);
  }, 1000);

  function enterOrExitFullScreen() {
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    }
  }

  return (
    <div
      onDoubleClick={enterOrExitFullScreen}
      className='video-container'
      onMouseEnter={() => {
        setTimeout(() => {
          setShow(true);
        }, 200);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setShow(false);
        }, 500);
      }}
    >
      <video
        id='myvideo'
        controls={false}
        ref={videoRef}
        className='video'
        src={src}
      ></video>
      {show && (
        <>
          <div className='controlsContainer'>
            <div className='controls'>
              <img
                onClick={revert}
                className='controlsIcon'
                alt=''
                src='/icons/backward-5.svg'
              />
              {playing ? (
                <img
                  onClick={() => videoHandler('pause')}
                  className='controlsIcon--small'
                  alt=''
                  src='/icons/pause.svg'
                />
              ) : (
                <img
                  onClick={() => videoHandler('play')}
                  className='controlsIcon--small'
                  alt=''
                  src='/icons/play.svg'
                />
              )}
              <img
                className='controlsIcon'
                onClick={fastForward}
                alt=''
                src='/icons/forward-5.svg'
              />
            </div>
          </div>

          <div className='timecontrols'>
            <p
              className='controlsTime'
              style={{
                marginTop: 10,
              }}
            >
              {Math.floor(currentTime / 60) +
                ':' +
                ('0' + Math.floor(currentTime % 60)).slice(-2)}
            </p>
            <div className='time_progressbarContainer'>
              <div
                style={{ width: `${progress}%` }}
                className='time_progressBar'
              ></div>
            </div>
            <p className='controlsTime'>
              {Math.floor(videoTime / 60) +
                ':' +
                ('0' + Math.floor(videoTime % 60)).slice(-2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default CustomVideoPlayer;
