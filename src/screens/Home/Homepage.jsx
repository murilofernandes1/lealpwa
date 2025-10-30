import { useState, useEffect } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import Alerts from "./components/Alerts/Alerts";
import styles from "./Home.module.css";

export default function Home() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [notices, setNotices] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!token) return;
      setLoading(true);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      };

      try {
        const [userRes, noticesRes, alertsRes] = await Promise.all([
          api.get("/users/me", { headers }),
          api.get("/notices", { headers }),
          api.get("/alerts", { headers }),
        ]);

        setUser(userRes.data);
        setNotices(noticesRes.data);
        setAlerts(alertsRes.data);
        const hour = new Date().getHours();
        setGreeting(
          hour >= 5 && hour < 12
            ? "Bom dia"
            : hour >= 12 && hour < 18
            ? "Boa tarde"
            : "Boa noite"
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token]);

  if (loading) return <Loading />;

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <h1>
            {greeting}, {user?.name?.split(" ")[0]}!
          </h1>
          <p>Confira as novidades da semana na sua unidade.</p>
        </div>
      </header>
      <Alerts alerts={alerts} />
      <main className={styles.gridContainer}>
        {notices.length > 0 ? (
          notices.map((n) => (
            <div
              key={n.id}
              className={styles.noticeCard}
              onClick={() => setSelectedNotice(n)}
            >
              <div className={styles.imageContainer}>
                <img
                  className={styles.image}
                  src={n.image}
                  alt={n.title || "Aviso"}
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
              {n.title && <p className={styles.caption}>{n.title}</p>}
            </div>
          ))
        ) : (
          <p className={styles.noNotices}>Nenhum aviso disponível.</p>
        )}
      </main>

      {selectedNotice && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedNotice.image}
              alt={selectedNotice.title || "Aviso"}
            />
            {selectedNotice.title && (
              <p className={styles.modalCaption}>{selectedNotice.title}</p>
            )}
          </div>
        </div>
      )}
      {showMessage && (
        <SuccessMessage
          message="Foto de perfil atualizada com sucesso!"
          duration={2000}
          onClose={() => setShowMessage(false)}
        />
      )}
    </div>
  );
}
