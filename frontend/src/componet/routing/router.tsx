import { createBrowserRouter } from "react-router-dom";

import Login from "../../pages/login";
import Sitebar from "../sitebar/sitebar";
import ProtectedRoute from "./ProtectedRoute";
import ContactPage from "../../pages/ContactPage";



export const router = createBrowserRouter([

  {
    path: "/",
    element: <Login />,
  },
  {
    // 🌍 Kani waa bogga macaamiisha dibadda (Contact Form) - Uma baahna ProtectedRoute
    path: "/contact", 
    element: <ContactPage/>,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Sitebar />
      </ProtectedRoute>
    ),
  },
]);