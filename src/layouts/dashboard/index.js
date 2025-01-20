
import { Link } from "react-router-dom";
 import React from 'react';
 import VaccinesIcon from '@mui/icons-material/Vaccines';
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { useState ,useEffect} from 'react';
import { Calendar, Badge } from 'rsuite';
import 'rsuite/Calendar/styles/index.css';

import CustomerSupport from "examples/Icons/CustomerSupport";
import Cube from "examples/Icons/Cube";
import Home from "layouts/homepage";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Card from "@mui/material/Card";
import axios from "axios";
import { useLocation } from "react-router-dom";





function Dashboard() {

  const pathParts = useLocation().pathname.split("/");
  const Id = pathParts[2];
  const [DashboardData, setDashboardData] = useState([]);
  const [upcomingDates, setUpcomingDates] = useState([]);
  const [totalVaccines, setTotalVaccines] = useState(0);
  const [takenVaccines, setTakenVaccines] = useState(0);
 



  
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/dashboard/${Id}`);
        setDashboardData(response.data);
        console.log("response.data",response.data);
        
        const totalVaccineCount = Object.keys(response.data).filter(key => key.endsWith('Status')).length;
        setTotalVaccines(totalVaccineCount);

        const takenVaccineCount = Object.values(response.data).filter(status => status === true).length;
        setTakenVaccines(takenVaccineCount);


      } catch (error) {
        console.error("Error fetching the vaccine data:", error);
      }
    };

    fetchData();
  }, [Id]);

  useEffect(() => {
    const dates = getTodoList(DashboardData);
    setUpcomingDates(dates); 
  }, [DashboardData]);

  function getTodoList(customDates) {
    // const currentDate = new Date();
    const upcomingDates = [];
    const datesArray = Object.entries(customDates).map(([key, value]) => ({ key, value }));

  datesArray.forEach(({ key, value }) => {
    // Check if the key starts with "Vaccine" followed by a number
    // if (/^Vaccine\d+$/.test(key) && value && new Date(value) >= currentDate) {
      if (/^Vaccine\d+$/.test(key) && value) {
        const statusKey = `${key}Status`;
      if (customDates[statusKey] === null || customDates[statusKey] === 0 || customDates[statusKey] === false) {
      upcomingDates.push({
        columnName: key, 
        date: new Date(value),
        tasks: [{ title: 'Vaccine Scheduled' }]
      });
    }
    }
  });
  
    upcomingDates.sort((a, b) => a.date - b.date);
    
  
    return upcomingDates.slice(0, 15);
  }
    
  const handleClickedit = async (columnName) => {
    const newDate = window.prompt("Please enter the new Date in (YYYY-MM-DD) format:");
    if (newDate) {
      try {
        const param = new URLSearchParams();
        param.append('columnName', columnName);
        param.append('date', newDate); 
        
        await axios.post(`http://localhost:8080/dashboard/${Id}/updateDate`, param)
            .then(() => {
                console.log('Date updated successfully');
                window.location.reload(); 
            })
            .catch(error => {
                console.error("Error updating Date", error);
            });
    } catch (error) {
        console.error('Error updating date:', error);
    }
} else {
    console.log('Date Update Cancelled');
}
  };
  
  const handleUpdateStatus = async (columnName) => {
    const confirmation = window.confirm(`Are you sure you want to update the status for Vaccine ${columnName}?`);
    if (confirmation) {


    try {
      const params = new URLSearchParams();
      params.append('columnName', columnName); 


      await axios.post(`http://localhost:8080/dashboard/${Id}`, params)
      .then(() => {
      console.log('Status updated successfully');
      window.location.reload();
    })
      .catch(error =>{
        console.error("Error updating Status",error) ;
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  } else {
    console.log('Status Update Cancelled');
  }
  };



  function renderCell(date) {
    const list = getTodoList(DashboardData);
    const tasksForDate = list.filter(item => {
      const taskDate = new Date(item.date);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });

  
    if (tasksForDate.length ) {
      return (
        <Badge className="calendar-todo-item-badge">
          <div>
            {tasksForDate.map(item => (
              <div key={item.date.getTime()}>
                {item.tasks[0].title} ({item.date.toLocaleDateString()})
              </div>
            ))}
          </div>
        </Badge>
      );
    }
    return null;
  }



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        
          <Grid container spacing={4}>
          
            <Grid item xs={12} sm={6} xl={3}>
              
              <MiniStatisticsCard
                title={{ text: "Total Vaccine" }}
                count={totalVaccines}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: <Cube size="18px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Taken" }}
                count={takenVaccines}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Pending" }}
                count={totalVaccines - takenVaccines}
                percentage={{ color: "error", text: "" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Reminder Status" }}
                count="On"
                percentage={{ color: "success", text: "" }}
                icon={{
                  color: "info",
                  component: <CustomerSupport size="18px" color="white"/>,
                }}
              />
            </Grid>
          </Grid>
        </SoftBox>
    
      
        <SoftBox mb={3}>
          <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
          <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Vaccine Information
        </SoftTypography>
      </SoftBox>

      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        {upcomingDates.map((item) => (

          <SoftBox key={item.columnName} component="li"  display="flex"  justifyContent="space-between"   alignItems="flex-start"  bgColor="grey-100" borderRadius="lg"  p={2}  mt={1} >

          <SoftBox width="100%" display="flex" flexDirection="column">
        <SoftBox  display="flex"  justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }}  flexDirection={{ xs: "column", sm: "row" }} mb={2} >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
         {item.columnName}
          </SoftTypography>

          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <SoftBox mr={1}>
            <SoftButton variant="text" color="dark"  onClick={() =>handleClickedit(item.columnName)}>
              <Icon>edit</Icon>&nbsp;edit
            </SoftButton>
              
            </SoftBox>
             <SoftButton variant="text" color="info" onClick={() => handleUpdateStatus(item.columnName)}>
                <VaccinesIcon></VaccinesIcon>&nbsp;Done
              </SoftButton>
           
          </SoftBox>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" fontWeight="medium" color="text">
            Due Date :&nbsp;&nbsp;&nbsp; 
            <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                 {/* Display vaccine due date */}
                  {item.date.toLocaleDateString()}            
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
        <SoftBox mb={1} lineHeight={0}>
          {/* <SoftTypography variant="caption" fontWeight="medium" color="text">
            Type :&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              type
            </SoftTypography>
          </SoftTypography> */}
        </SoftBox>
      </SoftBox>       
      </SoftBox>    
       ))}   
      </SoftBox>
      </SoftBox>
       

      
      
    </Card>            
    </Grid> <Grid item xs={12} lg={5}> <Card> <Calendar  compact bordered renderCell={renderCell}  />  </Card> </Grid> </Grid>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
