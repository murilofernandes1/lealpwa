import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";

type User = { name: string; city: { name: string } };
type Notice = { id: string; image: string; title?: string };

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadData() {
      if (!token) return;
      setLoading(true);
      try {
        const [userRes, noticesRes] = await Promise.all([
          api.get("/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/notices", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUser(userRes.data);
        setNotices(noticesRes.data);

        const hour = new Date().getHours();
        setGreeting(
          hour >= 5 && hour < 12
            ? "Bom dia"
            : hour >= 12 && hour < 18
            ? "Boa tarde"
            : "Boa noite"
        );
      } catch (error) {
        console.error(error);
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
        <h1 className={styles.greeting}>
          {greeting}, <span>{user?.name.split(" ")[0]}!</span> 👋
        </h1>
      </header>

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
    </div>
  );
}
