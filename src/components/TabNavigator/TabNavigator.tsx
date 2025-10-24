import { useNavigate } from "react-router-dom";
import { FaHome, FaBullhorn, FaUser, FaTools } from "react-icons/fa";

import styles from "./TabNavigator.module.css";

export default function TabNavigator() {
  const navigate = useNavigate();

  return (
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
        <button onClick={() => navigate("/profile")}>
          <FaUser className={styles.icon} />
          <span>Perfil</span>
        </button>
        <button onClick={() => navigate("/services")}>
          <FaTools className={styles.icon} />
          <span>Serviços</span>
        </button>
      </nav>
    </div>
  );
}
