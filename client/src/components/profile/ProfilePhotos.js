import React, { Fragment, useState } from 'react';
import classes from './ProfilePhotos.module.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../store/actions/alert';
import { uploadPhoto } from '../../store/actions/profile';

const ProfilePhotos = ({ setAlert, photos, uploadPhoto, id }) => {
  const [file, setFile] = useState('');
  console.log(photos);
  console.log(id);

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
        console.log(file);
        uploadPhoto(id, formData);
        setAlert('Successfully uploaded', 'Success');
      }
    }
    setFile('');
  };

  return (
    <Fragment>
      {photos.length !== 0 && (
        <div className={classes.Photos}>
          <h2>Photos</h2>
          <div className={classes.Gallery}>
            {photos.map((img) => (
              <div className={classes.ImgWrapper} key={img._id}>
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
    </Fragment>
  );
};

ProfilePhotos.propTypes = {
  photos: PropTypes.array,
  setAlert: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, uploadPhoto })(ProfilePhotos);
