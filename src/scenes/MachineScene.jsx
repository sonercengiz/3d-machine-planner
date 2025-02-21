import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, SoftShadows } from "@react-three/drei";
import { useState, useCallback } from "react";
import Module from "../modules/Module";

const MachineScene = () => {
  const [modules, setModules] = useState([]);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const moduleType = event.dataTransfer.getData("moduleType");
    if (!moduleType) return;

    // Yeni modülü rastgele bir konuma ekleyelim
    setModules((prev) => [
      ...prev,
      { id: Date.now(), type: moduleType, position: [0, 0, 0] },
    ]);
  }, []);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 5, 10] }}
      >
        <SoftShadows samples={10} size={20} />

        {/* Ortam ve yönlü ışıklar */}
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 10, 5]}
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />


        <OrbitControls />
        <gridHelper args={[20, 20]} />

        {/* Özel HDRI Laboratuvar Arka Planı */}
        {/* <Environment files="/src/assets/hdr/vintage_measuring_lab_1k.hdr" background /> */}

        {/* Yatay zemin */}
        <mesh receiveShadow position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="gray" />
        </mesh>

        {/* Modülleri sahnede göster */}
        {modules.map((mod) => (
          <Module key={mod.id} type={mod.type} position={mod.position} />
        ))}
      </Canvas>
    </div>
  );
};

export default MachineScene;
