import { useEffect } from "react";
import styles from "./SuccessMessage.module.css";
import { FiCheckCircle } from "react-icons/fi";

export default function SuccessMessage({
  message = "Enviado com sucesso!",
  duration = 3000,
  onClose,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={styles.successOverlay}>
      <div className={styles.message}>
        <FiCheckCircle size={28} />
        <p>{message}</p>
      </div>
    </div>
  );
}
