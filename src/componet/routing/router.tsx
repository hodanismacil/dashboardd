import {createBrowserRouter} from "react-router-dom";

import Sitebar from "../sitebar/sitebar";

const Router =() => {
    return (
        <div>
           
           <Sitebar />
        </div>
    )
}

export default Router;

export const router= createBrowserRouter([
    {
        path: "/",
        element: <Router />
    }
]);