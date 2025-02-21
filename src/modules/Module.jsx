import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Module = ({ type, position }) => {
  const ref = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(position);

  useFrame(() => {
    if (isDragging && ref.current) {
      ref.current.position.set(dragPosition[0], dragPosition[1], dragPosition[2]);
    }
  });

  const handlePointerDown = (event) => {
    event.stopPropagation();
    setIsDragging(true);
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      setDragPosition([event.point.x, event.point.y, event.point.z]);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <mesh
      ref={ref}
      position={dragPosition}
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Module;
