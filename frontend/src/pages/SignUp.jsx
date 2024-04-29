import { Link } from "react-router-dom";
import LogoRegular from "../components/icons/LogoRegular";
import imageLoader from "../js/imageLoader";
import { useState } from "react";

const SignUp = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
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
                type="text"
                placeholder="John Doe"
                name="username"
                id="username"
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                placeholder="john@example.com"
                name="email"
                id="email"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                placeholder="Enter at least 8 characters"
                name="password"
                id="password"
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
