import React from 'react';
import Link from 'next/link';
import styles from "../styles/Nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.nav}>
     <ul className={styles.list}>
        <li className={styles.item}>
            <Link href="/">
                Home
                {/* <a>Home</a> */}
            </Link>
        </li>
        <li className={styles.item}>
            <Link href="/add-post">
                Add Post
                {/* <a>Add Post</a> */}
            </Link>
        </li>
     </ul>
    </nav>
  )
}

export default Nav
