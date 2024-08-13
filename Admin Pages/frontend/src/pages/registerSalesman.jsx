import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../component/header";
import Sidebar from "../component/sidear";
import { addSalesMan } from "../service/user";
import { useNavigate } from "react-router-dom";

function RegisterSalesPerson() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    confirmPassword: "",
    phoneNo: "",
    gender: "",
    userRole: "SALES",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const addSalesmanResult = await addSalesMan(formData);
        if (addSalesmanResult.status === 200) {
          toast.success("User Added Successfully!");
          navigate("/users")
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else {
          toast.error("Network error or server is down");
        }
      }
    } else {
      toast.error("Please fix the errors in the form");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-2">
          <Sidebar />
        </div>
        <div className="col ms-0">
          <Header />
          <main className="mt-4 container-fluid">
            <div className="container mt-4">
              <h2>Register New SalesPerson</h2>
              <form onSubmit={handleSubmit}>
                {Object.values(formErrors).length > 0 && (
                  <div className="alert alert-danger">
                    {Object.values(formErrors).map((error, index) => (
                      <div key={index}>{error}</div>
                    ))}
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNo">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNo"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  type="hidden"
                  name="userRole"
                  value={formData.userRole}
                />

                <button type="submit" className="btn btn-primary mt-3">
                  Register
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default RegisterSalesPerson;
