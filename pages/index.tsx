import type, { NextPage } from "next";
import { app } from "../lib/auth/googleAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
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

  return <></>;
};

export default Home;
