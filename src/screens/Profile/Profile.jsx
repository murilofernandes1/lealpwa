import Loading from "../../components/Loading/Loading";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import api from "../../services/api";
import { FiUser, FiLogOut } from "react-icons/fi";
import Fops from "./components/Fops/Fops";

export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [fops, setFops] = useState([]);
  const [showFops, setShowFops] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    async function loadData() {
      try {
        const userRes = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        });
        setUser(userRes.data);
        setPicture(userRes.data.image);
        setFops(userRes.data.fops);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token]);

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
    } catch (error) {
      console.log("Erro ao enviar imagem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
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
              <h1>{user?.name}</h1>
              {user?.department && <p>{user.department.name}</p>}
              {user?.city && <p>Leal {user.city.name}</p>}
            </div>

            <button className={styles.logoutButton} onClick={handleLogout}>
              <FiLogOut /> Sair
            </button>
          </header>

          <div className={styles.container}>
            <button
              className={styles.showFopsButton}
              onClick={() => setShowFops(true)}
            >
              Minhas Solicitações de FOP
            </button>
          </div>

          {showFops && <Fops fops={fops} onClose={() => setShowFops(false)} />}
        </>
      )}
    </>
  );
}
