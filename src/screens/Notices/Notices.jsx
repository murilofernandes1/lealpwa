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
        console.log(response.data);
      } catch (error) {
        console.error(error);
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
          <div className={styles.advices}>
            {avisos?.map((a) => (
              <div key={a.id} className={styles.card}>
                <FiInfo className={styles.icon} />
                <h3>{a.title}</h3>
                <p>{a.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
