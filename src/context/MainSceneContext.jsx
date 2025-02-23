import { createContext, useContext, useEffect, useState } from "react";

const MainSceneContext = createContext();

export const MainSceneProvider = ({ children }) => {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [isOrbitEnabled, setIsOrbitEnabled] = useState(true); // OrbitControls yönetimi
  const [globalError, setGlobalError] = useState(null);

  const addModel = (model) => {
    setModels((prev) => [...prev, { id: Date.now(), ...model }]);
  };

  useEffect(() => {
    console.log(models);

  }, [models]);

  const clearError = () => setGlobalError(null);

  return (
    <MainSceneContext.Provider value={{
      models,
      addModel,
      selectedModelId,
      setSelectedModelId,
      isOrbitEnabled,
      setIsOrbitEnabled,
      globalError,
      setGlobalError,
      clearError
    }}>
      {children}
    </MainSceneContext.Provider>
  );
};

export const useMainScene = () => {
  return useContext(MainSceneContext);
};
