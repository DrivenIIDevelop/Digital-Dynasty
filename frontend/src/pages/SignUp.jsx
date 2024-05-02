import { Link, useNavigate } from "react-router-dom";
import LogoRegular from "../components/icons/LogoRegular";
import imageLoader from "../js/imageLoader";
import { useState } from "react";
import httpRequest from "../js/httpRequest";
import { PORT } from "../port";

const SignUp = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState(false);
  const [isUsernameDuplicated, setIsUsernameDuplicated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  // Start checking fields after form submission
  const [startChecking, setStartChecking] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles form submission, prevents default behavior, checks for duplication errors,
   * and updates state accordingly.
   *
   * @param {Event} e - The event object.
   * @return {void} - No return value.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStartChecking(true);
    setLoading(true);
    if (
      !isValidPhoneNumber ||
      !isValidUsername ||
      !isValidEmail ||
      isEmailDuplicated ||
      isUsernameDuplicated
    )
      return;

    const duplicationError = await httpRequest({
      url: `http://localhost:${PORT}/auth/signup`,
      http_method: "POST",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        firstName: e.target.firstName.value,
        lastName: e.target.lastName.value,
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        country: e.target.country.value,
        address: e.target.address.value,
        phone: e.target.phone.value,
        zipcode: e.target.zipcode.value,
      }),
    });
    // Handle duplication errors
    if (duplicationError?.error === "User with email already exists")
      setIsEmailDuplicated(true);
    if (duplicationError?.error === "User with username already exists")
      setIsUsernameDuplicated(true);
    // Navigate to login page
    console.log(duplicationError);
    if (!duplicationError?.error) navigate("/login");
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
                style={{
                  border:
                    isUsernameDuplicated || (!isValidUsername && startChecking)
                      ? "1px solid red"
                      : "",
                }}
                type="text"
                placeholder="John Doe"
                name="username"
                id="username"
                title="Username"
                onChange={(e) => {
                  setIsValidUsername(e.target.value.length >= 3);
                  setIsUsernameDuplicated(false);
                }}
                required
              />
              {isValidUsername || !startChecking ? (
                ""
              ) : (
                <span className="error">Invalid username</span>
              )}
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
                style={{
                  border:
                    (!isEmailDuplicated && isValidEmail) || !startChecking
                      ? ""
                      : "1px solid red",
                }}
                type="text"
                placeholder="john@example.com"
                name="email"
                id="email"
                title="Email"
                onChange={(e) => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  setIsValidEmail(emailRegex.test(e.target.value));
                  setIsEmailDuplicated(false);
                }}
                required
              />
              {isEmailDuplicated && (
                <span className="error">Email already exists</span>
              )}
              {!isValidEmail && startChecking && (
                <span className="error">Invalid email</span>
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
                onChange={(e) => {
                  if (e.target.value === "") return setIsValidPhoneNumber(true);
                  const phoneRegex = /^[0-9]{10}$/;
                  setIsValidPhoneNumber(phoneRegex.test(e.target.value));
                }}
                style={{
                  border:
                    !isValidPhoneNumber && startChecking ? "1px solid red" : "",
                }}
                required
              />
              {!isValidPhoneNumber && startChecking && (
                <span className="error">Invalid phone number</span>
              )}
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
              {loading === 2 ? "Loading..." : "Sign Up"}
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Log in</Link>
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
