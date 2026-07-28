import { useState } from "react";

function LoadPosting() {

  const [loadData, setLoadData] = useState({
    pickup: "",
    destination: "",
    cargoType: "",
    weight: "",
    truckType: "",
    pickupDate: "",
  });

  const [loads, setLoads] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
 
  const handleDelete = (indexToDelete) => {
  const updatedLoads = loads.filter(
    (_, index) => index !== indexToDelete
  );

  setLoads(updatedLoads);
};

  const handleEdit = (index) => {
  setLoadData(loads[index]);
  setEditIndex(index);
  setIsEditing(true);
};

const handleSubmit = () => {
  if (
    !loadData.pickup ||
    !loadData.destination ||
    !loadData.cargoType ||
    !loadData.weight ||
    !loadData.truckType ||
    !loadData.pickupDate
  ) {
    alert("Please fill in all fields.");
    return;
  }

  console.log(loadData);

  if (isEditing) {
  const updatedLoads = [...loads];

  updatedLoads[editIndex] = loadData;

  setLoads(updatedLoads);

  setIsEditing(false);
  setEditIndex(null);

  alert("Load updated successfully!");
} else {
  setLoads([...loads, loadData]);

  alert("Load submitted successfully!");
}

  setLoadData({
    pickup: "",
    destination: "",
    cargoType: "",
    weight: "",
    truckType: "",
    pickupDate: "",
  });
};

  const filteredLoads = loads.filter((load) => {
  return (
    load.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
    load.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    load.cargoType.toLowerCase().includes(searchTerm.toLowerCase())
  );
});

  return (
  <div className="p-8 max-w-2xl mx-auto">
    <h1 className="text-3xl font-bold mb-6">
      Create New Load
    </h1>

    <div className="mb-4">
      <label className="block mb-2 font-medium">
        Pickup Location
      </label>

      <input
        type="text"
        placeholder="Enter pickup location"
        value={loadData.pickup}
        onChange={(e) =>
          setLoadData({
            ...loadData,
            pickup: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />
    </div>

    <div className="mb-4">
       <label className="block mb-2 font-medium">
        Destination
       </label>

       <input
        type="text"
        placeholder="Enter destination"
        value={loadData.destination}
        onChange={(e) =>
        setLoadData({
        ...loadData,
        destination: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />
</div>

<div className="mb-4">
  <label className="block mb-2 font-medium">
    Cargo Type
  </label>

  <input
    type="text"
    placeholder="Enter cargo type"
    value={loadData.cargoType}
    onChange={(e) =>
      setLoadData({
        ...loadData,
        cargoType: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />
</div>

<div className="mb-4">
  <label className="block mb-2 font-medium">
    Weight
  </label>

  <input
    type="text"
    placeholder="Enter weight"
    value={loadData.weight}
    onChange={(e) =>
      setLoadData({
        ...loadData,
        weight: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />
</div>

<div className="mb-4">
  <label className="block mb-2 font-medium">
    Truck Type
  </label>

  <input
    type="text"
    placeholder="Enter truck type"
    value={loadData.truckType}
    onChange={(e) =>
      setLoadData({
        ...loadData,
        truckType: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />
</div>

<div className="mb-6">
  <label className="block mb-2 font-medium">
    Pickup Date
  </label>

  <input
    type="date"
    value={loadData.pickupDate}
    onChange={(e) =>
      setLoadData({
        ...loadData,
        pickupDate: e.target.value,
      })
    }
    className="w-full border rounded-lg p-3"
  />
</div>

<button
  type="button"
  onClick={handleSubmit}
  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
>
  {isEditing ? "Update Load" : "Submit Load"}
</button>

<div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Submitted Loads
  </h2>

  <div className="mb-4">
  <input
    type="text"
    placeholder="Search loads..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full border rounded-lg p-3"
  />
</div>

   <table className="w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-200">
        <th className="border p-2">Pickup</th>
        <th className="border p-2">Destination</th>
        <th className="border p-2">Cargo</th>
        <th className="border p-2">Weight</th>
        <th className="border p-2">Truck</th>
        <th className="border p-2">Date</th>
        <th className="border p-2">Actions</th>
      </tr>
    </thead>

    <tbody>
       {filteredLoads.map((load, index) => (
        <tr key={index}>
          <td className="border p-2">{load.pickup}</td>
          <td className="border p-2">{load.destination}</td>
          <td className="border p-2">{load.cargoType}</td>
          <td className="border p-2">{load.weight}</td>
          <td className="border p-2">{load.truckType}</td>
          <td className="border p-2">{load.pickupDate}</td>
          <td className="border p-2">

  <td className="border p-2 space-x-2">
  <button
    onClick={() => handleEdit(index)}
    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(index)}
    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  >
    Delete
  </button>
</td>
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  </div>
);
}

export default LoadPosting;