import styles from "./Alerts.module.css";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Alerts({ alerts }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const settings = {
    infinite: alerts.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    draggable: true,
    swipe: true,
    verticalSwiping: false,
  };
  return (
    <div className={styles.advices}>
      {alerts.length === 0 ? (
        <div className={styles.card}>
          <p className={styles.empty}>Nenhum alerta disponível.</p>
        </div>
      ) : (
        <Slider {...settings}>
          {alerts.map((a) => {
            const date = new Date(a.dateTime);
            const formatedDateTime = date.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                onClick={() => navigate("/notices")}
                key={a.id}
                className={styles.card}
              >
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
        </Slider>
      )}
    </div>
  );
}
