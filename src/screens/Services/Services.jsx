import styles from "./Services.module.css";
import { FiFileText, FiHeadphones, FiTool, FiMail } from "react-icons/fi";
import Atestado from "./components/Atestado/Atestado.jsx";
import { useState } from "react";
import SuporteTI from "./components/SuporteTI/SuporteTI.jsx";
import Fop from "./components/Fop/Fop.jsx";
import Manutencao from "./components/Manutenção/Manutencao.jsx";
export default function Services() {
  const [showAtestado, setShowAtestado] = useState(false);
  const [showSuporteTI, setShowSuporteTi] = useState(false);
  const [showFOP, setShowFOP] = useState(false);
  const [seeManutencao, setSeeManutencao] = useState(false);

  return (
    <div className={styles.servicesContainer}>
      <h2>Serviços</h2>
      <div className={styles.cardsContainer}>
        <div onClick={() => setShowAtestado(true)} className={styles.card}>
          <FiFileText className={styles.icon} />
          <h3>Enviar atestado</h3>
          <p>Envie seu atestado médico ou declaração.</p>
        </div>
        {showAtestado && (
          <Atestado
            onClose={() => setShowAtestado(false)}
            onSubmit={(file) => console.log("Arquivo enviado:", file)}
          />
        )}
        <div onClick={() => setShowSuporteTi(true)} className={styles.card}>
          <FiHeadphones className={styles.icon} />
          <h3>Suporte de TI</h3>
          <p>Solicite ajuda com equipamentos e sistemas.</p>
        </div>
        {showSuporteTI && <SuporteTI onClose={() => setShowSuporteTi(false)} />}
        <div onClick={() => setShowFOP(true)} className={styles.card}>
          <FiMail className={styles.icon} />
          <h3>Solicitar correção de ponto</h3>
          <p>Envie uma solicitação para a abertura de um FOP.</p>
        </div>
        {showFOP && <Fop onClose={() => setShowFOP(false)} />}
        <div onClick={() => setSeeManutencao(true)} className={styles.card}>
          <FiTool className={styles.icon} />
          <h3>Solicitar manutenção</h3>
          <p>Reportar problemas físicos ou de infraestrutura.</p>
        </div>
        {seeManutencao && (
          <Manutencao onClose={() => setSeeManutencao(false)} />
        )}
      </div>
    </div>
  );
}
