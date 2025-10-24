import styles from "./Profile.module.css";
import { FiUser, FiLogOut } from "react-icons/fi";
import api from "../../services/api";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  photo?: string;
  department?: { name: string };
  city?: { name: string };
}

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const loadUser = async () => {
      try {
        const response = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className={styles.profileContainer}>
      <header className={styles.header}>
        <div className={styles.avatar}>
          {user?.photo ? (
            <img src={user.photo} alt="Foto do usuário" />
          ) : (
            <FiUser className={styles.avatarPlaceholder} />
          )}
        </div>
        <div className={styles.userInfo}>
          <h1>{user?.name}</h1>
          <p>{user?.department?.name}</p>
          <p>Leal {user?.city?.name}</p>
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <FiLogOut /> Sair
        </button>
      </header>
    </div>
  );
}
