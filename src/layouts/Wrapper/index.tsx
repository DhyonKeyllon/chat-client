import { useEffect } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import usePersistedState from "../../hooks/usePersistedState";
import { useAuth } from "../../hooks/useAuth";

import HeaderComponent from "../../components/Header";
import SwitchComponent from "../../components/Switch";

import light from "../../styles/themes/light";
import dark from "../../styles/themes/dark";

import { Container, Content, ProfileContainer, ProfileText } from "./styles";

type WrapperProps = {
  children?: React.ReactNode;
};

const WrapperComponent = ({ children }: WrapperProps) => {
  const { user } = useAuth();
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);
  const [checked, setChecked] = usePersistedState<boolean>("checked", false);

  useEffect(() => {
    if (theme.title === "light") {
      setChecked(false);
    } else {
      setChecked(true);
    }
  });

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <HeaderComponent title="Chat 💬">
          <ProfileContainer>
            {user && <ProfileText>Oi, {user.name.split(" ", 1)}</ProfileText>}
            <SwitchComponent onChange={toggleTheme} checked={checked} />
          </ProfileContainer>
        </HeaderComponent>
        <Content>{children}</Content>
      </Container>
    </ThemeProvider>
  );
};

export default WrapperComponent;
