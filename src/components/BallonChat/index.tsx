import { Container } from "./styles";

type BallonChatProps = {
  me: boolean;
  children: string;
};

const BallonChatComponent = ({ me, children }: BallonChatProps) => {
  return (
    <Container $me={me}>
      <span>{children}</span>
    </Container>
  );
};

export default BallonChatComponent;
