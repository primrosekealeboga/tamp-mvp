import { createContext, useContext, useState } from "react";

const TAMPContext = createContext();

export function TAMPProvider({ children }) {
  const [loads, setLoads] = useState([
    {
      id: 1,
      pickup: "Johannesburg",
      destination: "Durban",
      cargoType: "Steel",
      weight: 20,
      truckType: "Flatbed",
    },
    {
      id: 2,
      pickup: "Pretoria",
      destination: "Cape Town",
      cargoType: "Food",
      weight: 12,
      truckType: "Refrigerated",
    },
  ]);

  const [trucks, setTrucks] = useState([
    {
      id: 1,
      registrationNumber: "AB 12 CD GP",
      driverName: "John Smith",
      truckType: "Flatbed",
      capacity: 25,
      currentLocation: "Johannesburg",
      destination: "Durban",
      availableDate: "2026-07-30",
      status: "Available",
    },
    {
      id: 2,
      registrationNumber: "XY 45 ZZ GP",
      driverName: "Sarah Molefe",
      truckType: "Refrigerated",
      capacity: 15,
      currentLocation: "Pretoria",
      destination: "Cape Town",
      availableDate: "2026-07-31",
      status: "Available",
    },
    {
      id: 3,
      registrationNumber: "LM 78 OP GP",
      driverName: "Peter Dube",
      truckType: "Flatbed",
      capacity: 10,
      currentLocation: "Johannesburg",
      destination: "Durban",
      availableDate: "2026-08-01",
      status: "Available",
    },
  ]);

  const [matchDecisions, setMatchDecisions] = useState({});

  const addLoad = (newLoad) => {
    const loadWithId = {
      ...newLoad,
      id: Date.now(),
      weight: Number(newLoad.weight),
    };

    setLoads((previousLoads) => [
      ...previousLoads,
      loadWithId,
    ]);
  };

  const deleteLoad = (loadId) => {
    setLoads((previousLoads) =>
      previousLoads.filter((load) => load.id !== loadId)
    );
  };

  const updateLoad = (loadId, updatedLoad) => {
    setLoads((previousLoads) =>
      previousLoads.map((load) =>
        load.id === loadId
          ? {
              ...updatedLoad,
              id: loadId,
              weight: Number(updatedLoad.weight),
            }
          : load
      )
    );
  };

  const addTruck = (newTruck) => {
    const truckWithId = {
      ...newTruck,
      id: Date.now(),
      capacity: Number(newTruck.capacity),
      status: newTruck.status || "Available",
    };

    setTrucks((previousTrucks) => [
      ...previousTrucks,
      truckWithId,
    ]);
  };

  const deleteTruck = (truckId) => {
    setTrucks((previousTrucks) =>
      previousTrucks.filter((truck) => truck.id !== truckId)
    );
  };

  const handleMatchDecision = (
    loadId,
    truckId,
    decision
  ) => {
    const decisionKey = `${loadId}-${truckId}`;

    setMatchDecisions((previousDecisions) => {
      if (decision === null) {
        const updatedDecisions = {
          ...previousDecisions,
        };

        delete updatedDecisions[decisionKey];

        return updatedDecisions;
      }

      return {
        ...previousDecisions,
        [decisionKey]: decision,
      };
    });
  };

  const value = {
    loads,
    trucks,
    matchDecisions,
    addLoad,
    deleteLoad,
    updateLoad,
    addTruck,
    deleteTruck,
    handleMatchDecision,
  };

  return (
    <TAMPContext.Provider value={value}>
      {children}
    </TAMPContext.Provider>
  );
}

export function useTAMP() {
  const context = useContext(TAMPContext);

  if (!context) {
    throw new Error(
      "useTAMP must be used inside a TAMPProvider"
    );
  }

  return context;
}