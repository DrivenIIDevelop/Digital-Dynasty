import { Link } from "react-router-dom";
import LogoRegular from "../components/icons/LogoRegular";
import imageLoader from "../js/imageLoader";
import { useState } from "react";
import { PORT } from "../port";

const SignUp = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [isUsernameDuplicated, setIsUsernameDuplicated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:${PORT}/auth/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        country: e.target.country.value,
        address: e.target.address.value,
        zipcode: e.target.zipcode.value,
        phone: e.target.phone.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data?.error) throw data;
        // Navigate to login page
      })
      .catch((err) => {
        if (err?.error === "User with email already exists")
          setIsEmailDuplicated(true);
        if (err?.error === "User with username already exists")
          setIsUsernameDuplicated(true);
      });
  };

  return (
    <div id="signup">
      <div className="container">
        <div className="text">
          <LogoRegular />
          <h1 className="title">
            CREATE <br />
            <span>PAYMAVEN</span> ACCOUNT
          </h1>
          <form onSubmit={handleSubmit} className="form">
            <label htmlFor="username">
              Username
              <input
                style={{ border: isUsernameDuplicated ? "1px solid red" : "" }}
                type="text"
                placeholder="John Doe"
                name="username"
                id="username"
                title="Username"
                required
              />
              {isUsernameDuplicated && (
                <span className="error">Username already exists</span>
              )}
            </label>
            <div className="holder">
              <label htmlFor="firstName">
                First Name
                <input
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  id="firstName"
                  title="First Name"
                  required
                />
              </label>
              <label htmlFor="lastName">
                Last Name
                <input
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  id="lastName"
                  title="Last Name"
                  required
                />
              </label>
            </div>
            <label htmlFor="email">
              Email
              <input
                style={{ border: isEmailDuplicated ? "1px solid red" : "" }}
                type="email"
                placeholder="john@example.com"
                name="email"
                id="email"
                title="Email"
                onChange={() => setIsEmailDuplicated(false)}
                required
              />
              {isEmailDuplicated && (
                <span className="error">Email already exists</span>
              )}
            </label>
            <div className="holder">
              <label htmlFor="country">
                Country
                <input
                  type="text"
                  placeholder="Enter your country"
                  name="country"
                  id="country"
                  title="Country"
                  required
                />
              </label>
              <label htmlFor="zipcode">
                Zipcode
                <input
                  type="text"
                  placeholder="Enter your zipcode"
                  name="zipcode"
                  id="zipcode"
                  title="Zipcode"
                  required
                />
              </label>
            </div>
            <label htmlFor="address">
              Address
              <input
                type="text"
                placeholder="Enter your address"
                name="address"
                id="address"
                title="Address"
                required
              />
            </label>
            <label htmlFor="phone">
              Phone
              <input
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                id="phone"
                title="Phone"
                required
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                placeholder="Enter at least 8 characters"
                name="password"
                id="password"
                title="Password"
                minLength="8"
                required
              />
            </label>
            <button className="submit" type="submit">
              Sign Up
            </button>
          </form>
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
        <div className="carousel">
          <div className="inner-carousel">
            {imageLoader.map((image, index) => (
              <div
                style={{
                  transform: `translateX(-${imageIndex * 100}%)`,
                  transition: "all 0.5s ease-in-out",
                }}
                key={index}
                className="item"
              >
                <img loading="lazy" src={image.src} alt={image.title} />
                <h2 className="title">{image.title}</h2>
                <div className="description">{image.description}</div>
              </div>
            ))}
          </div>
          <div className="carousel-control">
            <button
              className="arrow"
              onClick={() =>
                imageIndex === 0
                  ? setImageIndex(imageLoader.length - 1)
                  : setImageIndex(imageIndex - 1)
              }
            >
              &larr;
            </button>
            {imageLoader.map((_, index) => (
              <button
                key={index}
                className={`bullet ${imageIndex === index ? "active" : ""}`}
                onClick={() => setImageIndex(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
            <button
              className="arrow"
              onClick={() =>
                imageIndex === imageLoader.length - 1
                  ? setImageIndex(0)
                  : setImageIndex(imageIndex + 1)
              }
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
