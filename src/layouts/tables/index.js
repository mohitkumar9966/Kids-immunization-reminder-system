import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import axios from "axios";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import SoftBadge from "components/SoftBadge";
import SoftProgress from "components/SoftProgress";
import { useLocation, Link } from "react-router-dom";



function Tables() {
  const pathParts = useLocation().pathname.split("/");
  const Id = pathParts[2];
  
  console.log("ID from context:", Id);


  const [vaccineData, setVaccineData] = useState([]);
  const rows = [];
const vaccineKeys = Object.keys(vaccineData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tables/${Id}`);
        setVaccineData(response.data);
        console.log("responsedata:",response.data)
      } catch (error) {
        console.error("Error fetching vaccine data:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { name: "Vaccines", align: "left" },
    { name: "status", align: "center" },
    { name: "Date", align: "center" },
    { name: "Type", align: "center" },
  ];

  vaccineKeys.sort((a, b) => {
    const numA = parseInt(a.substring(7));
    const numB = parseInt(b.substring(7));
    return numA - numB;
  });


  vaccineKeys.forEach((key) => {
    if (key.startsWith("Vaccine")) {
      const vaccineNumber = key.substring(7); 
      const statusKey = `vaccine${vaccineNumber}Status`; 
      const dateKey = `Vaccine${vaccineNumber}`;
  
      if (vaccineData.hasOwnProperty(statusKey) && vaccineData.hasOwnProperty(dateKey)) {
        const vaccineName = vaccineData[key];
        const status = vaccineData[statusKey] ? "Taken" : "Pending"; 
        const date = vaccineData[dateKey];
        
  
    
    rows.push( {
      Vaccines: (
        <SoftBox display="flex" alignItems="center" px={3} py={0.5}>
          <SoftBox display="flex" flexDirection="column">
          
            <SoftTypography variant="button" fontWeight="medium">
            {key}
            </SoftTypography>
                   </SoftBox>
        </SoftBox>
      ),
      status: (
        <SoftBadge variant="gradient" badgeContent= {status}  color="info" size="xs" container />
      ),
      Date: (
     <SoftTypography variant="caption" color="secondary" fontWeight="medium">  {date instanceof Date ? date.toLocaleDateString() : date}        </SoftTypography>
      ),
      Type: (
        <SoftTypography
           
            variant="caption"
          color="secondary"
          fontWeight="medium"
        > Govt
           
        </SoftTypography>
      ),
      completion: (
        <SoftBox display="flex" alignItems="center">
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            75%&nbsp;
          </SoftTypography>
          <SoftBox width="8rem">
            <SoftProgress value="75" color="info" variant="gradient" label={false} />
          </SoftBox>
        </SoftBox>
      ),
    });}}
  });
   
   
   
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Vaccination Table </SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Tables;