import { useRef, useState, useEffect, useMemo } from "react";
import { Text, TransformControls } from "@react-three/drei";
import { useMainScene } from "../context/MainSceneContext";
import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { Box3, Vector3, BoxHelper } from "three";

const Model = ({ id, path, position, scale, rotation }) => {
  const ref = useRef();
  const transformRef = useRef();
  const scaleRef = useRef();
  const rotationRef = useRef();
  const {
    setIsOrbitEnabled,
    selectedModelId,
    setSelectedModelId,
    selectedTransformControl,
    setSelectedModelDimensions,
  } = useMainScene();

  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, depth: 0 });
  const [boxHelper, setBoxHelper] = useState(null);

  // Modeli yükle
  const originalFBX = useLoader(FBXLoader, path);
  const fbx = useMemo(() => originalFBX.clone(), [originalFBX]);

  // updateDimensions fonksiyonunu useMemo ile tanımlıyoruz
  const updateDimensions = useMemo(() => (obj) => {
    const box = new Box3().setFromObject(obj);
    const size = new Vector3();
    box.getSize(size);
    const scaleFactor = 1;
    setDimensions({
      width: size.x * scaleFactor,
      height: size.y * scaleFactor,
      depth: size.z * scaleFactor,
    });
  }, []);

  useEffect(() => {
    setSelectedModelDimensions(dimensions);
  }, [dimensions, setSelectedModelDimensions]);

  useEffect(() => {
    try {
      if (fbx) {
        const loadedModel = fbx.scene || fbx.children[0] || fbx;
        setModel(loadedModel);
        setLoading(false);
        // İlk hesaplama: Bounding Box hesaplayıp ölçüleri güncelle
        updateDimensions(loadedModel);
        // BoxHelper oluştur
        const helper = new BoxHelper(loadedModel, 0xffff00);
        setBoxHelper(helper);
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [fbx, path, updateDimensions]);

  // Seçili model üzerinde TransformControls eventlerini throttle ederek çalıştırıyoruz
  useEffect(() => {
    if (selectedModelId !== id) return;

    const currentControl =
      selectedTransformControl === "move"
        ? transformRef
        : selectedTransformControl === "scale"
          ? scaleRef
          : selectedTransformControl === "rotate"
            ? rotationRef
            : null;

    if (!currentControl?.current) return;

    // Throttle için bayrak
    let isThrottled = false;
    let throttleTimeout = null;

    const onChangeThrottled = () => {
      if (throttleTimeout) return;
      throttleTimeout = setTimeout(() => {
        if (ref.current) {
          const box = new Box3().setFromObject(ref.current);
          if (box.min.y < 0) {
            ref.current.position.y += -box.min.y;
          }
          if (box.max.y > 10) {
            const offset = box.max.y - 10;
            ref.current.position.y -= offset;
          }
          updateDimensions(ref.current);
          if (boxHelper) {
            boxHelper.update();
          }
        }
        throttleTimeout = null;
      }, 1);  // Buradaki 10 milisaniye throttle süresi
    };

    const onDraggingChanged = (event) => {
      setIsOrbitEnabled(!event.value);
    };

    // İlk çalıştırma: Hızlıca güncelle
    onChangeThrottled();

    currentControl.current.addEventListener("dragging-changed", onDraggingChanged);
    currentControl.current.addEventListener("objectChange", onChangeThrottled);

    return () => {
      currentControl.current?.removeEventListener("dragging-changed", onDraggingChanged);
      currentControl.current?.removeEventListener("objectChange", onChangeThrottled);
    };
  }, [selectedModelId, selectedTransformControl, id, setIsOrbitEnabled, boxHelper, updateDimensions]);

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
        scale={scale}
        position={position}
        rotation={rotation}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedModelId(id);
        }}
        onPointerMissed={() => setSelectedModelId(null)}
      />

      {/* Bounding Box Gösterimi */}
      {selectedModelId === id && boxHelper && <primitive object={boxHelper} />}

      {selectedModelId === id && (
        <>
          {selectedTransformControl === "move" && (
            <TransformControls
              ref={transformRef}
              object={ref.current}
              mode="translate"
              onDragStart={() => setIsOrbitEnabled(false)}
              onDragEnd={() => setIsOrbitEnabled(true)}
              showY={true}
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
