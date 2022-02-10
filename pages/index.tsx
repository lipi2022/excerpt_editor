import type, { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { app } from "../lib/auth/googleAuth";
import { OAuthButtons } from "../components/auth/OAuthButtons";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      // detaching the listener
      if (user) {
        // ...your code to handle authenticated users.;
        router.push("/editor/EditorPage");
      } else {
        // No user is signed in...code to handle unauthenticated users.
        router.push("/LandingPage");
      }
    });
  }, [router]);

  return null;
};

export default Home;
