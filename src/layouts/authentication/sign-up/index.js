
import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import curved0 from "assets/images/curved-images/curved0.jpg";

function SignUp() {

  const [name,setName]=useState('')
  const [number,setNumber]=useState('')
  const [email,setEmail]=useState('')
  const [child_name,setChild_name]=useState('')
  const [parent_gender,setparent_gender]=useState('')
  const [password,setPassword]=useState('')
  const [relation,setRelation]=useState('')
  const [gender,setGender]=useState('')
  const [parent_dob,setParent_dob]=useState('')
  const [child_dob,setChild_dob]=useState('')
  const [bgp,setBgp]=useState('')
  const [h_condition,setH_condition]=useState('')
  const [born_in_months,setBorn_in_months]=useState('')
  const [p_history,setP_history]=useState('')
  const [message, setMessage] = useState('');


 //   fetch("http://localhost:8080/authentication/sign-up",{
  //        method:"POST",
  //        headers:{"Content-Type":"application/json"},
  //        body:JSON.stringify(user)

  // })
  


 

  const handleClick=(e)=>{
    e.preventDefault()
    const user={name,number,email,child_name,parent_gender,relation,gender,parent_dob,child_dob,bgp,h_condition,born_in_months,p_history,password}
    for (const [key, value] of Object.entries(user)) {
      if (!value) {
          window.alert(`${key.replace(/_/g, ' ')} is required`);
          return;
      }
  }
    console.log(user)
 
    axios.post("http://localhost:8080/authentication/sign-up", user)
    .then(response => {
        console.log("New user added");
        window.alert('User created successfully');
        setTimeout(() => {
            location.href = '/authentication/sign-in';
        }, 300);
    })
    .catch(error => {
        if (error.response && error.response.status === 409) {
            window.alert('Email is already in use');
        } else {
            window.alert('An error occurred. Please try again.');
        }
    });
};


  return (
    <BasicLayout
      title="Welcome!"
      description=""
      image={curved0}
    >
      <Card>

        <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h1" fontWeight="medium">
            Register
          </SoftTypography>
        </SoftBox>
        
        <SoftBox pt={1} pb={3} px={5} >
        <Grid container spacing={1}>
          
      
          
            <SoftBox mb={5} p={1}><SoftTypography component="label" variant="caption" fontWeight="bold">
              Name
            </SoftTypography>
            <SoftInput
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
             
              
          />           
           </SoftBox>
           <SoftBox mb={5} p={1}><SoftTypography component="label" variant="caption" fontWeight="bold">
              Number
            </SoftTypography>
            <SoftInput
            type="number"
            name="number"
            placeholder="Phone Number"
            value={number}
            onChange={(e)=>setNumber(e.target.value)}
             
            pattern="\d{10}"
            title="Please enter a 10-digit phone number"
              
          />
          
            </SoftBox>
            <SoftBox mb={5} p={1}><SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
            <SoftInput
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             
              
          />
                      </SoftBox> 
             <SoftBox mb={5}p={1}><SoftTypography component="label" variant="caption" fontWeight="bold">
              Child Name
            </SoftTypography>
            <SoftInput
            type="text"
            name="child name"
            placeholder="Child name"
            value={child_name}
            onChange={(e)=>setChild_name(e.target.value)}
          
          />
                      </SoftBox> 
                      <SoftBox mb={5} p={1}><SoftTypography component="label" variant="caption" fontWeight="bold">
             Parent Gender 
            </SoftTypography>
            <SoftInput
            type="text"
            name="Parent Gender"
            placeholder="Parent Gender"
            value={parent_gender}
            onChange={(e)=>setparent_gender(e.target.value)}
             
              
          />
             </SoftBox> 
             <SoftBox mb={5} p={1}><SoftTypography component="label" variant="caption" fontWeight="bold">
              Childs Gender
            </SoftTypography>
            <SoftInput
            type="text"
            name="gender"
            placeholder="Child's Gender"
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
             
              
          />
             </SoftBox>
                        
          
             <SoftBox mb={5} p={1}><SoftTypography component="label" variant="caption" fontWeight="bold">
              Relation
            </SoftTypography>
            <SoftInput
            type="text"
            name="relation"
            placeholder="Relation"
            value={relation}
            onChange={(e)=>setRelation(e.target.value)}
             
              
          />
             </SoftBox> 
            
             <SoftBox mb={5} p={1}>
             <SoftTypography component="label" variant="caption" fontWeight="bold">
              Blood Group (Child)
            </SoftTypography>
            <SoftInput
            type="text"
            name="bloodgroup"
            placeholder="Blood Group"
            value={bgp}
            onChange={(e)=>setBgp(e.target.value)}
             
              
          />
             </SoftBox> 
             <SoftBox mb={5} p={1}>
             <SoftTypography component="label" variant="caption" fontWeight="bold">
              Any Health Conditions
            </SoftTypography>
            <SoftInput
            type="text"
            name="h_condition"
            placeholder="Health Condition"
            value={h_condition}
            onChange={(e)=>setH_condition(e.target.value)}
             
              
          />
             </SoftBox> 

             <SoftBox mb={5} p={1}>
             <SoftTypography component="label" variant="caption" fontWeight="bold">
              Born in months?
            </SoftTypography>
            <SoftInput
            type="number"
            name="born in month"
            placeholder="Born in Month"
            value={born_in_months}
            onChange={(e)=>setBorn_in_months(e.target.value)}
             
            
          />
             </SoftBox> 
             
             <SoftBox mb={5} p={1}>
             <SoftTypography component="label" variant="caption" fontWeight="bold">
              Previous History
            </SoftTypography>
            <SoftInput
            type="text"
            name="p_history"
            placeholder="P history"
            value={p_history}
            onChange={(e)=>setP_history(e.target.value)}
             
              
          />
             </SoftBox> 
          
            <SoftBox mb={5} p={1}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
             Password
            </SoftTypography>
            <SoftInput
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
             
              
          />
       
                      </SoftBox>
                      <SoftBox mb={2} p={2} width="300px"><SoftTypography component="label" variant="caption" fontWeight="bold">
              Parent Dob
            </SoftTypography>
            <SoftInput
            type="date"
            name="userdob"
            placeholder="Your Date of Birth"
            value={parent_dob}
            onChange={(e)=>setParent_dob(e.target.value)}
             
              
          />
                 </SoftBox> 
          <SoftBox mb={2} p={2} width="300px"> <SoftTypography component="label" variant="caption" fontWeight="bold">
              Child  Dob
            </SoftTypography>
            <SoftInput
            type="date"
            name="childdob"
            placeholder=" Child Date of Birth"
            value={child_dob}
            onChange={(e)=>setChild_dob(e.target.value)}
             required
              
          />
          </SoftBox> 
             </Grid>
                     
            <SoftBox mt={4} mb={1}>
              <SoftButton type="submit"  color="dark" onClick={handleClick} >
                sign up
                </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Already have an account?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Sign in
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          
        </SoftBox>
       
       
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
