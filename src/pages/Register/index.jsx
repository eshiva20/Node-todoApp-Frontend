import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../../main";
import toast from "react-hot-toast";
import styles from './Register.module.scss'

const Register = () => {
  const [data, setData] = useState({});
  const { loading, setLoading } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${server}/users/register`, data, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setData({});
    setLoading(false);
  };

  return (
    <div className={styles.register}>
      <section>
        <form onSubmit={submitHandler}>
          <input
            value={data?.name || ""}
            onChange={(e) => handleChange(e)}
            name="name"
            type="text"
            placeholder="Name"
            autoComplete="off"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={data?.email || ""}
            name="email"
            onChange={(e) => handleChange(e)}
            autoComplete="off"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={data?.password || ""}
            name="password"
            onChange={(e) => handleChange(e)}
            autoComplete="false"
            required
          />
          <button disabled={loading} type="submit">
            Sign Up
          </button>
          <h4>Or</h4>
          <Link to="/login">Log In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
