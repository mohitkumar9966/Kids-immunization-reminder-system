
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

import gid from "./components/gid.jpg"
import mohit from "./components/mohit.jpg"
import nikhil from "./components/nikhil.jpg"
import { useLocation, Link } from "react-router-dom";


function Overview() {
  const pathParts = useLocation().pathname.split("/");
  const Id = pathParts[2];
  const [userData, setUserData] = useState({});

  console.log("ID from context:", Id);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/profile/${Id}`);
        setUserData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [Id]);



  return (
    <DashboardLayout>
      <Header name={userData.Name} email={userData.Email} />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          
        <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="Parent's Information"
              description="25 years old"
              info={{
                mobile: userData.Number,
                email: userData.Email,
                location: "Belgaum",
                Gender : userData.Gender,
                DOB : userData.Parent_Dob,
                Relation: userData.Relation,
              }}
              
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="Child's  Information"
              description="New Born Baby"
              info={{
                Nickname: "Pranav",
                DOB:userData.Child_Dob,
                BloodGroup: userData.Bloodgroup,
                Doctor_Name: "Dr. Zuhhh",
                Gender: "Male",
                Born_in_months: userData.Born_in_months,
                Any_Health_Condition:userData.Health_Condition,
                Previous_History:userData.Previous_History,
              }}
              
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings />
          </Grid>
         
        </Grid>
      </SoftBox>
     

      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Overview;
