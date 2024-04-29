/** @format */

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Layout from "./Components/Layout";
import Authors from "./Components/Authors/Authors";
import Books from "./Components/Books/Books";
import "./index.css";
import { pdfjs } from "react-pdf";
import PdfComp from "./Components/PdfComp";
import Home from "./Components/Home/Home";
import LogIn from "./Components/DashBoardLogIn/LogIn";
import SignUp from "./Components/DashBoardLogIn/SignUp";
import ResetPassword from "./Components/DashBoardLogIn/ResetPassword";
import SetPassword from "./Components/DashBoardLogIn/SetPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import TryComponent from "./Components/TryComponent";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.js",
  import.meta.url
).toString();
const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
  },
  {
    path: "/change-password",
    element: <SetPassword />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "Authors",
    element: (
      <Layout>
        <Authors />
      </Layout>
    ),
  },

  {
    path: "Books",
    element: (
      <Layout>
        <Books />
      </Layout>
    ),
  },
  {
    path: "readbook",
    element: (
      <Layout>
        <PdfComp />
      </Layout>
    ),
  },
  {
    path: "try",
    element: (<TryComponent />),
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className="h-full w-full dark:bg-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={true}
        theme="light"
        style={{ marginTop: "35px" }}
      />
      <RouterProvider router={router} />
    </div>
  </Provider>
);
