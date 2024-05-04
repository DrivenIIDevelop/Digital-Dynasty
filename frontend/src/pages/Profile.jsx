import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import { PORT } from "../port";
import httpRequest from "../js/httpRequest";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [previousUserData, setPreviousUserData] = useState(false);
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const checkIsDataChanged = (e) => {
    const isDataChanged =
      e?.username.value !== previousUserData.username ||
      e?.email.value !== previousUserData.email ||
      e?.phone.value !== previousUserData.phone ||
      e?.address.value !== previousUserData.address ||
      e?.country.value !== previousUserData.country ||
      e?.zipcode.value !== previousUserData.zipcode;
    return isDataChanged;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber || !isValidUsername || !isValidEmail) return;
    // check if the data in userData is diffrent from the data in localStorage
    const isDataChanged = checkIsDataChanged(e.target);
    if (!isDataChanged) return;
    const data = {
      username: userData?.username,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
      country: userData?.country,
      zipcode: userData?.zipcode,
      address: userData?.address,
      phone: userData?.phone,
    };
    const response = await httpRequest({
      url: `http://localhost:${PORT}/user/profile/${localStorage.getItem(
        "userId"
      )}`,
      http_method: "PUT",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify(data),
    });
    if (response?.error) return;
    console.log(response);
    setUserData(data);
    setPreviousUserData(data);
    setIsDataUpdated(true);
    setTimeout(() => {
      setIsDataUpdated(false);
    }, 1000);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await httpRequest({
        url: `http://localhost:${PORT}/user/profile/${localStorage.getItem(
          "userId"
        )}`,
        http_method: "GET",
        request_headers: {},
      });
      setUserData(data);
      setPreviousUserData(data);
    };

    return () => fetchProfile();
  }, []);

  return (
    <div id="profile">
      <DashboardHeader currentPage="Profile" />
      <div className="container">
        <h1 className="title">Profile</h1>
        <p className="description">View and manage your account details.</p>
        {userData && (
          <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="username">
              <span>Username</span>
              <input
                type="text"
                style={{
                  border: !isValidUsername ? "1px solid red" : "",
                }}
                id="username"
                name="username"
                placeholder="Enter your username"
                value={userData?.username}
                onChange={(e) => {
                  setUserData({ ...userData, username: e.target.value });
                  setIsValidUsername(e.target.value.length >= 3);
                }}
                required
              />
              {isValidUsername ? (
                ""
              ) : (
                <span className="error">Invalid username</span>
              )}
            </label>
            <div className="form-group">
              <label htmlFor="firstName">
                <span>First name</span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={userData?.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                  required
                />
              </label>
              <label htmlFor="lastName">
                <span>Last name</span>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={userData?.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <label htmlFor="email">
              <span>Email</span>
              <input
                type="email"
                style={{
                  border: isValidEmail ? "" : "1px solid red",
                }}
                id="email"
                name="email"
                placeholder="Enter your email"
                value={userData?.email}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });

                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setIsValidEmail(emailRegex.test(e.target.value));
                }}
                required
              />
              {!isValidEmail && <span className="error">Invalid email</span>}
            </label>
            <div className="form-group">
              <label htmlFor="country">
                <span>Country</span>
                <input
                  type="text"
                  id="country"
                  name="country"
                  placeholder="Enter your country"
                  value={userData?.country}
                  onChange={(e) =>
                    setUserData({ ...userData, country: e.target.value })
                  }
                  required
                />
              </label>
              <label htmlFor="zipcode">
                <span>Zip code</span>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  placeholder="Enter your zip code"
                  value={userData?.zipcode}
                  onChange={(e) =>
                    setUserData({ ...userData, zipcode: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <label htmlFor="address">
              <span>Address</span>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={userData?.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
                required
              />
            </label>
            <label htmlFor="phone">
              <span>Phone</span>
              <input
                type="text"
                style={{
                  border: !isValidPhoneNumber ? "1px solid red" : "",
                }}
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={userData?.phone}
                onChange={(e) => {
                  setUserData({ ...userData, phone: e.target.value });
                  if (e.target.value === "") return setIsValidPhoneNumber(true);
                  const phoneRegex = /^[0-9]{10}$/;
                  setIsValidPhoneNumber(phoneRegex.test(e.target.value));
                }}
                required
              />
              {!isValidPhoneNumber && (
                <span className="error">Invalid phone number</span>
              )}
            </label>
            <button
              className={`submit ${isDataUpdated ? "updated" : ""}`}
              disabled={
                !isValidUsername || !isValidEmail || !isValidPhoneNumber
              }
              type="submit"
            >
              {isDataUpdated ? "Data updated" : "Save changes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
