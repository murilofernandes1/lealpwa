import styles from "./Fops.module.css";
import { FiX } from "react-icons/fi";

export default function FopsModal({ fops, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FiX size={20} />
        </button>
        <h2>Minhas Solicitações de FOP</h2>
        <div className={styles.fopsList}>
          {fops.length === 0 && <p>Nenhuma solicitação de FOP ainda.</p>}
          {fops.map((f) => {
            const date = new Date(f.updatedAt || f.createdAt);
            const formatedDateTime = date.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });
            const datetime = new Date(f.datetime);
            const ocorrencyDate = datetime.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return (
              <div className={styles.fop} key={f.id}>
                {f.status === "Approved" && (
                  <>
                    <p>
                      Status: <span>Aprovado</span>
                    </p>
                    <p>
                      Data da ocorrência: <span>{ocorrencyDate}</span>
                    </p>
                    <p>
                      Ponto esquecido: <span>{f.justify}</span>
                    </p>
                    <p>
                      Horário a ser considerado: <span>{f.correctHour}</span>
                    </p>
                    <p>
                      Aprovado em <span>{formatedDateTime}</span>
                    </p>
                  </>
                )}
                {f.status === "Pending" && (
                  <>
                    <p>
                      Status: <span>Pendente</span>
                    </p>
                    <p>
                      Data da ocorrência: <span>{ocorrencyDate}</span>
                    </p>
                    <p>
                      Ponto esquecido: <span>{f.justify}</span>
                    </p>
                    <p>
                      Horário a ser considerado: <span>{f.correctHour}</span>
                    </p>
                    <p>
                      Solicitação feita em <span>{formatedDateTime}</span>
                    </p>
                  </>
                )}
                {f.status === "Denied" && (
                  <>
                    <p>
                      Status: <span>Negado</span>
                    </p>
                    <p>
                      Data da ocorrência: <span>{ocorrencyDate}</span>
                    </p>
                    <p>
                      Ponto esquecido: <span>{f.justify}</span>
                    </p>
                    <p>
                      Horário a ser considerado: <span>{f.correctHour}</span>
                    </p>
                    <p>
                      Negado em <span>{formatedDateTime}</span>
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
