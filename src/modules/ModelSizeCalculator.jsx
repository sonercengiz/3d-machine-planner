import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import { Box3, Vector3 } from "three";

const ModelSizeCalculator = ({ model }) => {
  const modelRef = useRef();
  const { scene } = useThree();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, depth: 0 });

  useEffect(() => {
    if (modelRef.current) {
      const box = new Box3().setFromObject(modelRef.current);
      const size = new Vector3();
      box.getSize(size);

      // Ölçeklendirme faktörü (Sahnenize bağlı olarak 1 birimin kaç metre olduğunu belirleyin)
      const scaleFactor = 1; // Örneğin, 1 birim = 1 metre olarak kabul ediyorsanız değiştirmenize gerek yok.

      setDimensions({
        width: size.x * scaleFactor,
        height: size.y * scaleFactor,
        depth: size.z * scaleFactor,
      });
    }
  }, [model]);

  return (
    <group>
      <primitive ref={modelRef} object={model} />
      <Html position={[0, 2, 0]}>
        <div style={{ color: "white", backgroundColor: "black", padding: "5px", borderRadius: "5px" }}>
          📏 Width: {dimensions.width.toFixed(2)}m <br />
          📏 Height: {dimensions.height.toFixed(2)}m <br />
          📏 Depth: {dimensions.depth.toFixed(2)}m
        </div>
      </Html>
    </group>
  );
};

export default ModelSizeCalculator;
