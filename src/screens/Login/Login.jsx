import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const { data: token } = await api.post("/users/login", {
        email: email,
        password: password,
      });

      localStorage.setItem("token", token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <h1>Bem-vindo</h1>
            <p>Faça login para continuar</p>

            <form className={styles.loginForm} onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Digite seu usuário..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Digite sua senha..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Entrar</button>
              {error && (
                <p className={styles.error}>Usuário ou senha inválidos</p>
              )}
            </form>
            <p className={styles.advice}>
              Ainda não tem um usuário? Solicite agora no setor de Recursos
              Humanos!
            </p>
          </div>
        </div>
      )}
    </>
  );
}
