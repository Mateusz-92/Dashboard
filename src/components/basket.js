import React from "react";
import Button from "./button.js";

import styles from "./basket.module.css";

import basketImage from "../images/basket.png";

const Basket = ({ id, onSelect, onDelete }) => {
  return (
    <div className={styles.container} key={id}>
      <div className={styles.basket}>
        <span className={styles.span}>{`Basket number ${id}`}</span>
        <div className={styles.image_border} onClick={onSelect}>
          <img className={styles.image} src={basketImage} alt="basket"></img>
          <span className={styles.span}> Tap to check prices</span>
        </div>

        <Button text="Delete" onClick={onDelete}></Button>
      </div>
    </div>
  );
};
export default Basket;
