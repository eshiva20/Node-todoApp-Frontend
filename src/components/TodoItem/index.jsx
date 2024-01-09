import React from "react";
import styles from "./TodoItem.module.scss";

const TodoItem = ({
  title,
  description,
  isCompleted,
  statusHandler,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className={styles.todo}>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className={styles.actions}>
        <input
          onChange={() => statusHandler(id)}
          type="checkbox"
          checked={isCompleted}
        />
        <button
          onClick={() => deleteHandler(id)}
          className={`${styles.btn} ${styles.delete}`}
        >
          Delete
        </button>
        <button
          onClick={() => updateHandler(id)}
          className={`${styles.btn} ${styles.update}`}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
