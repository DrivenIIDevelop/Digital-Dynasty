import HomeHeader from "../components/HomeHeader";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Solution from "../components/Solution";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div id="home">
      <HomeHeader />
      <Hero />
      <Services />
      <Solution />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Home;
