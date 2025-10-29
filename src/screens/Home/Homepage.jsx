import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import { FiUser } from "react-icons/fi";
import styles from "./Home.module.css";

export default function Home() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [picture, setPicture] = useState();
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!token) return;
      setLoading(true);
      try {
        const userRes = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        });
        const noticesRes = await api.get("/notices", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        });

        setUser(userRes.data);
        setNotices(noticesRes.data);
        setPicture(userRes.data.image);

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
        <div className={styles.avatar}>
          {picture ? (
            <img src={picture} alt="Foto do usuário" />
          ) : (
            <FiUser className={styles.avatarPlaceholder} />
          )}
        </div>

        <div className={styles.userInfo}>
          <h1>
            {greeting}, {user?.name?.split(" ")[0]}!
          </h1>
        </div>
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
