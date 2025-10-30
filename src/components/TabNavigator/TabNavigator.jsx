import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaBullhorn, FaTools, FaUser } from "react-icons/fa";
import Loading from "../Loading/Loading";
import styles from "./TabNavigator.module.css";
import api from "../../services/api";

export default function TabNavigator() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [role, setRole] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!token) return;

    async function loadData() {
      try {
        const userRole = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        });
        setRole(userRole.data.department.name);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

  loading && <Loading />;
  return role !== "RH" || "Gestão" || "TI" || "Manutenção" ? (
    <>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <button onClick={() => navigate("/")}>
            <FaHome className={styles.icon} />
            <span>Home</span>
          </button>

          <button onClick={() => navigate("/services")}>
            <FaTools className={styles.icon} />
            <span>Serviços</span>
          </button>
          <button onClick={() => navigate("/profile")}>
            <FaUser className={styles.icon} />
            <span>Perfil</span>
          </button>
        </nav>
      </div>
    </>
  ) : (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <button onClick={() => navigate("/")}>
          <FaHome className={styles.icon} />
          <span>Home</span>
        </button>
        <button onClick={() => navigate("/notices")}>
          <FaBullhorn className={styles.icon} />
          <span>Avisos</span>
        </button>
        <button onClick={() => navigate("/services")}>
          <FaTools className={styles.icon} />
          <span>Serviços</span>
        </button>
        <button onClick={() => navigate("/profile")}>
          <FaUser className={styles.icon} />
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  );
}
