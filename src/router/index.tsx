import { createBrowserRouter } from "react-router";
import { ROUTES } from "../lib/consts.ts";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout.tsx";
import Login from "../pages/login/Login.tsx";
// import Pending from "../pages/dashboard/Pending.tsx";
// import Offers from "../pages/dashboard/Approve.tsx";
import PrivateRoute from "../helpers/PrivateRoute.tsx";
// import Rejected from "../pages/dashboard/Rejected.tsx";
import Sales from "../pages/dashboard/Sales.tsx";
import Architect from "../pages/dashboard/Architect.tsx";

export const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME_PAGE,
      element: <Login />,
    },
    {
      element: (
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          path: ROUTES.SALES,
          element: <Sales />,
        },
        {
          index: true,
          path: ROUTES.ARCHITECT,
          element: <Architect />,
        },
        // {
        //   index: true,
        //   path: ROUTES.PENDING,
        //   element: <Pending />,
        // },
        // {
        //   path: ROUTES.APPROVED,
        //   element: <Offers />,
        // },
        // {
        //   path: ROUTES.REJECTED,
        //   element: <Rejected />,
        // },
      ],
    },
  ],
  {
    basename: "/",
    // basename: import.meta.env.VITE_BASE_URL,
  }
);
export default router;
