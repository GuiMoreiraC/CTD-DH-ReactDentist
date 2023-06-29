import { useContext } from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalContext";



const Card = ({name,matricula}) => {
  const {theme} = useContext(GlobalContext);
  
  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div className={`card ${theme === "light" ? "" : styles.cardDark}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt="doctor placeholder"
        />
        <div className={`card-body ${styles.CardBody}`}>
          <Link to={`/dentist/${matricula}`}>
            <h5 className={`card-title ${styles.title}`}>{name}</h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
