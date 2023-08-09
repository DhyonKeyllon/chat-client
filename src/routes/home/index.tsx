import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "../../components/Button";
import InputComponent from "../../components/Input";

import { AuthContext } from "../../contexts/AuthContext";
import LinkComponent from "../../components/Link";
import AlertComponent from "../../components/InfoText";
import { ETextType } from "../../components/InfoText/enums";

import { Container } from "./styles";

function HomePage() {
  const { signIn, user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidCredentials, setIsValidCredentials] = useState<boolean | null>(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  });

  const handleSignin = async () => {
    try {
      if (email && password) {
        await signIn({ email, password });
        navigate("/chat");
      } else {
        setIsValidCredentials(false);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsValidCredentials(false);
    }
  };

  return (
    <Container>
      <h1>Chat 💬</h1>

      <InputComponent
        placeholder="Seu email"
        type="email"
        name="email"
        width="184px"
        height="32px"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void handleSignin();
          }
        }}
      />
      <InputComponent
        placeholder="Sua senha"
        type="password"
        name="password"
        width="184px"
        height="32px"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void handleSignin();
          }
        }}
      />
      <ButtonComponent width="184px" height="32px" onClick={() => void handleSignin()}>
        Entrar
      </ButtonComponent>
      {!isValidCredentials && (
        <AlertComponent type={ETextType.ERROR}>
          Senha ou email inválido, verifique os campos e tente novamente
        </AlertComponent>
      )}
      <span>
        Não tem uma conta? &nbsp; <LinkComponent onClick={() => navigate("/signup")}>Cadastre-se</LinkComponent>
      </span>
    </Container>
  );
}

export default HomePage;
