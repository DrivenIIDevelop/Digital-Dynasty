import DashboardHeader from "../components/DashboardHeader";
import InvoicesComp from "../components/InvoicesComp";
import PaymentComp from "../components/PaymentComp";

const Transfer = () => {
  return (
    <div id="transfer">
      <DashboardHeader currentPage="Transfer" />
      <h1 className="title">Transfer</h1>
      <PaymentComp />
      <InvoicesComp />
    </div>
  );
};

export default Transfer;
