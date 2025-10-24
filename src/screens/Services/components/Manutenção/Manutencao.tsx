import { useState } from "react";
import styles from "./Manutencao.module.css";
import { FiX } from "react-icons/fi";
import Loading from "../../../../components/Loading/Loading";
import SuccessMessage from "../../../../components/SuccessMessage/SuccessMessage";

type ManutencaoTIProps = {
  onClose: () => void;
};

export default function Manutencao({ onClose }: ManutencaoTIProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [department, setDepartment] = useState("");
  const [ocorrency, setOcorrency] = useState("");

  const handleSubmit = async () => {
    if (!department || !ocorrency) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage(true);
      setDepartment("");
      setOcorrency("");
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

          <h2>Solicitar manutenção</h2>
          <p className={styles.subtitle}>
            Sua solicitação será enviada a equipe de manutenção
          </p>

          <form className={styles.formContainer}>
            <label>Local/Setor da ocorrência</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className={styles.select}
            >
              <option>Selecione uma opção</option>
              <option>Expedição</option>
              <option>Recebimento</option>
              <option>Estoque</option>
              <option>Portaria</option>
              <option>Recursos Humanos</option>
              <option>Financeiro</option>
              <option>PCP</option>
              <option>Gestão</option>
              <option>Manulatex</option>
              <option>Manutenção</option>
              <option>Costura</option>
              <option>Cozinha</option>
              <option>Banheiros</option>
            </select>

            <label>Descreva a ocorrência</label>
            <textarea
              value={ocorrency}
              onChange={(e) => setOcorrency(e.target.value)}
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
