import type, { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MarkdownEditor from "./editor/MarkdownEditor";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Excerpt Editor</title>
        <meta name="description" content="excerpt editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to excerpt editor</h1>

        <Link href="/login/App" passHref>
          <a>
            <p className={styles.description}>Login</p>
          </a>
        </Link>
        {/* <div className={styles.editor}>
          <MarkdownEditor />
        </div> */}
      </main>

      <footer className={styles.footer}>Powered by Me</footer>
    </div>
  );
};

export default Home;
