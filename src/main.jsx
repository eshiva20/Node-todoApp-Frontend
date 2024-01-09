import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles/app.scss";
import { createContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Toaster } from "react-hot-toast";

export const server = "https://nodejs-todoapp-izw1.onrender.com/api/v1";

export const Context = createContext();

const AppWrapper = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppWrapper />
  </>
);
