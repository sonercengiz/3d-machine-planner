import { createContext, useContext, useState } from "react";

const MachineContext = createContext();

export const MachineProvider = ({ children }) => {
  const [modules, setModules] = useState([]);
  const [isOrbitEnabled, setIsOrbitEnabled] = useState(true); // OrbitControls yönetimi
  const [globalError, setGlobalError] = useState(null);

  const addModule = (module) => {
    setModules((prev) => [...prev, { id: Date.now(), ...module }]);
  };

  const clearError = () => setGlobalError(null);

  return (
    <MachineContext.Provider value={{
      modules,
      addModule,
      isOrbitEnabled,
      setIsOrbitEnabled,
      globalError,
      setGlobalError,
      clearError
    }}>
      {children}
    </MachineContext.Provider>
  );
};

export const useMachine = () => {
  return useContext(MachineContext);
};
