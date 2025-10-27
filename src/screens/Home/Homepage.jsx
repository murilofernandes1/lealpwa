import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";
import SuccessMessage from "../../components/SuccessMessage/SuccessMessage";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [picture, setPicture] = useState(null);
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const fileInputRef = useRef(null);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    const previewUrl = URL.createObjectURL(file);
    setPicture(previewUrl);

    const formData = new FormData();
    formData.append("image", file);

    try {
      setLoading(true);
      const response = await api.put("/users/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prev) => ({ ...prev, image: response.data.image }));
      setShowMessage(true);
    } catch (error) {
      console.log("Erro ao enviar imagem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div onClick={handleAvatarClick} className={styles.avatar}>
          {picture ? (
            <img src={picture} alt="Foto do usuário" />
          ) : (
            <FiUser className={styles.avatarPlaceholder} />
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className={styles.userInfo}>
          <h1>
            {greeting}, {user?.name?.split(" ")[0]}!
          </h1>
          {user?.department && <p>{user.department.name}</p>}
          {user?.city && <p>Leal {user.city.name}</p>}
        </div>

        <button className={styles.logoutButton} onClick={handleLogout}>
          <FiLogOut /> Sair
        </button>
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
