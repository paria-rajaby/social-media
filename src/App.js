import "./App.css";
import Footer from "./Components/Footer/Footer";
import { useLocation } from "react-router-dom";

import { useRoutes } from "react-router-dom";
import routes from "./Components/routes";

function App() {
  let router = useRoutes(routes);
  let location = useLocation();
  const hideFooterRoutes = ["/upload", "/Edit"];
  return (
    <>
      {router}
      {!hideFooterRoutes.includes(location.pathname) && <Footer></Footer>}
    </>
  );
}

export default App;
