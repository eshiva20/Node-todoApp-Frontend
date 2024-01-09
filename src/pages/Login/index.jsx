import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Context, server } from "../../main";
import styles from './Login.module.scss'

const Login = () => {
  const { loading, setLoading } = useContext(Context);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${server}/users/login`, data, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      localStorage.setItem("token", response?.data?.token);
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setData({});
    setLoading(false);
  };

  return (
    <div className={styles.login}>
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={data?.email || ""}
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
            value={data?.password || ""}
            onChange={(e) => handleChange(e)}
            autoComplete="off"
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
