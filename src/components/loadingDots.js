import React from "react";
import styles from "./loadingDots.module.css";

export const BouncingDotsLoader = (props) => {
  return (
    <div className={styles.loading_dots}>
      <div className={styles.bouncing_loader}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default BouncingDotsLoader;
