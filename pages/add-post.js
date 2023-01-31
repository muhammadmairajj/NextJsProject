import React, { useState } from 'react';
import Nav from '../components/Nav';
import styles from '../styles/Home.module.css';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();
    // Reset Error and Message:
    setError("");
    setMessage("");
    // fileds check:
    if(!title || !content) return setError("All fields must be required");

    // post Structure:
    let post = {
      title,
      content,
      published: false,
      createdAt: new Date().toISOString()
    };

    // Save the Posts:
    let response = await fetch('/api/posts', {
      method: "POST",
      body: JSON.stringify(post)
    });

    // get the data
    let data = await response.json();
    if(data.success) {
      // reset the fields
      setTitle("");
      setContent("");
      // set the message
      return setMessage(data.message)
    } else {
      // set the error
      return setError(data.message)
    }
  }
  return (
    <div>
      <Nav />
      <div className={styles.container}>
        <form onSubmit={handlePost} className={styles.form}>
          {error ? (
            <div className={styles.formItem}>
              <h3 className={styles.error}>{error}</h3>
            </div>
          ) : null}
          {message ? (
            <div className={styles.formItem}>
              <h3 className={styles.success}>{message}</h3>
            </div>
          ) : null}
          <div className={styles.formItem}>
            <label>Title</label>
            <input type="text" name='title' placeholder='Enter Title'
            value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={styles.formItem}>
            <label>Content</label>
            <textarea name='content' placeholder='Post Content'
            value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div className={styles.formItem}>
            <button type='submit'>Add Post</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPost;