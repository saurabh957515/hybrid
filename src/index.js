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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "Authors",
    element: <Authors />,
  },

  {
    path: "Books",
    element: <Books />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
