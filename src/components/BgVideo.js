import React from 'react';
import './Background.css';

const BgVideo = () => {
    const videoSource = require('../assests/waves.mp4');
  return (
    <video autoPlay loop muted className='background-video'>
        <source src={videoSource} type="video/mp4"/>
    </video>
  )
}

export default BgVideo;
