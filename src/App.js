import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

function App({ posts }) {
  const [filter, setFilter] = useState('');
  const [postsHighlighted, setPostsHighlighted] = useState();
  
  useEffect(() => {
    if (!posts || !posts.length) return;
    if (!filter) return setPostsHighlighted(posts);

    const regex = new RegExp(filter);
    const newPosts = posts.map(post => {
      const newPost = {...post};
      newPost.title = post.title.replace(regex, `<span class="highlight">${filter}</span>`);
      newPost.body = post.body.replace(regex, `<span class="highlight">${filter}</span>`);
      return newPost;
    });
    setPostsHighlighted(newPosts);
  }, [filter, posts]);

  const dispatch = useDispatch();
  const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => dispatch({
        type: 'SET_POSTS',
        payload: res,
      }));
  }

  const onFilterChange = e => setFilter(e.target.value.toLowerCase());

  return (
    <div className="app">
      <h1>Filter Search</h1>
      <button onClick={fetchPosts}>Fetch Posts</button>
      <input placeholder="Filter..." onChange={onFilterChange} value={filter} />
      {postsHighlighted && postsHighlighted.length
        ? <section>
          {postsHighlighted.map(post =>
              post.title.includes(filter) || post.body.includes(filter) ? (
              <article key={post.id}>
                <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
                <p dangerouslySetInnerHTML={{ __html: post.body }} />
              </article>
            ) : ''
        )}
        </section>
        : ''}
    </div>
  );
};

const mapStateToProps = ({ posts }) => ({ posts: posts.fetched });
export default connect(mapStateToProps)(App);
