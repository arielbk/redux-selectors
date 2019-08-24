import React from 'react';
import { connect, useDispatch } from 'react-redux';

function App({ posts }) {
  const dispatch = useDispatch();
  const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => dispatch({
        type: 'SET_POSTS',
        payload: res,
      }));
  }

  return (
    <div>
      <h1>Redux Selectors</h1>
      <button onClick={fetchPosts}>Fetch Posts</button>
      {posts && posts.length ? <section>
          {posts.map(post =>
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </article>)}
        </section>
        : ''}
    </div>
  );
};

const mapStateToProps = ({ posts }) => ({ posts: posts.filtered });
export default connect(mapStateToProps)(App);
