import { useState } from "react";
import styles from "./Atestado.module.css";
import { FiX } from "react-icons/fi";

type AtestadoProps = {
  onClose: () => void;
  onSubmit: (file: File) => void;
};

export default function Atestado({ onClose, onSubmit }: AtestadoProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onSubmit(selectedFile);
      setSelectedFile(null);
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FiX size={24} />
        </button>
        <h2>Enviar atestado</h2>
        <p>
          Lembre-se de levar o atestado físico ao departamento de Recursos
          Humanos assim que retornar as atividades!
        </p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={!selectedFile}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
