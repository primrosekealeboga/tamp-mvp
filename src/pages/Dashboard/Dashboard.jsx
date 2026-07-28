import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-8">

          <h2 className="text-3xl font-bold mb-6">
            Dashboard Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500">🚛 Total Trucks</h3>
              <p className="text-3xl font-bold mt-2">125</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500">📦 Active Loads</h3>
              <p className="text-3xl font-bold mt-2">87</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500">🤝 Successful Matches</h3>
              <p className="text-3xl font-bold mt-2">56</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500">🚚 Available Trucks</h3>
              <p className="text-3xl font-bold mt-2">69</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500">📍 Deliveries In Progress</h3>
              <p className="text-3xl font-bold mt-2">23</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-gray-500">👨‍✈️ Active Drivers</h3>
              <p className="text-3xl font-bold mt-2">41</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;