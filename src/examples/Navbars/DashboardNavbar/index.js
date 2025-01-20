import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { dark } from "@mui/material/styles/createPalette";
// react-router components
import { useLocation, Link } from "react-router-dom";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';
// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import { useNavigate } from "react-router-dom";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
} from "context";



const handleSignOut = () => {
  // setIsAuthenticated(false); // Update authentication state
  // Other sign-out logic...
 // history.push('/');
 window.location.reload(true);
  window.location.href = "/";
};



function DashboardNavbar({ absolute, light, isMini }) {

  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const {transparentNavbar, fixedNavbar } = controller;
  const route = useLocation().pathname.split("/").slice(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }
    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }
    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);


  const handleNavigation = (page) => {
    
    const id = route[route.length - 1]; 
    navigate(`/${page}/${id}`);    
  };


  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        
      <SoftTypography component="h1" variant="button" fontWeight="large">
                TINYSHOTS
            </SoftTypography>
     
        <SoftBox color="inherit" mb={{ xs: 1, md: 1 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
       
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
             {route[0] === "homepage" && (
              <></>
             )}
                       {route[0] === "dashboard" && route.length === 2 && (
<>

            {/* TABLES BUTTON HERE */}

            <SoftBox  px={2}   pb={1}  textAlign="center"  flexDirection="column"   alignItems="center"   height="100%">
  <SoftBox
    component="button"
    onClick={() => handleNavigation("tables")}    
    display="flex"
    alignItems="center"
    justifyContent="center"
    variant="gradient" 
    p={1}
    borderRadius={8}
    color="info"
    width="100%" // Adjust width to match parent
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
  
    <SoftTypography variant="body3" ml={1} mr={1}  color="info" >
      Schedules
    </SoftTypography>
  </SoftBox>
</SoftBox>
            
{/* PROFILE BUTTON HERE */}

            <SoftBox  px={2}   pb={1}  textAlign="center"  flexDirection="column"   alignItems="center"   height="100%">
  <SoftBox
    component="button"
    onClick={() => handleNavigation("profile")}    
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={1}
    borderRadius={8}
    bgcolor="primary.main"
    color="info"
    width="100%" // Adjust width to match parent
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
  
    <SoftTypography variant="body3" ml={1} mr={1}  color="info"
>
      Profile
    </SoftTypography>
  </SoftBox>
</SoftBox>

            {/* SIGNOUT BUTTON HERE */}
            

            <SoftBox
  px={2}
  pb={1}
  textAlign="center"
  flexDirection="column"
  alignItems="center"
  height="100%"
>
  <SoftBox
    component="button"
    onClick={handleSignOut}
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={1}
    borderRadius={8}
    bgcolor="primary.main"
    color="white"
    width="100%" // Adjust width to match parent
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
  
    <SoftTypography variant="body3" ml={1} mr={1}>
      Sign Out
    </SoftTypography>
  </SoftBox>
</SoftBox>
</>)}


{(route[0] === "profile" ) && (
  <>
   <SoftBox  px={2}   pb={1}  textAlign="center"  flexDirection="column"   alignItems="center"   height="100%">
  <SoftBox
    component="button"
    onClick={() => handleNavigation("dashboard")}    
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={1}
    borderRadius={8}
    bgcolor="primary.main"
    color="info"
    width="100%" // Adjust width to match parent
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
  
    <SoftTypography variant="body3" ml={1} mr={1}  color="info"
>
      Dashboard
    </SoftTypography>
  </SoftBox>
</SoftBox>


<SoftBox  px={2}   pb={1}  textAlign="center"  flexDirection="column"   alignItems="center"   height="100%">
  <SoftBox
    component="button"
    onClick={() => handleNavigation("tables")}    
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={1}
    borderRadius={8}
    bgcolor="primary.main"
    color="info"
    width="100%" // Adjust width to match parent
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
  
    <SoftTypography variant="body3" ml={1} mr={1}  color="info"
>
      Schedule
    </SoftTypography>
  </SoftBox>
</SoftBox>

<SoftBox
  px={2}
  pb={1}
  textAlign="center"
  flexDirection="column"
  alignItems="center"
  height="100%"
>
  <SoftBox
    component="button"
    onClick={handleSignOut}
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={1}
    borderRadius={8}
    bgcolor="primary.main"
    color="white"
    width="100%" // Adjust width to match parent
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
  
    <SoftTypography variant="body3" ml={1} mr={1}>
      Sign Out
    </SoftTypography>
  </SoftBox>
</SoftBox>
  
  </>)}


  {(route[0] === "tables") && (
    <>
    <SoftBox  px={2}   pb={1}  textAlign="center"  flexDirection="column"   alignItems="center"   height="100%">
  <SoftBox
    component="button"
    onClick={() => handleNavigation("dashboard")}    
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={1}
    borderRadius={8}
    bgcolor="primary.main"
    color="info"
    width="100%" // Adjust width to match parent
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
  
    <SoftTypography variant="body3" ml={1} mr={1}  color="info"
>
      Dashboard
    </SoftTypography>
  </SoftBox>
</SoftBox>
    

<SoftBox  px={2}   pb={1}  textAlign="center"  flexDirection="column"   alignItems="center"   height="100%">
  <SoftBox
    component="button"
    onClick={() => handleNavigation("profile")}    
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={1}
    borderRadius={8}
    bgcolor="primary.main"
    color="info"
    width="100%" // Adjust width to match parent
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
  
    <SoftTypography variant="body3" ml={1} mr={1}  color="info"
>
      Profile
    </SoftTypography>
  </SoftBox>
</SoftBox>

<SoftBox
  px={2}
  pb={1}
  textAlign="center"
  flexDirection="column"
  alignItems="center"
  height="100%"
>
  <SoftBox
    component="button"
    onClick={handleSignOut}
    display="flex"
    alignItems="center"
    justifyContent="center"
    p={1}
    borderRadius={8}
    bgcolor="primary.main"
    color="white"
    width="100%" // Adjust width to match parent
    sx={{ textDecoration: 'none', cursor: 'pointer' }}
  >
  
    <SoftTypography variant="body3" ml={1} mr={1}>
      Sign Out
    </SoftTypography>
  </SoftBox>
</SoftBox>

    
    </>
  )}
 

          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
