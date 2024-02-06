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
import Authors from "./Components/Authors/Index";
import AddAuthor from "./Components/Authors/AddAuthors/Index";
import Books from "./Components/Books/Index";
import AddBook from "./Components/Books/AddBooks/AddBook";
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
    path: "Authors/new",
    element: <AddAuthor />,
  },
  {
    path: "Books",
    element: <Books />,
  },
  {
    path: "Books/new",
    element: <AddBook />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
