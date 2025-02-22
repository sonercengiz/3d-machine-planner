import { useRef, useState, useEffect } from "react";
import { Text, TransformControls } from "@react-three/drei";
import { useMachine } from "../context/MachineContext";
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const Model = ({ type, path, position }) => {
  const ref = useRef();
  const transformRef = useRef();
  const scaleRef = useRef();
  const { setIsOrbitEnabled, isOrbitEnabled } = useMachine();
  const [isSelected, setIsSelected] = useState(false);
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
    if (!transformRef.current || !scaleRef.current) return;

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

    return () => {
      transformRef.current.removeEventListener("mouseDown", onTransformStart);
      transformRef.current.removeEventListener("mouseUp", onTransformEnd);
      transformRef.current.removeEventListener("change", onTransformChange);

      scaleRef.current.removeEventListener("mouseDown", onTransformStart);
      scaleRef.current.removeEventListener("mouseUp", onTransformEnd);
      scaleRef.current.removeEventListener("change", onTransformChange);
    };
  }, [isSelected]);


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
          setIsSelected(true);
        }}
        onPointerMissed={() => setIsSelected(false)}
      />

      {isSelected && (
        <>
          <TransformControls ref={transformRef} object={ref.current} mode="translate" />
          <TransformControls ref={scaleRef} object={ref.current} mode="scale" />
        </>
      )}

    </>
  );
};

export default Model;