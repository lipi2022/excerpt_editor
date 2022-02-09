import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { GitHubIcon, GoogleIcon, TwitterIcon } from "../ProviderIcons";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../lib/auth/googleAuth";
import { AuthProps } from "../../lib/auth/authProps";

const providers = [
  { name: "Google", icon: <GoogleIcon boxSize="6" /> },
  { name: "Twitter", icon: <TwitterIcon boxSize="6" /> },
  { name: "GitHub", icon: <GitHubIcon boxSize="6" /> },
];

const handleAuth = (auth: AuthProps, name) => {
  if (name === "Google") {
    // object.name why?
    // const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token, user);
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

export const OAuthButtons: React.FC<AuthProps> = (auth: AuthProps) => (
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} isFullWidth onClick={() => handleAuth(auth, name)}>
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);
