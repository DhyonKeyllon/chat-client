import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonComponent from "../../components/Button";
import InputComponent from "../../components/Input";
import { AuthContext } from "../../contexts/AuthContext";
import LinkComponent from "../../components/Link";
import AlertComponent from "../../components/InfoText";
import { ETextType } from "../../components/InfoText/enums";

import { Container } from "./styles";

function SignUpPage() {
  const { signUp, user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordsEquals, setIsPasswordsEquals] = useState<boolean | null>(null);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  });

  const handleSignup = async () => {
    if (!password || !confirmPassword || !name || !email) return;

    if (password === confirmPassword) {
      setIsPasswordsEquals(true);
    } else {
      setIsPasswordValid(null);
      setIsPasswordsEquals(false);
      return;
    }

    if (password.length < 6 || confirmPassword.length < 6) {
      setIsPasswordsEquals(null);
      setIsPasswordValid(false);
      return;
    } else {
      console.log("Senha válida");
      setIsPasswordValid(true);
    }

    try {
      if (email && password && confirmPassword && name) {
        await signUp({ email, password, name });
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container>
      <h1>Chat 💬</h1>

      <InputComponent
        placeholder="Seu nome"
        type="name"
        name="name"
        width="184px"
        height="32px"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void handleSignup();
          }
        }}
      />
      <InputComponent
        placeholder="Seu email"
        type="email"
        name="email"
        width="184px"
        height="32px"
        onChange={(e) => setEmail(e.target.value.trim())}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void handleSignup();
          }
        }}
      />
      <InputComponent
        placeholder="Sua senha"
        type="password"
        name="password"
        width="184px"
        height="32px"
        onChange={(e) => setPassword(e.target.value.trim())}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void handleSignup();
          }
        }}
      />
      <InputComponent
        placeholder="Confirme sua senha"
        type="password"
        width="184px"
        height="32px"
        onChange={(e) => setConfirmPassword(e.target.value.trim())}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            void handleSignup();
          }
        }}
      />

      {isPasswordsEquals === false && isPasswordsEquals !== null && (
        <AlertComponent type={ETextType.ERROR}>As senhas não coincidem</AlertComponent>
      )}

      {isPasswordValid === false && isPasswordValid !== null && (
        <AlertComponent type={ETextType.ERROR}>A senha deve ter no mínimo 6 caracteres</AlertComponent>
      )}

      <ButtonComponent
        disabled={!name || !email || !password || !confirmPassword}
        width="184px"
        height="32px"
        onClick={() => void handleSignup()}
      >
        Cadastrar
      </ButtonComponent>

      <span>
        <LinkComponent onClick={() => navigate("/")}>Voltar</LinkComponent>
      </span>
    </Container>
  );
}

export default SignUpPage;
