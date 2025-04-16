import * as THREE from 'three'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, SoftShadows, GizmoHelper, GizmoViewport, MeshReflectorMaterial } from "@react-three/drei";
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
        {/* <SoftShadows samples={10} size={20} /> */}

        {/* Ortam ve yönlü ışıklar */}
        <ambientLight intensity={0.8} />
        <directionalLight
          castShadow
          intensity={0.8}
        />
        {/* <spotLight
          castShadow
          position={[1, 5, 1]}
          intensity={10}
          angle={0.8}

          shadow-bias={-0.0001}      // Gölge hatalarını azaltmak için
        /> */}



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
        {/* <gridHelper args={[100, 100]} /> */}

        {/* Özel HDRI Laboratuvar Arka Planı */}
        <Environment files="/assets/hdr/peppermint_powerplant_2_1k.hdr" background />

        {/* Yatay zemin */}
        {/* <mesh receiveShadow position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="green" />
        </mesh> */}

        {/* Zeminde yansıma efekti için Reflector */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <MeshReflectorMaterial
            blur={[300, 100]}          // Yansımanın bulanıklığı (opsiyonel)
            resolution={1024}          // Yansıma dokusunun çözünürlüğü
            mixBlur={1}                // Blur karışım gücü
            mixStrength={2}            // Yansımaların yoğunluğu
            depthScale={1}             // Derinlik ölçeği
            minDepthThreshold={0.4}    // Minimum derinlik eşik değeri
            maxDepthThreshold={1.25}   // Maksimum derinlik eşik değeri
            color="#888"               // Zeminin rengi
            metalness={0.5}            // Metalik parlaklık
            roughness={1}              // Yüzey pürüzlülüğü
          />
        </mesh>


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
