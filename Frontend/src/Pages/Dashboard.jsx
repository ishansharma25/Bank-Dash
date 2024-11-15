// Main Dashboard Component
import Transfer from "@/Component/Transfer";
const Dashboard = ({ userData }) => {

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
     
      <Transfer userData={userData} />
    </div>
  );
};

export default Dashboard;