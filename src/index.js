import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Index from "./Components/Index";
import Authors from "./Components/Authors/Index";
import AddAuthor from "./Components/Authors/AddAuthors/Index";
import Books from "./Components/Books/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "Authors",
    element: <Authors />,
  },
  {
    path: "Add Author",
    element: <AddAuthor />,
  },
  {
    path: "Books",
    element: <Books />,
  },
  // {
  //   path: "Add Book",
  //   element: <AddBook />,
  // },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
