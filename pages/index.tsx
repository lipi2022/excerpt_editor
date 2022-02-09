import type, { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { app } from "../lib/auth/googleAuth";
import { OAuthButtons } from "../components/auth/OAuthButtons";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   console.log(token);
  // }, [token]);

  const handleAuth = (name) => {
    if (name === "Google") {
      let auth = getAuth();
      console.log("auth", auth);
      if (auth.currentUser !== null) {
        return;
      }
      auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          setToken(token);
          setUser(user);
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Excerpt Editor</title>
        <meta name="description" content="excerpt editor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to excerpt editor</h1>
        <OAuthButtons handleAuth={handleAuth} />
      </main>
      <footer className={styles.footer}>Powered by Me</footer>
    </div>
  );
};

export default Home;
