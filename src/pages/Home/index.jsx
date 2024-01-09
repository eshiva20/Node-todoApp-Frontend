import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../../main";
import { toast } from "react-hot-toast";
import TodoItem from "../../components/TodoItem";
import { Navigate } from "react-router-dom";
import styles from './Home.module.scss'

const Home = () => {
  const [task, setTask] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const statusHandler = async (id) => {
    try {
      const response = await axios.patch(
        `${server}/task/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success(response?.data?.message);
      getTasks();
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateHandler = async (id) => {
    setTaskId(id);
    try {
      const response = await axios.get(`${server}/task/${id}`, {
        withCredentials: true,
      });
      setTask(response?.data?.data);
      setUpdate(true);
    } catch (error) {}
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`${server}/task/${id}`, {
        withCredentials: true,
      });
      toast.success(response?.data?.message);
      getTasks();
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get(`${server}/task/my`, {
        withCredentials: true,
      });
      setTasks(response?.data?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = update
        ? await axios.put(`${server}/task/${taskId}`, task, {
            withCredentials: true,
          })
        : await axios.post(`${server}/task/add`, task, {
            withCredentials: true,
          });
      toast.success(response?.data?.message);
      setUpdate(false)
      setTaskId("");
      getTasks();
    } catch (error) {
      console.log("error", error);
    }
    setTask({});
    setLoading(false);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {localStorage.getItem("token") ? (
        <div className={styles.container}>
          <div className={styles.login}>
            <section>
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  required
                  value={task?.title || ""}
                  onChange={(e) => handleChange(e)}
                  autoComplete="off"
                />
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  required
                  value={task?.description || ""}
                  onChange={(e) => handleChange(e)}
                  autoComplete="off"
                />

                <button disabled={loading} type="submit">
                  {update ? "Update " : "Add"}Task
                </button>
              </form>
            </section>
          </div>

          <section className={styles.todosContainer}>
            {tasks.map((i) => (
              <TodoItem
                title={i.title}
                description={i.description}
                isCompleted={i.isCompleted}
                updateHandler={updateHandler}
                statusHandler={statusHandler}
                deleteHandler={deleteHandler}
                id={i._id}
                key={i._id}
              />
            ))}
          </section>
        </div>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default Home;
