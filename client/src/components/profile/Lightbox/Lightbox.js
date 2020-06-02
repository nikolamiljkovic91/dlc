import React, { useState } from 'react';
import Photo from '../../assets/images/dlc-logo.jpeg';
import * as classes from './Lightbox.module.scss';

const Lightbox = ({ photos, setIsOpen, index }) => {
  return (
    <div className={classes.Lightbox}>
      <div className={classes.ImgWrapper}>
        <img src={Photo} alt='alt' />
      </div>
      <button className='Button'>
        <i className='fas fa-times'></i>
      </button>
      <button onClick={() => setIsOpen(false)} className='Button'>
        Delete
      </button>
    </div>
  );
};

export default Lightbox;
