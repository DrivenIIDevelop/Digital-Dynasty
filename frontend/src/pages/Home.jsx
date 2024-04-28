import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Solution from "../components/Solution";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div id="home">
      <Header />
      <Hero />
      <Services />
      <Solution />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Home;
