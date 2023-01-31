import Head from 'next/head'
import Nav from '../components/Nav'
import PostCard from '../components/PostCard';
// import styles from '../styles/Home.module.css'

export default function Home({posts}) {
  return (
    <div>
      <Head>
        <title>NextJS CRUD App in MongoDB</title>
        <Nav />
      </Head>

      <main>
        <div>
          {posts.length === 0 ? (
            <h2>No Post Added</h2>
          ) : (
           <ul>
            {posts.map((post, i) => {
              return (
              <PostCard post={post} key={i} />
              )
              {/* console.log(post) */}
            })}
           </ul>
          )}
        </div>
      </main>
    </div>
  )
}


export async function getServerSideProps(txt) {
  // get the current environment
  let dev = process.env.NODE_ENV !== 'production';
  let { DEV_URL, PROD_URL } = process.env;

  // Request Posts from API
  let response = await fetch(`${dev ? DEV_URL: PROD_URL}/api/posts`);
  // extract the data
  let data = await response.json();

  return {
    props: {
      posts: data['message'],
    },
  };
}