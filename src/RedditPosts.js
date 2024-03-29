import React, { useEffect, useState } from 'react';
import './RedditPosts.css';

function RedditPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(response => response.json())
      .then(data => {
        const postsData = data.data.children.map(child => child.data);
        setPosts(postsData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const decodeHTMLEntities = (text) => {
    const doc = new DOMParser().parseFromString(text, 'text/html');
    return doc.documentElement.textContent;
  };

  return (
    <div className="RedditPosts">
      <h1>Reddit ReactJS Posts</h1>
      <div className="container">
        {posts.map(post => (
          <div key={post.id} className="card">
            <h2>{post.title}</h2>
            <div className="selftext_html" dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(post.selftext_html) }} />
            <p><a href={post.url} target="_blank" rel="noopener noreferrer">Read More</a></p>
            <span>Score: {post.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RedditPosts;
