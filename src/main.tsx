import React from "react";
import ReactDOM from "react-dom/client";

import WrapperComponent from "./layouts/Wrapper";

import AuthProvider from "./contexts/AuthContext";

import GlobalStyle from "./styles/global";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUpPage from "./routes/signup";
import HomePage from "./routes/home";
import { SocketProvider } from "./contexts/SocketContext";
import ChatPage from "./routes/chat";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <WrapperComponent>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} index />
            <Route
              path="/chat"
              element={
                <SocketProvider>
                  <ChatPage />
                </SocketProvider>
              }
            />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
        <GlobalStyle />
      </WrapperComponent>
    </AuthProvider>
  </React.StrictMode>
);
