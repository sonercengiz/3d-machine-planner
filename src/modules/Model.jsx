import { useRef, useState, useEffect, useMemo } from "react";
import { Text, TransformControls } from "@react-three/drei";
import { useMainScene } from "../context/MainSceneContext";
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Box3, Vector3, BoxHelper, LineSegments } from 'three';

const Model = ({ id, path, position }) => {
  const ref = useRef();
  const transformRef = useRef();
  const scaleRef = useRef();
  const rotationRef = useRef();
  const { setIsOrbitEnabled, selectedModelId, setSelectedModelId, selectedTransformControl } = useMainScene();
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, depth: 0 });
  const [boxHelper, setBoxHelper] = useState(null);

  // Modeli yükle
  const originalFBX = useLoader(FBXLoader, path);
  const fbx = useMemo(() => originalFBX.clone(), [originalFBX]);

  useEffect(() => {
    try {
      if (fbx) {
        console.log(`🎉 Model yüklendi: ${path}`);
        const loadedModel = fbx.scene || fbx.children[0] || fbx;
        setModel(loadedModel);
        setLoading(false);

        // Modelin Bounding Box'ını hesapla
        updateDimensions(loadedModel);

        // BoxHelper oluştur
        const helper = new BoxHelper(loadedModel, 0xffff00); // Sarı renkte bir kutu
        setBoxHelper(helper);
      }
    } catch (err) {
      console.error(`❌ Yükleme hatası: ${path}`, err);
      setError(err);
      setLoading(false);
    }
  }, [fbx, path]);

  const updateDimensions = (model) => {
    const box = new Box3().setFromObject(model);
    const size = new Vector3();
    box.getSize(size);

    // 1 birim = 1 metre olarak kabul edildi
    const scaleFactor = 1;

    setDimensions({
      width: size.x * scaleFactor,
      height: size.y * scaleFactor,
      depth: size.z * scaleFactor,
    });

    console.log({
      width: size.x * scaleFactor,
      height: size.y * scaleFactor,
      depth: size.z * scaleFactor,
    })
  };

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

    const onChange = () => {
      updateDimensions(ref.current);
      if (boxHelper) {
        boxHelper.update(); // BoxHelper'ı güncelle
      }
    };
    onChange();

    currentControl.current.addEventListener("dragging-changed", onDraggingChanged);
    currentControl.current.addEventListener("objectChange", onChange);

    return () => {
      currentControl.current?.removeEventListener("dragging-changed", onDraggingChanged);
      currentControl.current?.removeEventListener("objectChange", onChange);
    };
  }, [selectedModelId, selectedTransformControl, id, setIsOrbitEnabled, boxHelper]);

  if (loading) {
    return (
      <Text position={[0, 0, 0]} fontSize={0.5} color="white">
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
        scale={[1, 1, 1]}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedModelId(id);
        }}
        onPointerMissed={() => setSelectedModelId(null)}
      />

      {/* Bounding Box Gösterimi */}
      {selectedModelId === id && boxHelper && (
        <primitive object={boxHelper} />
      )}

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