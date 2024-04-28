import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="hero">
      <div className="container">
        <div className="text">
          <h1>Optimize business payments</h1>
          <p>
            Payment processing platform that facilitates transactions between
            businesses and their customers.
          </p>
          <button>
            <Link to="/signup">Open account</Link>
          </button>
        </div>
        <div className="image">
          <img src="/heroImage.png" loading="lazy" alt="hero" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
