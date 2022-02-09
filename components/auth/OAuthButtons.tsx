import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import {
  GitHubIcon,
  GoogleIcon,
  TwitterIcon,
} from "../../components/ProviderIcons";
const providers = [
  { name: "Google", icon: <GoogleIcon boxSize="6" /> },
  { name: "Twitter", icon: <TwitterIcon boxSize="6" /> },
  { name: "GitHub", icon: <GitHubIcon boxSize="6" /> },
];

export const OAuthButtons = ({ handleAuth }) => (
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} isFullWidth onClick={() => handleAuth(name)}>
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);
