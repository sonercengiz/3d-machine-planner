import { useRef, useState, useEffect, useMemo } from "react";
import { Text, TransformControls } from "@react-three/drei";
import { useMainScene } from "../context/MainSceneContext";
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const Model = ({ id, path, position }) => {
  const ref = useRef();
  const transformRef = useRef();
  const scaleRef = useRef();
  const rotationRef = useRef();
  const { setIsOrbitEnabled, selectedModelId, setSelectedModelId, selectedTransformControl } = useMainScene();
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Asıl model yükleme
  const originalFBX = useLoader(FBXLoader, path);
  // Her bileşenin kendi kopyasını oluştur
  const fbx = useMemo(() => originalFBX.clone(), [originalFBX]);
  // Model ayarlama
  useEffect(() => {
    try {
      if (fbx) {
        console.log(`🎉 Model yüklendi: ${path}`);
        setModel(fbx.scene || fbx.children[0] || fbx);
        setLoading(false);
      }
    } catch (err) {
      console.error(`❌ Yükleme hatası: ${path}`, err);
      setError(err);
      setLoading(false);
    }
  }, [fbx, path]);



    useEffect(() => {
    if (selectedModelId !== id) return;
    
    const currentControl = 
      selectedTransformControl === "move" ? transformRef :
      selectedTransformControl === "scale" ? scaleRef :
      selectedTransformControl === "rotate" ? rotationRef :
      null;

    if (!currentControl?.current) return;

    const onDraggingChanged = (event) => {
      setIsOrbitEnabled(!event.value);
    };

    currentControl.current.addEventListener("dragging-changed", onDraggingChanged);

    return () => {
      currentControl.current?.removeEventListener("dragging-changed", onDraggingChanged);
    };
  }, [selectedModelId, selectedTransformControl, id, setIsOrbitEnabled]);

  if (loading) {
    return (
      <Text
        position={[0, 0, 0]} // Metnin sahnedeki konumu
        fontSize={0.5} // Metnin boyutu
        color="white" // Metnin rengi
        anchorX="center" // Yatay hizalama
        anchorY="middle" // Dikey hizalama
      >
        Loading
      </Text>
    );
  }

  if (error) {
    return (
      <group position={position}>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>
        <Text position={[0, 1.5, 0]} fontSize={0.2} color="black">
          Hata: {error.message.substring(0, 20)}...
        </Text>
      </group>
    );
  }

  return (
    <>
      <primitive
        ref={ref}
        object={model}
        scale={[1,1,1]}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedModelId(id)
        }}
        onPointerMissed={() => setSelectedModelId(null)}
      />

      {selectedModelId === id && (
        <>
          {selectedTransformControl === "move" && (
            <TransformControls
              ref={transformRef}
              object={ref.current}
              mode="translate"
              onDragStart={() => setIsOrbitEnabled(false)}
              onDragEnd={() => setIsOrbitEnabled(true)}
            />
          )}
          {selectedTransformControl === "scale" && (
            <TransformControls
              ref={scaleRef}
              object={ref.current}
              mode="scale"
              onDragStart={() => setIsOrbitEnabled(false)}
              onDragEnd={() => setIsOrbitEnabled(true)}
            />
          )}
          {selectedTransformControl === "rotate" && (
            <TransformControls
              ref={rotationRef}
              object={ref.current}
              mode="rotate"
              onDragStart={() => setIsOrbitEnabled(false)}
              onDragEnd={() => setIsOrbitEnabled(true)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Model;