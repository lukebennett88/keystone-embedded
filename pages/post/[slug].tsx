import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { Layout } from '../../components/layout';
import Link from 'next/link';
import { lists } from '.keystone/api';
import styles from '../../styles/Home.module.css';

export default function PostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={post.title} description={post.content}>
      <div>
        <Link href="/">
          <a>&larr; back home</a>
        </Link>
      </div>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.grid}>
        <p>{post.content}</p>
      </div>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const posts = await lists.Post.findMany({
    query: 'slug',
  });

  const paths = posts
    .map((post) => post.slug)
    .filter((slug): slug is string => !!slug)
    .map((slug) => `/post/${slug}`);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const [post] = await lists.Post.findMany({
    where: {
      slug: params!.slug as string,
    },
    query: 'id title content',
  });
  return {
    props: { post },
  };
}
