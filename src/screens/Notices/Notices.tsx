import styles from "./Notices.module.css";
import { FiInfo } from "react-icons/fi";
import { useEffect, useState } from "react";
import api from "../../services/api";
import Loading from "../../components/Loading/Loading";

interface Avisos {
  id: number | string;
  content: string;
}
export default function Notices() {
  const token = localStorage.getItem("token");
  const [avisos, setAvisos] = useState<Avisos[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const response = await api.get("/alerts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvisos(response.data);
      console.log(response.data);
      setLoading(false);
    }

    loadData();
  }, [token]);
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className={styles.advicesContainer}>
          <h2>Avisos</h2>
          <div className={styles.advices}>
            {avisos?.map((a) => (
              <div key={a.id} className={styles.card}>
                <FiInfo className={styles.icon} />
                <h3>{a.content}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
