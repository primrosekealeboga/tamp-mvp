import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-blue-900 text-white p-6">

      <h2 className="text-2xl font-bold mb-8">
        TAMP
      </h2>

      <nav className="flex flex-col gap-4">

        <Link to="/dashboard" className="hover:text-blue-300">
          Dashboard
        </Link>

        <Link to="/loads" className="hover:text-blue-300">
          Load Posting
        </Link>

        <Link to="/trucks" className="hover:text-blue-300">
          Truck Posting
        </Link>

        <Link to="/matching" className="hover:text-blue-300">
          Matchmaking
        </Link>

        <Link to="/tracking" className="hover:text-blue-300">
          Tracking
        </Link>

      </nav>

    </div>
  );
}

export default Sidebar;