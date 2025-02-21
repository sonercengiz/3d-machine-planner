import { createContext, useContext, useState } from "react";

const MachineContext = createContext();

export const MachineProvider = ({ children }) => {
  const [modules, setModules] = useState([]);

  const addModule = (module) => {
    setModules((prev) => [...prev, { id: Date.now(), ...module }]);
  };

  return (
    <MachineContext.Provider value={{ modules, addModule }}>
      {children}
    </MachineContext.Provider>
  );
};

export const useMachine = () => {
  return useContext(MachineContext);
};
