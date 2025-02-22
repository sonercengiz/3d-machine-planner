import { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { TransformControls } from "@react-three/drei";
import { useMachine } from "../context/MachineContext";
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

const Model = ({ type, path, position }) => {
  const ref = useRef();
  const transformRef = useRef();
  const { setIsOrbitEnabled, isOrbitEnabled } = useMachine();
  const { camera, gl } = useThree();
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

  // useEffect(() => {
  //   setIsOrbitEnabled(!isSelected);
  // }, [isSelected, setIsOrbitEnabled]);

  useEffect(() => {
    const controls = transformRef.current;
    if (!controls) return;

    // Başlangıç (fare basılıp sürükleme başlayınca)
    const onTransformStart = () => {
      console.log("TransformControls: sürükleme başladı");
      setIsOrbitEnabled(false);
    };

    // Bitiş (fare bırakılınca)
    const onTransformEnd = () => {
      console.log("TransformControls: sürükleme bitti");
      setIsOrbitEnabled(true);
    };

    // Her karede transform değişikliği (sürükleme devam ederken)
    const onTransformChange = () => {
      if (ref.current) {
        const { x, y, z } = ref.current.position;
      }
    };

    controls.addEventListener("mouseDown", onTransformStart);
    controls.addEventListener("mouseUp", onTransformEnd);
    controls.addEventListener("change", onTransformChange);

    return () => {
      controls.removeEventListener("mouseDown", onTransformStart);
      controls.removeEventListener("mouseUp", onTransformEnd);
      controls.removeEventListener("change", onTransformChange);
    };
  }, [isSelected]);


  if (loading) {
    return (
      <mesh position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
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
        <TransformControls ref={transformRef} object={ref.current} mode="translate" />
      )}
    </>
  );
};

export default Model;