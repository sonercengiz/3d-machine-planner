import * as THREE from 'three'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, SoftShadows, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useState, useCallback, useEffect, Suspense } from "react";
import Model from "../modules/Model";
import { useMainScene } from '../context/MainSceneContext';

const MainScene = () => {
  const { models, addModel, isOrbitEnabled } = useMainScene();

  const handleDrop = useCallback(async (event) => {
    event.preventDefault();
    const modelId = event.dataTransfer.getData("modelId");
    const modelName = event.dataTransfer.getData("modelName");
    const modelPath = event.dataTransfer.getData("modelPath");

    try {
      // Path doğrulama
      const response = await fetch(modelPath);
      if (!response.ok) throw new Error("Dosya bulunamadı");

      addModel({ id: modelId, name: modelName, path: modelPath });
    } catch (err) {
      console.error("Model eklenemedi:", err);
      // Hata popup'ı tetikle (MachineContext üzerinden)
    }
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
        style={{ background: "#C4C4C4" }}
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

        {/* Küçük eksen yönlendirme aracı sağ alt köşeye eklendi */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>


        <OrbitControls enableRotate={isOrbitEnabled} enablePan={isOrbitEnabled}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            RIGHT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY
          }} />

        {/* Izgara çizgileri */}
        <gridHelper args={[100, 100]} />

        {/* Özel HDRI Laboratuvar Arka Planı */}
        {/* <Environment files="/assets/hdr/vintage_measuring_lab_1k.hdr" background /> */}

        {/* Yatay zemin */}
        {/* <mesh receiveShadow position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="gray" />
        </mesh> */}

        {/* Modülleri sahnede göster */}
        <Suspense fallback={
          null
        }>
          {models.map((model) => (
            <Model
              key={model.id} // Path değişikliklerini takip etmek için
              id={model.id}
              path={model.path}
              position={model.position}
              scale={model.scale}
              rotation={model.rotation}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default MainScene;
