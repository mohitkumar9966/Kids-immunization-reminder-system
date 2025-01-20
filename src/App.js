import SignUp from './layouts/authentication/sign-up';
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation , Link} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import Homepage from "layouts/homepage";
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useSoftUIController, setMiniSidenav } from "context";
import brand from "assets/images/logo-ct.png";
import SignIn from 'layouts/authentication/sign-in';
import AdminSignIn from 'layouts/authentication/adminsign-in';
import Dashboard from 'layouts/dashboard';
import AdminDashboard from 'layouts/admin-dashboard';
import { useParams } from "react-router-dom";
import Profile from 'layouts/profile';
import Tables from 'layouts/tables';

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout,  sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };
  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return  (

      <ThemeProvider theme={theme}>
        <CssBaseline />
       
        <Routes>

          {/* {getRoutes(routes)} */}
          <Route path="/" element={<Navigate to="/homepage" />} />

          <Route path="/authentication/sign-up" element={<SignUp />} />

          <Route path="/authentication/sign-in" element={<SignIn />} />
          <Route path="/authentication/adminsign-in" element={<AdminSignIn />} />

          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/admin-dashboard/:id" element={<AdminDashboard />} />
          <Route path="/profile/:id" element={<Profile />} />
            <Route path="/tables/:id" element={<Tables />} />
          <Route path="/homepage" element={<Homepage/>}/>

          {/* <Route path="*" element={<Navigate to="/homepage" />} /> */}

          
        </Routes>
      </ThemeProvider>

  ) ;}
  