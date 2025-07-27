import { useState } from "react";
import ModalLogin from "../../../Auth/ModalLogin/ModalLogin";
import ModalRegister from "../../../Auth/ModalLogin/ModalRegister";

function AuthModal({ initialMode = "login", onClose }) {
  const [mode, setMode] = useState(initialMode);

  return (
    <>
      {mode === "login" ? (
        <ModalLogin
          onSwitchToRegister={() => setMode("register")}
          onClose={onClose}
        />
      ) : (
        <ModalRegister
          onSwitchToLogin={() => setMode("login")}
          onClose={onClose}
        />
      )}
    </>
  );
}
export default AuthModal;