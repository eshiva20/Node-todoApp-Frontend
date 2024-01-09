import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { server } from "../../main";
import toast from "react-hot-toast";
import styles from './Profile.module.scss'

const Profile = () => {
  const [user, setUser] = useState();

  const getMe = async () => {
    try {
      const response = await axios.get(`${server}/users/me`, {
        withCredentials: true,
      });
      setUser(response?.data?.user);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return localStorage.getItem("token") ? (
    <div>
      <div className={styles.login}>
        <section>
          <form>
            <input value={user?.name} disabled="on" />
            <input value={user?.email} disabled="on" />
          </form>
        </section>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Profile;
