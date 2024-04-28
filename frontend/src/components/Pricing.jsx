import PriceCard from "./PriceCard";

const Pricing = () => {
  return (
    <div id="pricing">
      <h2>PRICING</h2>
      <div className="container">
        <PriceCard
          isPopular={false}
          title="PERSONAL"
          description="Perfect for side or hobby projects"
          priceStructure="4%"
          billingTerm="Service fee Payment"
          isLastFeature={false}
        />
        <PriceCard
          isPopular={true}
          title="Start up"
          description="Perfect for small teams"
          priceStructure="5%"
          billingTerm="Service fee Payment"
          isLastFeature={true}
        />
        <PriceCard
          isPopular={false}
          title="Organization"
          description="Perfect for organizations"
          priceStructure="$150"
          billingTerm="Month"
          isLastFeature={true}
        />
      </div>
    </div>
  );
};

export default Pricing;
