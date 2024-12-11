"use client";
import React, { useState } from "react";
import { postData } from "../utils/apiHelper";
import "../css/loginform.css";
import { useRouter } from "next/navigation";
import { apiEndPoint } from "../common/apiEndpoint";
import Cookies from "js-cookie";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registrationPageRedirection = () => {
    router.push("/user-registration");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await postData(apiEndPoint?.userLogin, formData);
      if (response?.status === 200) {
        Cookies.set("roleId", response?.data?.roleId, { expires: 1 });
        Cookies.set("authToken", response?.data?.token, { expires: 1 });
        router.push("/home-page");
      }
    } catch (error) {
      setErrorMessage(error.message);
      alert("Error during login: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <p onClick={registrationPageRedirection}>New user? Click here</p>
      <div className="errormessage">{errorMessage}</div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
