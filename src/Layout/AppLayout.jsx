import { Outlet, useLocation } from "react-router-dom";

import Navbar from "../Components/Navbar";
import BackButton from "../Components/BackButton";

function AppLayout() {

  const location = useLocation();

  const showBackButton =
    location.pathname !== "/";

  return (
    <>

      <Navbar />

      {showBackButton && (
        <BackButton />
      )}

      <Outlet />

    </>
  );
}

export default AppLayout;