import Mainpage from "./Mainpage/Mainpage";
import User from "./User/User";
import Onlypost from "./Onlypost/Onlypost";
import Myprofile from "./Myprofile/Myprofile";

let routes = [
  { path: "/", element: <Mainpage /> },
  { path: "/User", element: <User /> },
  { path: "/Onlypost", element: <Onlypost /> },
  { path: "/Myprofile", element: <Myprofile /> },
];

export default routes;
