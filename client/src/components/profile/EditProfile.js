import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, getProfile } from '../../store/actions/profile';
import moment from 'moment';
import { setAlert } from '../../store/actions/alert';

const EditProfile = ({
  getProfile,
  updateProfile,
  match,
  history,
  setAlert,
  profile: { loading, profile },
}) => {
  const [formData, setFormData] = useState({
    dogName: '',
    about: '',
    dateOfBirth: '',
    gender: '',
  });
  const [file, setFile] = useState('');

  useEffect(() => {
    if (!profile) getProfile(match.params.id);
    if (!loading && profile) {
      setFormData({
        dogName: profile.dogName,
        about: profile.about,
        dateOfBirth:
          profile.dateOfBirth === null
            ? ''
            : moment(profile.dateOfBirth).format('YYYY-MM-DD'),
        gender: profile.gender,
      });
      if (profile.profilePic) {
        setFile({ file: profile.profilePic });
      }
    }
  }, [loading, match.params.id, getProfile, profile]);

  const fileInputHandler = (event) => {
    if (event.target.files[0] && event.target.files[0].size > 1000000) {
      setAlert('Image must be less than 1MB', 'Danger');
    } else {
      setFile(event.target.files[0]);
    }
  };

  const inputHandler = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const { dogName, about, dateOfBirth, gender } = formData;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();

    formData.append('file', file);
    formData.append('dogName', dogName);
    formData.append('about', about);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('gender', gender);

    updateProfile(formData, match.params.id);
    history.push(`/profile/${match.params.id}`);
  };

  let fileText;

  if (file && profile.profilePic) {
    if (file.file !== profile.profilePic) {
      fileText = <small>{file.name}</small>;
    } else {
      fileText = <small>{file.file.slice(9)}</small>;
    }
  }

  console.log(file);
  return (
    <section className='ProfileForm'>
      <h1>Edit Profile</h1>
      <p>
        <i className='fas fa-paw' /> Add some changes to dogs profile
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmitHandler}>
        <div className='InputWrapper'>
          <input
            type='text'
            placeholder='* Dog Name'
            name='dogName'
            value={dogName}
            required
            onChange={inputHandler}
          />
          <small>What is your dog name?</small>
        </div>
        <div className='InputWrapper'>
          <input
            type='text'
            placeholder='About'
            name='about'
            value={about}
            onChange={inputHandler}
          />
          <small>Tell us something about your dog</small>
        </div>
        <div className='InputWrapper'>
          <input
            type='date'
            placeholder='Date Of Birth'
            name='dateOfBirth'
            value={dateOfBirth}
            onChange={inputHandler}
          />
          <small>Dogs birthday</small>
        </div>
        <div className='InputWrapper'>
          <select name='gender' value={gender} onChange={inputHandler}>
            <option value=''>Gender</option>d<option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
          <small>Choose dogs gender</small>
        </div>
        <div className='InputWrapper'>
          <label className='UploadButton'>
            {file ? (
              <i className='fas fa-check'></i>
            ) : (
              <i className='fas fa-plus'></i>
            )}

            <input
              type='file'
              placeholder='Profile Picture'
              name='profilePic'
              onChange={fileInputHandler}
            />
          </label>
          {fileText}
          <small>Upload profile picture of your dog (less than 1MB)</small>
        </div>
        <input type='submit' className='Button' value='Submit' />
        <Link className='Button' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

EditProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  updateProfile,
  getProfile,
  setAlert,
})(withRouter(EditProfile));
