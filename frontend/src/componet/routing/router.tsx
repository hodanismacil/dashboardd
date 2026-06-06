import { createBrowserRouter } from "react-router-dom";

import Login from "../../pages/login";
import Sitebar from "../sitebar/sitebar";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element:  
    <ProtectedRoute>
      <Sitebar 
    /></ProtectedRoute>,
  },
]);