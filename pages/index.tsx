import Head from 'next/head';
import Image from 'next/image';
import type { InferGetStaticPropsType } from 'next';
import { Layout } from '../components/layout';
import Link from 'next/link';
// Import the generated Lists API from Keystone
import { lists } from '.keystone/api';
import styles from '../styles/Home.module.css';

// Home receives a `posts` prop from `getStaticProps` below
export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Keystone Blog" description="Testing Keystone + SQLite">
      <h1 className={styles.title}>Hello World! 👋🏻</h1>
      <ul className={styles.grid}>
        {/* Render each post with a link to the content page */}
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.slug}`}>
              <a className={styles.card}>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// Here we use the Lists API to load all the posts we want to display
// The return of this function is provided to the `Home` component
export async function getStaticProps() {
  const posts = await lists.Post.findMany({ query: 'id title slug' });
  return { props: { posts } };
}
