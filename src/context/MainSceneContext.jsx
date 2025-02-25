import { createContext, useContext, useEffect, useState } from "react";
import { loadAssembly, saveAssembly } from "../services/AssemblyService";

const MainSceneContext = createContext();

export const MainSceneProvider = ({ children }) => {
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedModelDimensions, setSelectedModelDimensions] = useState(null);
  const [isOrbitEnabled, setIsOrbitEnabled] = useState(true); // OrbitControls yönetimi
  const [selectedTransformControl, setSelectedTransformControl] = useState("move"); // move, rotate, scale
  const [globalError, setGlobalError] = useState(null);

  const addModel = ({ id, name, path, position = [0,0,0], scale = [1,1,1], rotation=[0,0,0] }) => {
    setModels((prev) => [...prev, { id: `${Date.now()};${id}`, name, path, position, scale, rotation }]);
  };

  // Service Katmanı: Kaydet
  const saveCurrentAssembly = async () => {
    try {
      // "models" array'ini assemblyService'e gönder
      await saveAssembly(models);
      console.log(">>> [saveCurrentAssembly] Kayıt işlemi tamam!");
    } catch (error) {
      console.error(">>> [saveCurrentAssembly] hata:", error);
      setGlobalError(error.message);
    }
  };

  // Service Katmanı: Yükle
  const loadAssemblyFromFile = async () => {
    try {
      const data = await loadAssembly(); // { timestamp, models: [...] }
      if (!data) return;
      // data.models -> [{id, path, position}, ...]

      // Mevcut modelleri sıfırlayalım
      setModels([]);
      // Yüklenen modelleri ekleyelim
      data.models.forEach((m) => {
        // m = { id, path, position }
        setModels((prev) => [...prev, m]);
      });
      console.log(">>> [loadAssemblyFromFile] Yükleme tamam!", data);
    } catch (error) {
      console.error(">>> [loadAssemblyFromFile] hata:", error);
      setGlobalError(error.message);
    }
  };

  const clearError = () => setGlobalError(null);

  return (
    <MainSceneContext.Provider value={{
      models,
      addModel,
      selectedModelId,
      setSelectedModelId,
      isOrbitEnabled,
      setIsOrbitEnabled,
      selectedTransformControl,
      setSelectedTransformControl,
      globalError,
      setGlobalError,
      clearError,
      saveCurrentAssembly,        // <-- export ettiğimiz yeni fonksiyon
      loadAssemblyFromFile,       // <-- export ettiğimiz yeni fonksiyon
      selectedModelDimensions,
      setSelectedModelDimensions
    }}>
      {children}
    </MainSceneContext.Provider>
  );
};

export const useMainScene = () => {
  return useContext(MainSceneContext);
};
