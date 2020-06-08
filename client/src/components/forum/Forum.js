import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner/Spinner';
import PostItem from './posts/PostItem';
import CreatePost from './posts/CreatePost';
import { getAllPosts } from '../../store/actions/post';

const Forum = ({ getAllPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <section className='DashboardForum'>
      <h1 className=''>Posts</h1>
      <p>
        <i className='fas fa-user'></i> Welcome to the community
      </p>
      <CreatePost />
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
    </section>
  );
};

Forum.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getAllPosts })(Forum);
