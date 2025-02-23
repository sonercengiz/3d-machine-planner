import { useRef, useState, useEffect } from "react";
import { Text, TransformControls } from "@react-three/drei";
import { useMainScene } from "../context/MainSceneContext";
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const Model = ({ id, path, position }) => {
  const ref = useRef();
  const transformRef = useRef();
  const scaleRef = useRef();
  const rotationRef = useRef();
  const { setIsOrbitEnabled, selectedModelId, setSelectedModelId } = useMainScene();
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Model yükleme işlemi
  const fbx = useLoader(FBXLoader, path);
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
    if (!transformRef.current || !scaleRef.current || !rotationRef.current) return;

    // Başlangıç (fare basılıp sürükleme başlayınca)
    const onTransformStart = () => {
      setIsOrbitEnabled(false);
    };

    // Bitiş (fare bırakılınca)
    const onTransformEnd = () => {
      setIsOrbitEnabled(true);
    };

    // Her karede transform değişikliği (sürükleme devam ederken)
    const onTransformChange = () => {
      if (ref.current) {
        const { x, y, z } = ref.current.position;
      }
    };

    transformRef.current.addEventListener("mouseDown", onTransformStart);
    transformRef.current.addEventListener("mouseUp", onTransformEnd);
    transformRef.current.addEventListener("change", onTransformChange);

    scaleRef.current.addEventListener("mouseDown", onTransformStart);
    scaleRef.current.addEventListener("mouseUp", onTransformEnd);
    scaleRef.current.addEventListener("change", onTransformChange);

    rotationRef.current.addEventListener("mouseDown", onTransformStart);
    rotationRef.current.addEventListener("mouseUp", onTransformEnd);
    rotationRef.current.addEventListener("change", onTransformChange);

    return () => {
      if (transformRef.current) {
        transformRef.current.removeEventListener("mouseDown", onTransformStart);
        transformRef.current.removeEventListener("mouseUp", onTransformEnd);
        transformRef.current.removeEventListener("change", onTransformChange);
      }
      if (scaleRef.current) {
        scaleRef.current.removeEventListener("mouseDown", onTransformStart);
        scaleRef.current.removeEventListener("mouseUp", onTransformEnd);
        scaleRef.current.removeEventListener("change", onTransformChange);
      }
      if (rotationRef.current) {
        rotationRef.current.removeEventListener("mouseDown", onTransformStart);
        rotationRef.current.removeEventListener("mouseUp", onTransformEnd);
        rotationRef.current.removeEventListener("change", onTransformChange);
      }
    };
  }, [selectedModelId]);


  if (loading) {
    console.log("slm")
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
        position={position}
        scale={[1, 1, 1]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          setSelectedModelId(id)
        }}
        onPointerMissed={() => setSelectedModelId(null)}
      />

      {(selectedModelId === id) && (
        <>
          <TransformControls ref={transformRef} object={ref.current} mode="translate" enabled={1} size={1.8} />
          <TransformControls ref={scaleRef} object={ref.current} mode="scale" enabled={1} size={1} />
          <TransformControls ref={rotationRef} object={ref.current} mode="rotate" enabled={1} size={1.4} />
        </>
      )}

    </>
  );
};

export default Model;