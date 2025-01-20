
import { Link } from "react-router-dom";
 import React from 'react';
 import VaccinesIcon from '@mui/icons-material/Vaccines';
import Grid from "@mui/material/Grid";
import { useState ,useEffect} from 'react';
import 'rsuite/Calendar/styles/index.css';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import CustomerSupport from "examples/Icons/CustomerSupport";
import Cube from "examples/Icons/Cube";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import Card from "@mui/material/Card";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SoftButton from "components/SoftButton";



function Dashboard() {
  const [data, setData] = useState(null);
  const pathParts = useLocation().pathname.split("/");
  const Id = pathParts[2];
  const [totalUsers, setTotalUsers] = useState(0);

   useEffect(() => {
    fetch('http://localhost:8080/vaccineStatusSummary')
      .then(response => response.json())
      .then(data => {
        setData(data);
        if (data.totalUsers) {
          setTotalUsers(data.totalUsers);
        }
      })      
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) return <div><h2>Loading... Fetching Data from Server.........</h2></div>;


  const triggerReminder = async () => {
    try {
      const response = await axios.post('http://localhost:8080/trigger_reminder');
      console.log("Reminder triggered  for all user");
    } catch (error) {
      console.error('There was an error triggering the reminder!', error);
      alert('Failed to trigger reminder.');
    }
  };

  const processData = (data, disease) => {
    const colors = {
      vaccinated: '#4edb5a',
      unvaccinated: '#db4edb',
      taken: '#58c9eb',
    };

    const order = ['vaccinated', 'unvaccinated', 'taken'];

    const sortedData = Object.keys(data)
      .filter(key => key.includes(disease))
      .map((key, index) => {
        const [name, status] = key.split('-');
        return {
          id: index,
          value: data[key],
          label: status,
          color: colors[status] || '#000000', 
        };
      })
      .sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label));
      return sortedData;

  };
  const diseases = ['Malaria', 'Tuberculosis','Hepatitis'];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox pt={4} px={5}>

        <SoftTypography variant="h3" fontWeight="medium">
        For Admins Only  
        
        </SoftTypography>
        
      </SoftBox> 
      <SoftBox py={3}>
         
<br></br>   
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} xl={3}>
               
              <MiniStatisticsCard
                title={{ text: "Total Number of Users" }}
                count={totalUsers}
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: <Cube size="18px" color="white" /> }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Verified" }}
                count='2'
                percentage={{ color: "success", text: "" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Pending Verification" }}
                count='8'
                percentage={{ color: "error", text: "" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Reminder Status" }}
                count="On"
                percentage={{ color: "success", text: "" }}
                icon={{
                  color: "info",
                  component: <CustomerSupport size="18px" color="white"/>,
                }}
              />
            </Grid> */}
            <Grid item xs={12} sm={6} xl={3}>
            <Card   sx={{
          backdropFilter: `saturate(200%) blur(30px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          // mt: -1,
          // mx: 3,
          py: 3,
          px: 2,
        }}> <SoftButton variant="text" color="info" onClick={triggerReminder} >
                <VaccinesIcon></VaccinesIcon>&nbsp;Send Reminder
              </SoftButton></Card></Grid>
           
          </Grid>
        </SoftBox>
    
        <SoftBox mb={2}>
          <Grid container spacing={2}>


           <Grid container spacing={2}>
        {diseases.map(disease => (
          <Grid item xs={12} lg={4} key={disease}>
            <Card id="delete-account">
            <SoftBox pt={4} px={3}>

            <SoftTypography variant="h3" fontWeight="medium">
            {disease}
              </SoftTypography></SoftBox>
              <PieChart
                series={[
                  { arcLabel: (item) => `${item.value}`,
                    arcLabelMinAngle: 15,
                    data: processData(data, disease),
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  },
                ]}
                sx={{
                  [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'black',
                    fontWeight: 'italic',
                  },
                }}
                height={200}
              />
            </Card>
          </Grid>
        ))}
      </Grid>


    </Grid>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
