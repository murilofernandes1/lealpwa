import { useState } from "react";
import styles from "./SuporteTI.module.css";
import { FiX } from "react-icons/fi";
import Loading from "../../../../components/Loading/Loading";
import SuccessMessage from "../../../../components/SuccessMessage/SuccessMessage";

export default function SuporteTI({ onClose }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(true);
      setText("");
    }, 1000);
  };

  return (
    <>
      {successMessage && (
        <SuccessMessage
          message="Chamado enviado com sucesso!"
          duration={3000}
          onClose={() => setSuccessMessage(false)}
        />
      )}

      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX size={24} />
          </button>
          <h2>Suporte TI</h2>
          <p className={styles.subtitle}>Digite seu problema no campo abaixo</p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Enviar
          </button>
          {error && (
            <p className={styles.errorText}>Os campos não podem estar vazios</p>
          )}
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
}
