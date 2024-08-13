import Sidebar from "../component/sidear";
import Header from "../component/header";
import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../service/user";
import { toast } from "react-toastify";

function Settings() {
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        email: '',
        phoneNo: '',
        gender: '',
        profilePicture: null, 
        existingProfilePicture: '', 
    });

    useEffect(() => {
        // Fetch user profile data on component mount
        const fetchUserProfile = async () => {
            try {
                const response = await getProfile();
                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    toast.error("Failed to fetch user profile");
                }
            } catch (error) {
                toast.error("Error fetching user profile");
            }
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                dob: userData.dob ? userData.dob.toString().split('T')[0] : '', // Convert LocalDate to string format
                email: userData.email || '',
                phoneNo: userData.phoneNo || '',
                gender: userData.gender || '',
                profilePicture: null,
                existingProfilePicture: userData.profilePicture || '',
            });
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            profilePicture: file,
        }));
    };

    const handleSave = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('firstName', formData.firstName);
            formDataToSend.append('lastName', formData.lastName);
            formDataToSend.append('dob', formData.dob);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phoneNo', formData.phoneNo);
            formDataToSend.append('gender', formData.gender);
            if (formData.profilePicture) {
                formDataToSend.append('profilePicture', formData.profilePicture);
            }
            const updationResult = await updateProfile(formDataToSend);
            if (updationResult.status === 202) {
                toast.success("Profile updated successfully");
            } else {
                toast.error("Failed to update profile");
            }
        } catch (error) {
            toast.error("Error updating profile");
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
                        <div className="user-profile container-fluid">
                            <h2>User Profile</h2>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="profile-picture">
                                        {formData.profilePicture ? (
                                            <img
                                                src={URL.createObjectURL(formData.profilePicture)}
                                                alt="Profile"
                                                className="img-fluid rounded-circle"
                                            />
                                        ) : formData.existingProfilePicture ? (
                                            <img
                                                src={formData.existingProfilePicture}
                                                alt="Profile"
                                                className="img-fluid rounded-circle"
                                            />
                                        ) : (
                                            <div className="placeholder-img">
                                                <i className="fas fa-user-circle fa-5x"></i>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="form-control mt-3"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            type="date"
                                            name="dob"
                                            value={formData.dob}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            type="text"
                                            name="phoneNo"
                                            value={formData.phoneNo}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="form-control"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Other</option>
                                        </select>
                                    </div>
                                    <button onClick={handleSave} className="btn btn-primary mt-3">
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Settings;
