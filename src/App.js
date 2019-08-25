import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { selectFilteredPosts } from './redux/modules/posts';

function App({ posts, query }) {
  const [postsHighlighted, setPostsHighlighted] = useState();

  useEffect(() => {
    if (!query) return setPostsHighlighted(posts);

    const regex = new RegExp(query);
    const newPosts = posts.map(post => {
      const newPost = {...post};
      newPost.title = post.title.replace(regex, `<span class="highlight">${query}</span>`);
      newPost.body = post.body.replace(regex, `<span class="highlight">${query}</span>`);
      return newPost;
    });
    setPostsHighlighted(newPosts);
  }, [posts, query]);

  const dispatch = useDispatch();
  const fetchPosts = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(res => dispatch({
        type: 'SET_POSTS',
        payload: res,
      }));
  }
  const onFilterChange = e => dispatch({
    type: 'SET_QUERY',
    payload: e.target.value.toLowerCase(),
  });

  return (
    <div className="app">
      <h1>Filter Search</h1>
      <button onClick={fetchPosts}>Fetch Posts</button>
      <input placeholder="Filter..." onChange={onFilterChange} value={query} />
      {postsHighlighted && postsHighlighted.length
        ? <React.Fragment>
          <h3>Total: {postsHighlighted.length}</h3>
          <section>
            {postsHighlighted.map(post =>
                <article key={post.id}>
                  <h2 dangerouslySetInnerHTML={{ __html: post.title }} />
                  <p dangerouslySetInnerHTML={{ __html: post.body }} />
                </article>
          )}
          </section>
        </React.Fragment>
        : ''}
    </div>
  );
};

const mapStateToProps = state => ({ posts: selectFilteredPosts(state), query: state.posts.query });
export default connect(mapStateToProps)(App);
