import ClientsComp from "../components/ClientsComp";
import DashboardHeader from "../components/DashboardHeader";
import VendorsComp from "../components/VendorsComp";

const Partnership = () => {
  return (
    <div id="partnership">
      <DashboardHeader currentPage="Partnership" />
      <h1 className="title">Partnership</h1>
      <ClientsComp />
      <VendorsComp />
    </div>
  );
};

export default Partnership;
