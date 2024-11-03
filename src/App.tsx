import { RouterProvider } from "react-router-dom";
import { router } from "./portal/routes";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
