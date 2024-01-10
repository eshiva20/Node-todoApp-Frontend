import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { server } from "../../main";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Profile.module.scss";

const Profile = () => {
  const [user, setUser] = useState();
  const [image, setImage] = useState("");
  const [setLogo] = useOutletContext();

  setLogo(user?.image);

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

  const convertToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error", error);
    };
  };

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${server}/users/user/${user._id}`,
        {
          name: user.name,
          image,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(response?.data?.message);
      getMe();
      setImage("");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    document.getElementById("btn").addEventListener("click", () => {
      document.getElementById("inputField").click();
    });
    getMe();
  }, []);

  return localStorage.getItem("token") ? (
    <div>
      <div className={styles.login}>
        <section>
          <form onSubmit={updateUser} className={styles.form}>
            <input
              className={styles.input}
              value={user?.name}
              name="name"
              onChange={(e) =>
                setUser({ ...user, [e.target.name]: e.target.value })
              }
            />
            <input className={styles.input} value={user?.email} disabled="on" />
            <button
              className={styles.input}
              style={{ cursor: "pointer" }}
              id="btn"
            >
              Upload Profile Image
            </button>
            <input
              type="file"
              id="inputField"
              onChange={convertToBase64}
              style={{ display: "none" }}
            />
            {image && (
              <div className={styles.imgDiv}>
                <img className={styles.img} src={image} alt="Image" />
                <div className={styles.btns}>
                  <button className={styles.btn} onClick={() => setImage("")}>
                    Cancel
                  </button>
                  <button className={styles.btn} type="submit">
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Profile;
