/** @format */

import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import "./index.css";
import Layout from "./Components/Layout";
import Authors from "./Components/Authors/Authors";
import Books from "./Components/Books/Books";
import "./index.css";
import { pdfjs } from "react-pdf";
import PdfComp from "./Components/PdfComp";
import Home from "./Components/Home/Home";
import LogIn from "./Components/DashBoard/LogIn";
import SignUp from "./Components/DashBoard/SignUp";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.js",
  import.meta.url
).toString();
const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <LogIn />
    ),
  },
  {
    path: "/signup",
    element: (
        <SignUp />
    ),
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
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
