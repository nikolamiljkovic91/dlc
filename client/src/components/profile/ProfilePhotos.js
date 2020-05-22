import React, { Fragment, useState } from 'react';
import classes from './ProfilePhotos.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert';
import { uploadPhoto, deletePhoto } from '../../store/actions/profile';

const ProfilePhotos = ({ setAlert, photos, uploadPhoto, deletePhoto, id }) => {
  const [file, setFile] = useState('');
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [imgId, setImgId] = useState('');
  console.log(photos);
  console.log(id);
  console.log(isOpen);

  const onChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('file', file);
    if (file) {
      if (file.size > 1000000) {
        setAlert('IMG size must be less than 1MB', 'Danger');
      } else {
        uploadPhoto(id, formData);
        setAlert('Successfully uploaded', 'Success');
      }
    }
    setFile('');
  };

  return (
    <Fragment>
      {photos && photos.length !== 0 && (
        <div className={classes.Photos}>
          <h2>Photos</h2>
          <div className={classes.Gallery}>
            {photos.map((img, index) => (
              <div
                className={classes.ImgWrapper}
                key={img._id}
                onClick={() => {
                  setIsOpen(true);
                  setIndex(index);
                  setImgId(img._id);
                }}
              >
                <img src={img.path} alt='img' />
              </div>
            ))}
          </div>
        </div>
      )}
      <form onSubmit={onSubmitHandler} className={classes.Wrapper}>
        <label className={classes.UploadButton}>
          <i className='fas fa-plus'></i>
          <input
            type='file'
            name='uploadPicture'
            id='uploadPhoto'
            onChange={onChangeHandler}
          />
        </label>
        <small>Upload picture of your dog (less than 1MB)</small>
        {file ? (
          <input type='submit' className='Button' />
        ) : (
          <input disabled type='submit' className='Button' />
        )}
      </form>

      {isOpen && (
        <div className={classes.Lightbox}>
          <div className={classes.ImgWrapper}>
            <img src={photos[index].path} alt='alt' />
          </div>
          <button className='Button' onClick={() => setIsOpen(false)}>
            <i className='fas fa-times'></i>
          </button>
          <button
            onClick={() => {
              deletePhoto(id, imgId);
              setIsOpen(false);
            }}
            className='Button'
          >
            Delete
          </button>
        </div>
      )}
    </Fragment>
  );
};

ProfilePhotos.propTypes = {
  photos: PropTypes.array,
  setAlert: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, uploadPhoto, deletePhoto })(
  ProfilePhotos
);
