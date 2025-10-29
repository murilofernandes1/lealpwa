import { useState, useEffect } from "react";
import Loading from "../Loading/Loading";

export default function MyFops() {
  const [fops, setFops] = useState([]);
  const [loading, setLoading] = useState(false);
  useState(() => {
    async function loadData() {
      try {
        setLoading(true);
        const userRes = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
          },
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  });

  return <>{loading === true ? <Loading /> : <div>Tamo indo</div>}</>;
}
