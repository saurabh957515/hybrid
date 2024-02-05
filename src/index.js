import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Books from "./Components/Books";
import Index from "./Components/Index";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "about",
    element: <Books />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
