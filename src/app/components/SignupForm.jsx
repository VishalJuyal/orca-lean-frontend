"use client";
import React, { useState } from "react";
import { postData } from "../utils/apiHelper";
import { apiEndPoint } from "../common/apiEndpoint";
import { useRouter } from "next/navigation";
import "../css/signupform.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    designation: "viewer",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roleMapping = {
        admin: 1,
        editor: 3,
        viewer: 2,
      };

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        roleId: roleMapping[formData.designation],
      };

      const response = await postData(apiEndPoint?.userRegister, payload);
      if (response.status === 200) {
        router.push("/user-login");
      }
    } catch (error) {
      alert("Error during registration: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h1 className="form-title">Signup</h1>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Designation</label>
        <select
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
        </select>
      </div>
      <button type="submit" className="submit-btn">
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
