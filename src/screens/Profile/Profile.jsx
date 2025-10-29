import Loading from "../../components/Loading/Loading";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import api from "../../services/api";
import { FiUser, FiLogOut } from "react-icons/fi";
export default function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [fops, setFops] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setLoading(true);

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

        console.log(userRes.data);
        setUser(userRes.data);
        setPicture(userRes.data.image);
        setFops(userRes.data.fops);
        setLoading(false);
      } catch (error) {
        console.log(error);
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
      setShowMessage(true);
    } catch (error) {
      console.log("Erro ao enviar imagem:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          {" "}
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
          <div className={styles.fopsContainer}>
            <h2>Minhas solicitações de FOP</h2>
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
                  {f.length === 0 && <p>Nenhuma solicitação de FOP ainda.</p>}
                  {f.status === "Approved" && (
                    <>
                      <p className={styles.fopStatus}>
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
                      <p className={styles.fopStatus}>
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
                        Solicitação de FOP feita em:{" "}
                        <span>{formatedDateTime}</span>
                      </p>
                    </>
                  )}
                  {f.status === "Denied" && (
                    <>
                      <p className={styles.fopStatus}>
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
      )}
    </>
  );
}
