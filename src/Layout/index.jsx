import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Layout.module.scss";

const index = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <p className={styles.credit}>
        ©<a href="https://www.instagram.com/iam_shivaepili/" target="blank"> Shiva Epili </a>|| All Rights Are Reserved
      </p>
    </div>
  );
};

export default index;
