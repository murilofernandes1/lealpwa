import styles from "./Notices.module.css";
import { FiInfo } from "react-icons/fi";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";

export default function Notices() {
  const token = localStorage.getItem("token");
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get("/alerts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvisos(response.data);
      } catch (error) {
        console.error(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [token]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.advicesContainer}>
          <h2>Meus avisos</h2>
          <div className={styles.advices}>
            {avisos?.map((a) => {
              const date = new Date(a.dateTime);
              const formatedDateTime = date.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              return (
                <div key={a.id} className={styles.card}>
                  <FiInfo className={styles.icon} />
                  <h3>{a.title}</h3>
                  <p>
                    Local: <span>{a.content}</span>
                  </p>
                  <p>
                    Data e Horário: <span>{formatedDateTime}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
