const Services = () => {
  return (
    <section id="services">
      <div className="container">
        <div className="text">
          <span>YOU CAN</span>
          <h2>
            <span className="highlight">Monitor</span> payments
          </h2>
          <p>
            View real-time updates on successful payments, refunds, and other
            transaction-related activities
          </p>
        </div>
        <div className="image">
          <img src="/services1.png" loading="lazy" alt="hero" />
        </div>
      </div>
      <div className="container">
        <div className="text">
          <span>YOU CAN</span>
          <h2>
            <span className="highlight">Manage</span> customers
          </h2>
          <p>
            View real-time updates on successful payments, refunds, and other
            transaction-related activities
          </p>
        </div>
        <div className="image">
          <img src="/services2.png" loading="lazy" alt="hero" />
        </div>
      </div>
    </section>
  );
};

export default Services;
