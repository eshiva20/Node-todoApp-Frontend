import axios from "axios";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { Context, server } from "../../main";

const Index = () => {
  const { loading, setLoading } = useContext(Context);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${server}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged Out Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <nav className={styles.header}>
      <div>
        <h2>Todo App.</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {localStorage.getItem("token") ? (
          <button
            disabled={loading}
            onClick={logoutHandler}
            className={styles.btn}
          >
            Logout
          </button>
        ) : (
          <button onClick={()=>navigate('/login')} className={styles.btn}>Login</button>
        )}
      </article>
    </nav>
  );
};

export default Index;
