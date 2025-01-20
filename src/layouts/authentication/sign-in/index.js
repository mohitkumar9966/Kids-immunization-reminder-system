import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved6 from "assets/images/curved-images/curved-6.jpg";
function SignIn() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const handleClick=(e)=>{
    e.preventDefault()
    //  window.location.href = '/dashboard/25';

    const loginuser={email,password}
    console.log(loginuser)
    axios.post("http://localhost:8080/authentication/sign-in",loginuser)
    .then((response) => {
      const responseData = response.data;
      if (responseData) {
        window.location.href = '/dashboard/' + responseData;
      console.log("successfull login")


      } else {
          window.alert("Invalid credentials. Please try again.");
      }
  })
  .catch((error) => {
      console.error("Error occurred during login:", error);
      window.alert("Invalid credentials... Please try again later.");
  });
  }

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
    image={curved6}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
             
              
          />        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />        
          </SoftBox>
       
        <SoftBox mt={4} mb={1}>
        <Link to="/dashboard">

          <SoftButton variant="gradient" color="info" fullWidth onClick={handleClick}>
            sign in
          </SoftButton>
          </Link>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
