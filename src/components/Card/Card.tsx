import styles from "./Card.module.css";
import { FiAlertCircle } from "react-icons/fi";
const message = "Aviso";
export default function Card() {
  return (
    <div className={styles.card}>
      <FiAlertCircle className={styles.icon} />
      <span>{message || "Aviso"}</span>
    </div>
  );
}
