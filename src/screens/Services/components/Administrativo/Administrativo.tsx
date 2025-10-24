import { useState } from "react";
import styles from "./Administrativo.module.css";
import { FiX } from "react-icons/fi";
import Loading from "../../../../components/Loading/Loading";
import SuccessMessage from "../../../../components/SuccessMessage/SuccessMessage";

type AdministrativoTIProps = {
  onClose: () => void;
};

export default function Administrativo({ onClose }: AdministrativoTIProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [date, setDate] = useState("");
  const [correction, setCorrection] = useState("");
  const [hour, setHour] = useState("");

  const handleSubmit = async () => {
    if (!date || !hour || !correction) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(true);
      setDate("");
      setCorrection("");
      setHour("");
    }, 1000);
  };

  return (
    <>
      {successMessage && (
        <SuccessMessage
          message="Solicitação enviada com sucesso!"
          duration={3000}
          onClose={() => setSuccessMessage(false)}
        />
      )}

      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button className={styles.closeBtn} onClick={onClose}>
            <FiX size={22} />
          </button>

          <h2>Solicitação de FOP</h2>
          <p className={styles.subtitle}>
            Sua solicitação estará sujeita à aprovação do seu gestor. Caso
            aprovada, o RH seguirá com a correção.
          </p>

          <form className={styles.formContainer}>
            <label>Data da ocorrência</label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className={styles.input}
            />

            <label>Correção a ser considerada</label>
            <select
              value={correction}
              onChange={(e) => setCorrection(e.target.value)}
              className={styles.select}
            >
              <option>Selecione uma opção</option>
              <option>Entrada</option>
              <option>Ida ao almoço</option>
              <option>Volta do almoço</option>
              <option>Saída</option>
            </select>

            <label>Horário correto</label>
            <input
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              type="time"
              className={styles.input}
            />
          </form>

          <button
            type="button"
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
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
