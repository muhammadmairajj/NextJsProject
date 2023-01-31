import React, { useState } from 'react';
import { useRouter } from 'next/router';

const PostCard = ({post}) => {
    const [publishing, setPublishing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    // Publish Post:
    const publishPost = async (postId) => {
        // change publishing  state
        setPublishing(true);

        try {
            // update POST
            await fetch("/api/posts", {
                method: "PUT",
                body: postId
            });
            // reset the publishing state:
            setPublishing(false);
            // reload the page
            return router.push(router.asPath)
        } catch(error) {
            setPublishing(false);
        }
    }
    // Delete Post:
    const deletePost = async (postId) => {
        // changing delete state
        setDeleting(true);
        try {
            // Delete Post:
            await fetch('/api/posts', {
                method: "DELETE",
                body: postId
            });
            // reset the deleting state
            setDeleting(false);
            // reload the page
            return router.push(router.asPath)
        } catch(error) {
            // stop deleting state
            return setDeleting(false)
        }
    }
  return (
    <>
        <li>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            <br />
            {!post.published ? (
                <button type='button' onClick={()=> publishPost(post._id)}>
                    {publishing ? "Publishing" : "Publish"}
                </button>
            ): null }
            <button type='button' onClick={()=> deletePost(post['_id'])}>
                {deleting ? "Deleting" : "Delete"}
            </button>
        </li>
    </>
  )
}

export default PostCard
