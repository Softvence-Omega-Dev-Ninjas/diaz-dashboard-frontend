import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Overview from "./pages/Overview";



const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Overview />,
      }
    ],
  },
]);

export default router;
